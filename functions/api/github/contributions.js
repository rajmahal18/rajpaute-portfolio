import { json } from "../../_shared/json.js";

const DEFAULT_USERNAME = "rajmahal18";
const QUERY = `
  query PortfolioContributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
            }
          }
        }
      }
    }
  }
`;

function contributionWindow() {
  const to = new Date();
  const from = new Date(to);
  from.setUTCFullYear(from.getUTCFullYear() - 1);
  from.setUTCDate(from.getUTCDate() + 1);
  return { from: from.toISOString(), to: to.toISOString() };
}

function normalizeWeeks(weeks = []) {
  return weeks.map((week) => ({
    firstDay: week.firstDay,
    days: (week.contributionDays || []).map((day) => ({
      date: day.date,
      count: Number(day.contributionCount) || 0,
      level: day.contributionLevel || "NONE",
      weekday: Number(day.weekday),
    })),
  }));
}

export async function onRequestGet({ env }) {
  const token = env.GITHUB_TOKEN;
  const username = env.GITHUB_USERNAME || DEFAULT_USERNAME;

  if (!token) {
    return json(
      { error: "GitHub activity is not configured.", code: "GITHUB_TOKEN_MISSING" },
      503,
      { "Cache-Control": "no-store" }
    );
  }

  const { from, to } = contributionWindow();
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "raj-paute-portfolio",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: username, from, to } }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.errors?.length) {
    return json(
      { error: "GitHub activity is temporarily unavailable." },
      502,
      { "Cache-Control": "no-store" }
    );
  }

  const user = payload?.data?.user;
  const calendar = user?.contributionsCollection?.contributionCalendar;
  if (!user || !calendar) {
    return json({ error: "GitHub profile was not found." }, 404);
  }

  return json(
    {
      username: user.login,
      totalContributions: Number(calendar.totalContributions) || 0,
      from,
      to,
      weeks: normalizeWeeks(calendar.weeks),
    },
    200,
    {
      "Cache-Control": "public, max-age=600, s-maxage=21600, stale-while-revalidate=86400",
    }
  );
}
