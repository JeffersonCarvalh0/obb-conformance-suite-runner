import { logger } from "../../logger";
import { ConformanceContext } from "../../types";

export const visitUrl = async (
  context: ConformanceContext,
  runnerId: string,
  url: string,
) => {
  logger.info("Notifying conformance suite about visiting the URL");

  await context.apiClient.post(
    `/api/runner/browser/${runnerId}/visit`,
    undefined,
    {
      params: {
        url,
      },
    },
  );
};
