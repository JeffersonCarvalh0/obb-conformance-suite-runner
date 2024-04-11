import type { AxiosInstance } from "axios";
import type { AnyObject } from "./any-object";
import type { PlanOptions } from "./plan-options";
import type {
  PlanCreatedResponse,
  PlanInfoResponse,
  PlanTestModule,
  RunnerCreatedResponse,
  RunnerStatusResponse,
  TestModuleInfoResponse,
} from "./responses";
import { TestLogResponse } from "./responses/test-logs";

/**
 * The Conformance API client. Exposes a set of methods to interact with the
 * Conformance API and the underlying axios instance for other API calls.
 */
export type ConformanceApiClient = {
  createPlan: <T extends AnyObject>(
    planOptions: PlanOptions<T>,
  ) => Promise<PlanCreatedResponse>;
  getPlanInfo: (planId: string) => Promise<PlanInfoResponse>;
  createRunner: (
    planId: string,
    planTestModule: PlanTestModule,
  ) => Promise<RunnerCreatedResponse>;
  getRunnerStatus: (runnerId: string) => Promise<RunnerStatusResponse>;
  visitUrl: (runnerId: string, url: string) => Promise<void>;
  getModuleInfo: (runnerId: string) => Promise<TestModuleInfoResponse>;
  sendCallback: (callbackUrl: string) => Promise<void>;
  getRunnerLogs: (runnerId: string) => Promise<TestLogResponse[]>;
  axiosInstance: AxiosInstance;
};
