export type PlanTestModuleVariant = {
  fapi_profile: string;
  fapi_response_mode: string;
};

export type PlanTestModule = {
  testModule: string;
  variant: PlanTestModuleVariant;
};

export type PlanInfoResponse = {
  _id: string;
  planName: string;
  started: Date;
  summary: string;
  modules: PlanTestModule[];
  version: string;
};
