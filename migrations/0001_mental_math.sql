CREATE TABLE IF NOT EXISTS mental_math_benchmarks (
  question_id TEXT PRIMARY KEY,
  benchmark_ms INTEGER NOT NULL CHECK (benchmark_ms >= 250 AND benchmark_ms <= 120000),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
