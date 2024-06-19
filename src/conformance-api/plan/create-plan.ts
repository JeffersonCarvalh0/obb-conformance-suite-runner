import { AxiosInstance } from "axios";
import { PlanCreatedResponse, AnyObject, PlanOptions } from "../../types";
import { stringifyParam } from "../../utils/stringify-param";

export const createPlan = async <T extends AnyObject>(
  apiClient: AxiosInstance,
  planOptions: PlanOptions<T>,
) => {
  const { planName, clientAuthType, fapiRequestMethod, config } = planOptions;

  const { data } = await apiClient.post<PlanCreatedResponse>(
    `/api/plan?planName=${planName}`,
    config,
    {
      params:
        clientAuthType && fapiRequestMethod
          ? {
              variant: stringifyParam({
                client_auth_type: clientAuthType,
                fapi_auth_request_method: fapiRequestMethod,
              }),
            }
          : undefined,
    },
  );

  return data;
};
