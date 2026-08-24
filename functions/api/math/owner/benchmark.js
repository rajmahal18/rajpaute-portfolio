import { requireOwner } from "../../../_shared/mathAuth.js";
import { json } from "../../../_shared/json.js";

export async function onRequestPost({ request, env }) {
  const owner = await requireOwner(request, env);
  if (!owner) return json({ error: "Unauthorized." }, 401);
  if (!env.DB) return json({ error: "D1 binding DB is not configured." }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }
  const questionId = String(body?.questionId || "").trim().slice(0, 80);
  const benchmarkMs = Math.round(Number(body?.benchmarkMs));
  if (!/^[a-z0-9-]+$/.test(questionId)) return json({ error: "Invalid question." }, 400);
  if (!Number.isFinite(benchmarkMs) || benchmarkMs < 250 || benchmarkMs > 120000) return json({ error: "Invalid benchmark time." }, 400);

  try {
    await env.DB.prepare(
      `INSERT INTO mental_math_benchmarks (question_id, benchmark_ms, updated_at)
       VALUES (?1, ?2, datetime('now'))
       ON CONFLICT(question_id) DO UPDATE SET benchmark_ms = excluded.benchmark_ms, updated_at = excluded.updated_at`
    ).bind(questionId, benchmarkMs).run();
  } catch {
    return json({ error: "Benchmark database is not initialized." }, 503);
  }

  return json({ saved: true, questionId, benchmarkMs });
}
