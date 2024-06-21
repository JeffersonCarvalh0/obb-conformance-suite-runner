import type { ClientAuthType } from "../client-auth-type";
import type { FapiRequestMethod } from "../fapi-request-method";
import type { PlanTestModuleVariant } from "./plan-info";

export type TestModuleStatus =
  | "CREATED"
  | "RUNNING"
  | "WAITING"
  | "INTERRUPTED"
  | "FINISHED";

export type TestModuleResult =
  | null
  | "PASSED"
  | "REVIEW"
  | "WARNING"
  | "SKIPPED"
  | "FAILED";

export type TestModuleInfoResponse = {
  _id: string;
  testId: string;
  testName: string;
  started: Date;
  planId: string;
  status: TestModuleStatus;
  result: TestModuleResult;
  version: string;
  variant: PlanTestModuleVariant & {
    client_auth_type: ClientAuthType;
    fapi_auth_request_method: FapiRequestMethod;
  };
  config: {
    alias: string;
  };
};
