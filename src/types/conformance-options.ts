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
  /**
   * The Conformance Suite Access Token
   *
   * Generated at conformanceUrl + "/api/token"
   *
   * @link https://www.certification.openid.net/tokens.html
   */
  token: string;
};
