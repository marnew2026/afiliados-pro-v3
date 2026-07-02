export function resolveTenant(req) {
  return req.user?.tenantId || req.headers["x-tenant-id"];
}