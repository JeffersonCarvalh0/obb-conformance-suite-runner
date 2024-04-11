import { createAndRunPlan } from "./flows/create-and-run-plan";
import { runExistingPlan } from "./flows/run-existing-plan";
import type {
  AnyObject,
  ConformanceOptions,
  PlanOptions,
  ConformanceContext,
  FlowOverride,
} from "./types";
import { createApiClient } from "./utils/create-api-client";

export const createConformanceClient = (options: ConformanceOptions) => {
  const apiClient = createApiClient(options);

  const context: ConformanceContext = {
    ...options,
    apiClient,
  };

  return {
    createAndRun: <T extends AnyObject>(
      planOptions: PlanOptions<T>,
      override?: FlowOverride,
    ) => createAndRunPlan(context, planOptions, override),
    runExisting: async (planId: string, override?: FlowOverride) =>
      runExistingPlan(context, planId, override),
  };
};
