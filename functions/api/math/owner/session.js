import { requireOwner } from "../../../_shared/mathAuth.js";
import { json } from "../../../_shared/json.js";

export async function onRequestGet({ request, env }) {
  const owner = await requireOwner(request, env);
  return json({ authenticated: Boolean(owner) });
}
