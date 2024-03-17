/**
 * Authorization server interaction steps.
 */
export type Authorizer = {
  /**
   * The first step in the authorization server interaction.
   * This step is used to start the interaction with the authorization server and to get the cookies
   * used in the next steps.
   *
   * @param url - The URL to start the interaction with the authorization server.
   *
   * @returns The cookies to be used in the next steps.
   */
  startInteraction: (url: string) => Promise<string>;
  /**
   * The second step in the authorization server interaction.
   * This step is used to authenticaticate the user in the authorization server and to get the new cookies
   * used in the next steps.
   *
   * @param cookies - The cookies from the `startInteraction` step.
   *
   * @returns The cookies to be used in the next steps.
   */
  login: (cookies: string) => Promise<string>;
  /**
   * One of the final steps in the authorization server interaction.
   * This step is used to confirm the consent in the authorization server and to redirect the user
   * back to the Conformance Suite.
   *
   * @param cookies - The cookies from the `login` step.
   *
   * @returns The callback URL to the Conformance Suite.
   */
  confirm: (cookies: string) => Promise<string>;
  /**
   * One of the final steps in the authorization server interaction.
   * This step is used to cancel the consent in the authorization server and to redirect the user
   * back to the Conformance Suite.
   *
   * This step can happen before or after the `confirm` step.
   *
   * @param cookies - The cookies from the `startInteraction` or `login` steps.
   *
   * @returns The callback URL to the Conformance Suite.
   */
  abort: (cookies: string) => Promise<string>;
};
