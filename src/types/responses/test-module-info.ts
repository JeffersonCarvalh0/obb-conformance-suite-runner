import { ClientAuthType } from "../client-auth-type";
import { FapiRequestMethod } from "../fapi-request-method";
import { PlanTestModuleVariant } from "./plan-info";

export type TestModuleStatus =
  | "CREATED"
  | "RUNNING"
  | "WAITING"
  | "REVIEW"
  | "INTERRUPTED"
  | "FINISHED";

export type TestModuleResult =
  | null
  | "PASSED"
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
