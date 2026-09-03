const DEFAULT_PROCESSING_LEASE_MS =
  15 * 60 * 1000;

export function getProcessingLeaseCutoff({
  now = new Date(),
  leaseMs = DEFAULT_PROCESSING_LEASE_MS,
} = {}) {
  if (!(now instanceof Date)) {
    throw new Error(
      "Data atual da lease de geracao invalida."
    );
  }

  if (
    !Number.isFinite(leaseMs) ||
    leaseMs <= 0
  ) {
    throw new Error(
      "Duracao da lease de geracao invalida."
    );
  }

  return new Date(
    now.getTime() - leaseMs
  );
}
