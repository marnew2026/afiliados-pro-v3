import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(testsDir, "..");
const rootDir = path.resolve(backendDir, "..");

function read(relativePath) {
  return fs.readFileSync(
    path.join(rootDir, relativePath),
    "utf8"
  );
}
test("JWT usa versao de sessao e logout revoga tokens", () => {
  const userModel = read("backend/models/User.js");
  const authRoutes = read("backend/routes/authRoutes.js");
  const authMiddleware = read("backend/middlewares/authMiddleware.js");

  assert.match(userModel, /tokenVersion/);
  assert.match(userModel, /default:\s*0/);
  assert.match(authRoutes, /tokenVersion:\s*Number\(user\.tokenVersion \|\| 0\)/);
  assert.match(authMiddleware, /Number\.isInteger\(decoded\.tokenVersion\)/);
  assert.match(authMiddleware, /decoded\.tokenVersion !== Number\(user\.tokenVersion \|\| 0\)/);
  assert.match(authRoutes, /router\.post\("\/logout",\s*protect/);
  assert.match(authRoutes, /req\.user\.tokenVersion = Number\(req\.user\.tokenVersion \|\| 0\) \+ 1/);
});


test("backend normaliza email no cadastro e login", () => {
  const source = read("backend/routes/authRoutes.js");

  const normalizations =
    source.match(
      /String\(req\.body\?\.email \|\| ""\)[\s\S]*?\.trim\(\)[\s\S]*?\.toLowerCase\(\)/g
    ) || [];

  assert.equal(normalizations.length, 2);
  assert.match(source, /User\.findOne\(\{ email \}\)/);
});

test("login mobile salva a identidade completa", () => {
  const source = read(
    "afiliados-pro-mobile/src/app/login.tsx"
  );

  assert.match(
    source,
    /email:\s*email\.trim\(\)\.toLowerCase\(\)/
  );
  assert.match(source, /AsyncStorage\.multiSet/);
  assert.match(source, /\["token", data\.token\]/);
  assert.match(source, /\["userId", data\.user\._id\]/);
  assert.match(source, /\["email", data\.user\.email\]/);
});

test("resposta 401 limpa a sessao e retorna ao login", () => {
  const source = read(
    "afiliados-pro-mobile/src/services/api.js"
  );

  assert.match(
    source,
    /error\?\.response\?\.status === 401/
  );
  assert.match(source, /AsyncStorage\.multiRemove/);
  assert.match(source, /router\.replace\("\/login"\)/);
});

test("dashboard oferece logout real", () => {
  const dashboard = read(
    "afiliados-pro-mobile/src/app/dashboard.tsx"
  );
  const logout = read(
    "afiliados-pro-mobile/src/components/dashboard/SessionLogoutButton.tsx"
  );

  assert.match(
    dashboard,
    /import SessionLogoutButton/
  );
  assert.match(
    dashboard,
    /<SessionLogoutButton \/>/
  );
  assert.match(logout, /api\.post\("\/auth\/logout"\)/);
  assert.match(logout, /AsyncStorage\.multiRemove/);
  assert.match(logout, /"token"/);
  assert.match(logout, /"userId"/);
  assert.match(logout, /"email"/);
  assert.match(
    logout,
    /router\.replace\("\/login"(?: as any)?\)/
  );
});
