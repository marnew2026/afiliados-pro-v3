import RunwayML from "@runwayml/sdk";

import {
  RunwayMediaGenerationProvider,
} from "./RunwayMediaGenerationProvider.js";

export function createRunwayMediaGenerationProvider({
  apiSecret = process.env.RUNWAYML_API_SECRET,
  clientFactory = (options) => new RunwayML(options),
} = {}) {
  const cleanApiSecret = String(
    apiSecret || ""
  ).trim();

  const client = cleanApiSecret
    ? clientFactory({
        apiKey: cleanApiSecret,
        maxRetries: 2,
        timeout: 30_000,
      })
    : null;

  return new RunwayMediaGenerationProvider({
    apiSecret: cleanApiSecret,
    client,
  });
}
