import { createAndRunPlan } from "./flows/create-and-run-plan";
import { runExistingPlan } from "./flows/run-existing-plan";
import type {
  AnyObject,
  ConformanceOptions,
  PlanOptions,
  ConformanceContext,
  FlowOverride,
  RunnerOptions,
} from "./types";
import { createApiClient } from "./utils/create-api-client";

export const createConformanceClient = (options: ConformanceOptions) => {
  const apiClient = createApiClient(options);

  const context: ConformanceContext = {
    ...options,
    apiClient,
  };

  return {
    getAvailablePlans: async () => apiClient.getAvailablePlans(),
    createAndRun: <T extends AnyObject>(
      planOptions: PlanOptions<T>,
      options?: Partial<RunnerOptions>,
      override?: FlowOverride,
    ) => createAndRunPlan(context, planOptions, options, override),
    runExisting: async (
      planId: string,
      options?: Partial<RunnerOptions>,
      override?: FlowOverride,
    ) => runExistingPlan(context, planId, options, override),
  };
};
