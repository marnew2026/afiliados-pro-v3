import Tenant from "../../tenants/tenant.model.js";

export async function tenantResolver(req, res, next) {
  const tenantId = req.headers["x-tenant-id"];

  if (!tenantId) {
    return res.status(401).json({ error: "Tenant missing" });
  }

  const tenant = await Tenant.findById(tenantId);

  if (!tenant) {
    return res.status(404).json({ error: "Tenant not found" });
  }

  req.tenant = tenant;

  next();
}