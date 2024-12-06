import {
  PlanCreatedResponse,
  PlanInfoResponse,
  TestModuleInfoResponse,
} from "./responses";

export type TestEvents = {
  planCreated: [PlanCreatedResponse];
  testModuleStart: [TestModuleInfoResponse];
  testModuleUpdate: [TestModuleInfoResponse];
  testModuleError: [TestModuleInfoResponse];
  testModuleFinish: [TestModuleInfoResponse];
  planCompleted: [PlanCreatedResponse | PlanInfoResponse];
};
