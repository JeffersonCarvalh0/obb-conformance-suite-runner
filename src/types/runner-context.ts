import { TestModuleInfoResponse } from "./responses";
import { ConformanceApiClient } from "./conformance-api-client";

/**
 * The Test Runner context. Contains a subset of the current running test's information and the
 *  axios instance to interact with the Conformance Suite's API.
 *
 * This is passed to Authorizer options to allow direct API calls to the Conformance Suite.
 */
export type RunnerContext = Pick<
  TestModuleInfoResponse,
  "testId" | "testName" | "status"
> & {
  apiClient: ConformanceApiClient;
  /**
   * The list of URLs to visit during the test.
   * Note: Usually there is only a single URL in the array.
   */
  urls: string[];
  /**
   * The list of URLs that have already been visited during the test.
   */
  visitedUrls: string[];
};
