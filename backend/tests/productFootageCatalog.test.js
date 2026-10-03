import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { findProductFootage } from "../services/media/ProductFootageCatalog.js";

const product = {
  provider: "mercadolivre",
  itemId: "MLB123",
};

async function fixture(callback) {
  const root = await mkdtemp(join(tmpdir(), "kael-catalog-"));
  const entry = {
    ...product,
    active: true,
    files: ["demo.mp4"],
    rights: {
      editing: true,
      socialPublishing: true,
      evidence: "contrato-123",
      expiresAt: "2030-01-01",
    },
  };

  const save = () =>
    writeFile(
      join(root, "catalog.json"),
      JSON.stringify({ version: 1, entries: [entry] })
    );

  try {
    await writeFile(join(root, "demo.mp4"), "fixture");
    await save();
    await callback(root, entry, save);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("seleciona produto exato e exige direitos validos", () =>
  fixture(async (root, entry, save) => {
    const result = await findProductFootage({ root, product });
    assert.equal(result.files[0], join(root, "demo.mp4"));

    assert.equal(
      await findProductFootage({
        root,
        product: { ...product, itemId: "MLB999" },
      }),
      null
    );

    entry.rights.editing = false;
    await save();
    assert.equal(await findProductFootage({ root, product }), null);

    entry.rights.editing = true;
    entry.rights.expiresAt = "2020-01-01";
    await save();
    assert.equal(await findProductFootage({ root, product }), null);
  })
);

test("recusa arquivo existente fora do acervo", () =>
  fixture(async (root, entry, save) => {
    const outside = await mkdtemp(join(tmpdir(), "kael-outside-"));
    try {
      await writeFile(join(outside, "demo.mp4"), "fixture");

      entry.files = [join("..", outside.split(/[\\/]/).at(-1), "demo.mp4")];
      await save();

      await assert.rejects(
        findProductFootage({ root, product }),
        /fora do acervo/
      );
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  })
);

test("recusa symlink externo quando o sistema permite cria-lo", async (t) => {
  await fixture(async (root, entry, save) => {
    const outside = await mkdtemp(join(tmpdir(), "kael-external-"));

    try {
      const target = join(outside, "demo.mp4");
      await writeFile(target, "fixture");

      try {
        await symlink(target, join(root, "escape.mp4"), "file");
      } catch (error) {
        if (["EPERM", "EACCES", "ENOTSUP"].includes(error.code)) {
          t.skip("Sistema sem permissao para criar symlink.");
          return;
        }
        throw error;
      }

      entry.files = ["escape.mp4"];
      await save();

      await assert.rejects(
        findProductFootage({ root, product }),
        /fora do acervo/
      );
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  });
});

test("acervo ausente preserva geracao atual", async () => {
  assert.equal(
    await findProductFootage({ product, root: "" }),
    null
  );
});