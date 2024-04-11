import { ConformanceOptions } from "./conformance-options";
import { ConformanceApiClient } from "./conformance-api-client";

/**
 * The context for the Conformance Suite Client. Contains the provided
 * configuration and the axios instance to interact with the Conformance
 * Suite's API.
 */
export type ConformanceContext = ConformanceOptions & {
  apiClient: ConformanceApiClient;
};
