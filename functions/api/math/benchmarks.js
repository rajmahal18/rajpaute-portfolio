import { json } from "../../_shared/json.js";

const cacheHeaders = { "Cache-Control": "public, max-age=60, s-maxage=300" };

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ benchmarks: {} }, 200, cacheHeaders);
  try {
    const { results = [] } = await env.DB.prepare(
      "SELECT question_id, benchmark_ms FROM mental_math_benchmarks ORDER BY question_id"
    ).all();
    const benchmarks = Object.fromEntries(results.map((row) => [row.question_id, Number(row.benchmark_ms)]));
    return json({ benchmarks }, 200, cacheHeaders);
  } catch {
    return json({ benchmarks: {} }, 200, cacheHeaders);
  }
}
