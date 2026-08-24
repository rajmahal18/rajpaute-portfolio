const COOKIE_NAME = "rp_math_session";
const MAX_AGE_SECONDS = 60 * 60 * 8;
const encoder = new TextEncoder();

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function hmacKey(secret) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

async function sign(body, secret) {
  const key = await hmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return toBase64Url(new Uint8Array(signature));
}

export async function createSessionToken(username, secret) {
  const payload = { u: username, exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS };
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  return `${body}.${await sign(body, secret)}`;
}

export async function verifySessionToken(token, secret) {
  try {
    const [body, signature] = String(token || "").split(".");
    if (!body || !signature) return null;
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify("HMAC", key, fromBase64Url(signature), encoder.encode(body));
    if (!valid) return null;
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body)));
    if (!payload?.u || !payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getCookie(request, name = COOKIE_NAME) {
  const cookie = request.headers.get("Cookie") || "";
  for (const part of cookie.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

export function sessionCookie(token, request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE_NAME}=${token}; Path=/api/math/owner; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE_SECONDS}${secure}`;
}

export function clearSessionCookie(request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/api/math/owner; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

export async function requireOwner(request, env) {
  if (!env.MATH_SESSION_SECRET) return null;
  const payload = await verifySessionToken(getCookie(request), env.MATH_SESSION_SECRET);
  if (!payload || payload.u !== env.MATH_OWNER_USERNAME) return null;
  return payload;
}

export async function secretEquals(candidate, expected) {
  if (typeof candidate !== "string" || typeof expected !== "string") return false;
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(candidate)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  const left = new Uint8Array(a);
  const right = new Uint8Array(b);
  let diff = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i += 1) diff |= (left[i] || 0) ^ (right[i] || 0);
  return diff === 0;
}
