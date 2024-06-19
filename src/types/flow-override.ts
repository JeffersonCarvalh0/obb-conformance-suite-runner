import { AuthorizationFlow } from "./interaction-flow";
import { RunnerContext } from "./runner-context";

/**
 * Custom flow override.
 *
 * This is useful when you want to reject or add external API calls,
 * e.g. to modify a resource's status.
 *
 * @param context - The context of the current test runner.
 * @returns `true` if the override should be removed from the custom overrides list, `false` otherwise.
 */
export type CustomOverride = (
  context: RunnerContext,
) => boolean | Promise<boolean>;

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
  /**
   * Custom override functions.
   */
  custom?: CustomOverride[];
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
