/* eslint-disable no-await-in-loop */
import { createPlan } from "../conformance-api/plan/create-plan";
import { AnyObject, ConformanceOptions, PlanOptions } from "../types";
import { sleep } from "../utils/sleep";
import { runTestModule } from "./run-test-module";

export const createAndRunPlan = async <T extends AnyObject>(
  conformanceOptions: ConformanceOptions,
  planOptions: PlanOptions<T>,
) => {
  const { id, modules } = await createPlan(planOptions);

  console.log(
    `Plan created, visit ${conformanceOptions.apiUrl}/plan-detail.html?plan=${id}. Test starting in 5 seconds...`,
  );

  await sleep(5000);

  for (const module of modules) {
    await runTestModule(id, module, conformanceOptions.authorizer);
  }

  console.log("Plan completed!");
};
