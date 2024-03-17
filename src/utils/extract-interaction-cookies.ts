export const extractInteractionCookies = (cookies: string[]) => {
  const interactionCookies: string[] = [];

  for (const cookie of cookies) {
    const cookieParts = cookie.split(";");

    const interactionCookie = cookieParts.filter(
      (part) => !/(path|expires|samesite|secure|httponly)/i.test(part.trim()),
    )[0];

    interactionCookies.push(interactionCookie);
  }

  return interactionCookies.join("; ");
};
