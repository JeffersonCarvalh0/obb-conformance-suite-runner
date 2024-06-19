import { AnyObject } from "./any-object";
import { BaseTestConfig } from "./base-test-config";
import { ClientAuthType } from "./client-auth-type";
import { FapiRequestMethod } from "./fapi-request-method";

export type PlanOptions<ExtraConfig extends AnyObject> = {
  planName: string;
  clientAuthType?: ClientAuthType;
  fapiRequestMethod?: FapiRequestMethod;
  config: BaseTestConfig & ExtraConfig;
};
