import axios from "axios";

const DEFAULT_TIMEOUT_MS = 30000;
const DEFAULT_MAX_BYTES = 100 * 1024 * 1024;

export async function downloadGeneratedMedia({
  sourceUrl,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  maxBytes = DEFAULT_MAX_BYTES,
}) {
  if (!sourceUrl) {
    throw new Error(
      "URL da midia gerada nao informada para download."
    );
  }

  const parsedUrl = new URL(sourceUrl);

  if (
    parsedUrl.protocol !== "https:" &&
    parsedUrl.protocol !== "http:"
  ) {
    throw new Error(
      "Protocolo de download de midia nao suportado."
    );
  }

  const response = await axios.get(sourceUrl, {
    responseType: "arraybuffer",
    timeout: timeoutMs,
    maxContentLength: maxBytes,
    maxBodyLength: maxBytes,
  });

  const body = Buffer.from(response.data);

  if (!body.length) {
    throw new Error(
      "Download da midia gerada retornou conteudo vazio."
    );
  }

  if (body.length > maxBytes) {
    throw new Error(
      "Midia gerada excede o limite permitido."
    );
  }

  return {
    body,
    contentType: String(
      response.headers["content-type"] || ""
    )
      .split(";")[0]
      .trim()
      .toLowerCase(),
    size: body.length,
  };
}
