import { AuthorizationFlow } from "./interaction-flow";

/**
 * Override the interaction.
 *
 * This is useful when you want to reject or add external API calls,
 * e.g. to modify a resource's status.
 */
// export type InteractionOverride = {};

/**
 * Override the flow of the test module.
 *
 * This is useful when you want to change which authorizer method should be called
 * or add any external API calls, e.g. to reject a payment consent internally.
 */
export type OverrideOptions = {
  /**
   * The authorization flows to run.
   */
  interactions?: AuthorizationFlow[];
};

/**
 * Override the flow of the test modules.
 *
 * This is useful when you want to reject or add external API calls,
 * e.g. to modify a resource's status.
 */
export type FlowOverride = Record<
  /**
   * The test module to override.
   */
  string,
  /**
   * The override options.
   */
  OverrideOptions
>;
