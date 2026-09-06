import { json } from "../../_shared/json.js";

const WINDOW_DAYS = 365;
const FETCH_WINDOW_DAYS = WINDOW_DAYS + 1;
const DEFAULT_TIME_ZONE = "Asia/Manila";
const STEAM_ID64_BASE = 76561197960265728n;

function normalizeAccountId(rawValue) {
  if (!rawValue) return null;
  const value = String(rawValue).trim();
  if (!/^\d+$/.test(value)) return null;

  try {
    const numeric = BigInt(value);
    if (numeric >= STEAM_ID64_BASE) {
      const accountId = numeric - STEAM_ID64_BASE;
      if (accountId <= 0n || accountId > 4294967295n) return null;
      return accountId.toString();
    }
    if (numeric <= 0n || numeric > 4294967295n) return null;
    return numeric.toString();
  } catch {
    return null;
  }
}

function resolveTimeZone(rawValue) {
  const candidate = String(rawValue || DEFAULT_TIME_ZONE).trim() || DEFAULT_TIME_ZONE;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: candidate }).format(new Date());
    return candidate;
  } catch {
    return DEFAULT_TIME_ZONE;
  }
}

function isoDateInTimeZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function dateFromISO(value) {
  return new Date(`${value}T00:00:00Z`);
}

function isoFromDate(date) {
  return date.toISOString().slice(0, 10);
}

function shiftDate(value, days) {
  const date = dateFromISO(value);
  date.setUTCDate(date.getUTCDate() + days);
  return isoFromDate(date);
}

function activityLevel(count) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

function buildWeeks(counts, from, to) {
  const fromDate = dateFromISO(from);
  const toDate = dateFromISO(to);
  const firstWeek = new Date(fromDate);
  firstWeek.setUTCDate(firstWeek.getUTCDate() - firstWeek.getUTCDay());

  const weeks = [];
  for (let weekStart = new Date(firstWeek); weekStart <= toDate; weekStart.setUTCDate(weekStart.getUTCDate() + 7)) {
    const firstDay = isoFromDate(weekStart);
    const days = [];

    for (let weekday = 0; weekday < 7; weekday += 1) {
      const date = new Date(weekStart);
      date.setUTCDate(date.getUTCDate() + weekday);
      const dateKey = isoFromDate(date);
      if (dateKey < from || dateKey > to) continue;
      const count = counts.get(dateKey) || 0;
      days.push({ date: dateKey, count, level: activityLevel(count), weekday });
    }

    weeks.push({ firstDay, days });
  }

  return weeks;
}

export async function onRequestGet({ env }) {
  const rawAccountId = env.DOTA_ACCOUNT_ID || env.DOTA_STEAM_ID;
  const accountId = normalizeAccountId(rawAccountId);
  const timeZone = resolveTimeZone(env.DOTA_TIME_ZONE);

  if (!accountId) {
    return json(
      { error: "Dota activity is not configured.", code: "DOTA_ACCOUNT_ID_MISSING" },
      503,
      { "Cache-Control": "no-store" }
    );
  }

  const params = new URLSearchParams({
    date: String(FETCH_WINDOW_DAYS),
    limit: "2000",
    significant: "0",
  });
  if (env.OPENDOTA_API_KEY) params.set("api_key", env.OPENDOTA_API_KEY);

  const response = await fetch(`https://api.opendota.com/api/players/${accountId}/matches?${params.toString()}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "raj-paute-portfolio",
    },
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || !Array.isArray(payload)) {
    return json(
      { error: "Dota 2 activity is temporarily unavailable." },
      response.status === 429 ? 503 : 502,
      { "Cache-Control": "no-store" }
    );
  }

  const to = isoDateInTimeZone(new Date(), timeZone);
  const from = shiftDate(to, -(WINDOW_DAYS - 1));
  const counts = new Map();

  for (const match of payload) {
    const startTime = Number(match?.start_time);
    if (!Number.isFinite(startTime) || startTime <= 0) continue;
    const date = isoDateInTimeZone(new Date(startTime * 1000), timeZone);
    if (date < from || date > to) continue;
    counts.set(date, (counts.get(date) || 0) + 1);
  }

  const totalMatches = [...counts.values()].reduce((sum, count) => sum + count, 0);

  return json(
    {
      accountId,
      totalMatches,
      from,
      to,
      timeZone,
      weeks: buildWeeks(counts, from, to),
    },
    200,
    {
      "Cache-Control": "public, max-age=600, s-maxage=21600, stale-while-revalidate=86400",
    }
  );
}
