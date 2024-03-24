import { createPlan } from "./conformance-api/plan/create-plan";
import { createAndRunPlan } from "./flows/create-and-run-plan";
import { runExistingPlan } from "./flows/run-existing-plan";
import { AnyObject, ConformanceOptions, PlanOptions } from "./types";

export const createConformance = (options: ConformanceOptions) => ({
  createPlan: <T extends AnyObject>(planOptions: PlanOptions<T>) =>
    createPlan(planOptions),
  createAndRun: <T extends AnyObject>(planOptions: PlanOptions<T>) =>
    createAndRunPlan(options, planOptions),
  runExisting: async (planId: string) => runExistingPlan(options, planId),
});
