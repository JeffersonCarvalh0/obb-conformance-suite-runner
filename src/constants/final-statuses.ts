import type { TestModuleStatus } from "../types";

export const finalStatuses: TestModuleStatus[] = [
  "FINISHED",
  "INTERRUPTED",
] as const;
