import { clearSessionCookie } from "../../../_shared/mathAuth.js";
import { json } from "../../../_shared/json.js";

export async function onRequestPost({ request }) {
  return json({ authenticated: false }, 200, { "Set-Cookie": clearSessionCookie(request) });
}
