export type Authorizer = {
  startInteraction: (url: string) => Promise<string>;
  login: (cookies: string) => Promise<string>;
  confirm: (cookies: string) => Promise<string>;
  abort: (cookies: string) => Promise<string>;
};
