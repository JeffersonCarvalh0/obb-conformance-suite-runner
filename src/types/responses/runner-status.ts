export type RunnerStatusResponse = {
  id: string;
  name: string;
  created: Date;
  updated: Date;
  browser: {
    urls: string[];
    visited: string[];
    runners: unknown[];
  };
  exposed: {
    redirect_uri: string;
    code_challenge_method: string;
    client_id: string;
    code_verifier: string;
    code_challenge: string;
  };
  error: unknown;
};
