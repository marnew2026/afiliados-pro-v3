import test from "node:test";
import assert from "node:assert/strict";

import adminWithdrawRoutes from "../routes/adminWithdrawRoutes.js";
import adminDashboardRoutes from "../routes/adminDashboardRoutes.js";
import { protect } from "../middlewares/authMiddleware.js";
import { requireIntegrationAdmin } from "../middlewares/integrationAdminMiddleware.js";

function assertProtected(router, routeName) {
  assert.equal(router.stack[0]?.handle, protect, `${routeName} deve validar o JWT primeiro`);
  assert.equal(
    router.stack[1]?.handle,
    requireIntegrationAdmin,
    `${routeName} deve exigir administrador depois do JWT`
  );
}

test("rotas administrativas de saques exigem autenticacao e administrador", () => {
  assertProtected(adminWithdrawRoutes, "/adminWithdraw");
});

test("dashboard administrativo exige autenticacao e administrador", () => {
  assertProtected(adminDashboardRoutes, "/admin/dashboard");
});
