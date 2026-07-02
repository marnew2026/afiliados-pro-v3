import client from "prom-client";

export const register = new client.Registry();

export const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total requests",
});

register.registerMetric(httpRequests);