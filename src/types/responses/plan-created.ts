export type PlanCreatedResponse = {
  name: string;
  id: string;
  modules: {
    testModule: string;
    variant: {
      fapi_profile: "openbanking_brazil";
      fapi_response_mode: "plain_response";
    };
    instances: string[];
  }[];
};
