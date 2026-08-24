import { mentalMathQuestions } from "../src/data/mentalMathQuestions.js";

const errors = [];
const ids = new Set();
const fractionPattern = /\{\{frac\|([^|{}]+)\|([^{}]+)\}\}/g;

if (mentalMathQuestions.length !== 50) errors.push(`Expected 50 questions, found ${mentalMathQuestions.length}.`);

for (const question of mentalMathQuestions) {
  if (!question.id || ids.has(question.id)) errors.push(`Duplicate or missing id: ${question.id || "<missing>"}`);
  ids.add(question.id);
  if (!question.category?.trim()) errors.push(`Missing category for ${question.id}.`);
  if (!question.prompt?.trim()) errors.push(`Missing prompt for ${question.id}.`);
  if (!Number.isFinite(question.answer)) errors.push(`Invalid numeric answer for ${question.id}.`);
  if (!question.solution?.trim()) errors.push(`Missing solution for ${question.id}.`);

  for (const [field, value] of [["prompt", question.prompt], ["solution", question.solution]]) {
    const opens = (value.match(/\{\{frac\|/g) || []).length;
    const matches = [...value.matchAll(fractionPattern)];
    if (opens !== matches.length) errors.push(`Invalid fraction markup in ${question.id} ${field}.`);
    for (const match of matches) {
      if (!match[1].trim() || !match[2].trim()) errors.push(`Empty fraction term in ${question.id} ${field}.`);
    }
    fractionPattern.lastIndex = 0;
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Mental math bank OK: ${mentalMathQuestions.length} questions, ${ids.size} unique ids, rich math markup valid.`);
