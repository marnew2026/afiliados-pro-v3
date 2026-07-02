import os from "os";

let workers = 1;

export function getWorkerCount(tenant) {
  const cpu = os.cpus().length;

  if (tenant.plan === "ENTERPRISE") {
    workers = cpu * 2;
  } else if (tenant.plan === "PRO") {
    workers = cpu;
  } else {
    workers = 1;
  }

  return workers;
}