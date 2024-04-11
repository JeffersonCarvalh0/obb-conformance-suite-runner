/**
 * The Rest Runner log. Additional fields are not typed and documented because
 * they are either not relevant or restricted to a single test plan.
 */
export type TestLogResponse = {
  /**
   * The unique identifier of this log
   */
  _id: string;
  /**
   * The message of this log
   */
  msg: string;
  /**
   * Which java class generated this log. Uses the the test name if an
   * unexpected error occurs
   */
  src: string;
  /**
   * The time when this log was generated
   */
  time: Date;
} & Record<string, any>;
