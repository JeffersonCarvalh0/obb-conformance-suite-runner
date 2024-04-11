import { AxiosInstance } from "axios";
import { logger } from "../../logger";

export const visitUrl = async (
  apiClient: AxiosInstance,
  runnerId: string,
  url: string,
) => {
  logger.info("Notifying conformance suite about visiting the URL");

  await apiClient.post(`/api/runner/browser/${runnerId}/visit`, undefined, {
    params: {
      url,
    },
  });
};
