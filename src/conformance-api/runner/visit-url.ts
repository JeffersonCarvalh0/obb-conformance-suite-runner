import { apiClient } from "../../services/api-client";

export const visitUrl = async (runnerId: string, url: string) => {
  console.log("Notifying conformance suite about visiting the URL");

  await apiClient.post(`/api/runner/browser/${runnerId}/visit`, undefined, {
    params: {
      url,
    },
  });
};