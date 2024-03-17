import { Authorizer } from "./authorizer";

export type ConformanceOptions = {
  apiUrl: string;
  authorizer: Authorizer;
  bail?: boolean;
};
