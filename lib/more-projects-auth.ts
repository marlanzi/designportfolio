import { createHmac, timingSafeEqual } from "node:crypto";

/* Password gate for the private "More projects" area. The password lives only
   in the MORE_PROJECTS_PASSWORD environment variable; the cookie stores an
   HMAC derived from it, never the password itself, so changing the password
   signs everyone out. */

export const MORE_PROJECTS_COOKIE = "more-projects";

function secret() {
  return process.env.MORE_PROJECTS_PASSWORD ?? "";
}

export function accessToken() {
  return createHmac("sha256", secret()).update("more-projects:v1").digest("hex");
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function checkPassword(attempt: string) {
  const expected = secret();
  // No password configured: nothing unlocks
  if (!expected) return false;
  return safeEqual(attempt, expected);
}

export function hasAccess(token: string | undefined) {
  if (!secret() || !token) return false;
  return safeEqual(token, accessToken());
}
