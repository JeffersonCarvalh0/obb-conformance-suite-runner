export type DirectoryDomain = "openbankingbrasil.org.br" | "opinbrasil.com.br";

export type JWKS = {
  alg: string;
  use: string;
  kid: string;
  kty: string;
  n: string;
  e: string;
  d: string;
  p: string;
  q: string;
  dp: string;
  dq: string;
  qi: string;
};

export type Client = {
  /**
   * Client Id.
   */
  client_id: string;
  /**
   * Client JWKS object.
   */
  jwks: {
    keys: JWKS[];
  };
  /**
   * Client organization JWKS object. Usually the same as the client's own JWKS.
   */
  org_jwks: {
    keys: JWKS[];
  };
  /**
   * Client scopes separated by space.
   * Used for in the authorization request.
   *
   * Example: "openid consents accounts"
   *
   * Consents tests must not have the "payments" scope.
   */
  scope: string;
};

export type Mtls = {
  /**
   * Client public BRCAC certificate. Must not contain line breaks;
   *
   * Example: -----BEGIN CERTIFICATE-----\n.......-----END CERTIFICATE-----
   */
  cert: string;
  /**
   * Client private BRCAC certificate. Must not contain line breaks;
   *
   * Example: -----BEGIN PRIVATE KEY-----\n.......-----END PRIVATE KEY-----
   */
  key: string;
  /**
   * Client public BRCAC certificate's issuer chain. Must not contain line breaks;
   *
   * Example: -----BEGIN CERTIFICATE-----\n.......-----END CERTIFICATE-----
   */
  ca: string;
};

export type ProductType = "personal" | "business";

export type BaseTestConfig = {
  /**
   * Test plan alias. Used to create the callback URL.
   */
  alias: string;
  /**
   * Test plan description.
   */
  description: string;
  /**
   * Authorization server configuration.
   */
  server?: {
    /**
     * Authorization server discovery endpoint (.well-known).
     */
    discoveryUrl: string;
  };
  /**
   * Open Finance/Insurance Directory configuration.
   */
  directory?: {
    /**
     * Directory Client Id (usually found in the software statement page).
     * Must match with the mtls.cert certificate.
     *
     * Required for some tests plans.
     */
    client_id: string;
    /**
     * Directory keystore URL.
     *
     * Required for some tests plans.
     */
    keystore?: `https://keystore.sandbox.directory.${DirectoryDomain}/`;
    /**
     * Directory discovery URL.
     *
     * Required for some tests plans.
     */
    discoveryUrl?: `https://auth.sandbox.directory.${DirectoryDomain}/.well-known/openid-configuration`;
    /**
     * Directory API base URL.
     *
     * Required for some tests plans.
     */
    apibase?: `https://matls-api.sandbox.directory.${DirectoryDomain}/`;
  };
  /**
   * Client 1 configuration.
   * Your authorization server must have it registered in order to use this option
   */
  client?: Client;
  /**
   * Client 1 certificate configuration.
   *
   * Required for some tests plans.
   */
  mtls?: Mtls;
  /**
   * Client 2 configuration.
   * Your authorization server must have it registered in order to use this option
   */
  client2?: Client;
  /**
   * Client 2 certificate configuration.
   *
   * Required for some tests plans.
   */
  mtls2?: Mtls;
  /**
   * Consent configuration (all phases).
   *
   * Required for some tests plans.
   */
  consent?: {
    productType: ProductType;
  };
  /**
   * Consent & resource type configuration.
   *
   * Required for Consents (phase 2) & Payments (phase 3) tests plans.
   */
  resource?: {
    /**
     * Consent creation URL.
     */
    consentUrl: string;
    /**
     * Resource creation/list URL.
     */
    resourceUrl: string;
  } & Record<string, any>;
};
