import { createSessionToken, secretEquals, sessionCookie } from "../../../_shared/mathAuth.js";
import { json } from "../../../_shared/json.js";

export async function onRequestPost({ request, env }) {
  if (!env.MATH_OWNER_USERNAME || !env.MATH_OWNER_PASSWORD || !env.MATH_SESSION_SECRET) {
    return json({ error: "Owner authentication is not configured." }, 503);
  }
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }
  const username = String(body?.username || "").slice(0, 120);
  const password = String(body?.password || "").slice(0, 300);
  const validUser = await secretEquals(username, env.MATH_OWNER_USERNAME);
  const validPassword = await secretEquals(password, env.MATH_OWNER_PASSWORD);
  if (!validUser || !validPassword) return json({ error: "Invalid credentials." }, 401);
  const token = await createSessionToken(env.MATH_OWNER_USERNAME, env.MATH_SESSION_SECRET);
  return json({ authenticated: true }, 200, { "Set-Cookie": sessionCookie(token, request) });
}
