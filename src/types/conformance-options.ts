import { Authorizer } from "./authorizer";

export type ConformanceOptions = {
  /**
   * The URL of the Conformance Suite.
   *
   * @example "https://www.certification.openid.net"
   */
  conformanceUrl: string;
  /**
   * The consent authorizer to use for the tests.
   */
  authorizer: Authorizer;
};
