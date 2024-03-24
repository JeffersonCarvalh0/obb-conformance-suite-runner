import {
  PlanCreatedResponse,
  AnyObject,
  PlanOptions,
  ConformanceContext,
} from "../../types";
import { stringifyParam } from "../../utils/stringify-param";

export const createPlan = async <T extends AnyObject>(
  context: ConformanceContext,
  planOptions: PlanOptions<T>,
) => {
  const { planName, clientAuthType, fapiRequestMethod, config } = planOptions;

  const { data } = await context.apiClient.post<PlanCreatedResponse>(
    `/api/plan?planName=${planName}`,
    config,
    {
      params: {
        variant: stringifyParam({
          client_auth_type: clientAuthType,
          fapi_auth_request_method: fapiRequestMethod,
        }),
      },
    },
  );

  return data;
};
