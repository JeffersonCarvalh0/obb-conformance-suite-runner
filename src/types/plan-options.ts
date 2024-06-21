import type { AnyObject } from "./any-object";
import type { BaseTestConfig } from "./base-test-config";
import type { ClientAuthType } from "./client-auth-type";
import type { FapiRequestMethod } from "./fapi-request-method";

export type PlanOptions<ExtraConfig extends AnyObject> = {
  planName: string;
  clientAuthType?: ClientAuthType;
  fapiRequestMethod?: FapiRequestMethod;
  config: BaseTestConfig & ExtraConfig;
};
