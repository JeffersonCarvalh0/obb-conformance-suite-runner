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
    redirect_uri: "https://certification.u4c.com:8443/test/a/u4c/callback";
    code_challenge_method: "S256";
    client_id: "c2134a10-cfec-4278-b03c-edc9c677d3f6";
    code_verifier: "8~U4C777ba~lKjCtIQ4slOCKN9.4tJ-9lq~AxRsScq31vJvrgMIC_xlujUzZ6__ig1E-ioVOpXze5QQdfIm.BwcwwOu.u5JXrgEwZn-j45yRu6cPJDbGy2oR8fCeM8EZ";
    code_challenge: "Q4TyNAXAoNIieh-K1YPfcn6EsTR40PMe4N1Cyf1KeOM";
  };

  error: unknown;
};
