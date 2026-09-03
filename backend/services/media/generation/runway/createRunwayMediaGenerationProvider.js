import {
  RunwayMediaGenerationProvider,
} from "./RunwayMediaGenerationProvider.js";

export function createRunwayMediaGenerationProvider() {
  return new RunwayMediaGenerationProvider({
    apiSecret: process.env.RUNWAYML_API_SECRET,
  });
}
