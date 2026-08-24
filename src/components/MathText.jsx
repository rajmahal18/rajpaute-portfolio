import React from "react";

const FRACTION_PATTERN = /\{\{frac\|([^|{}]+)\|([^{}]+)\}\}/g;
const SUPERSCRIPT_PATTERN = /([⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣ]+)/g;
const SUPERSCRIPT_MAP = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "ⁿ": "n",
  "ˣ": "x",
};

function superscriptText(value) {
  return [...value].map((character) => SUPERSCRIPT_MAP[character] || character).join("");
}

function renderSuperscripts(text, keyPrefix) {
  return String(text).split(SUPERSCRIPT_PATTERN).filter(Boolean).map((part, index) => {
    if (/^[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣ]+$/.test(part)) {
      return <sup key={`${keyPrefix}-sup-${index}`} className="math-sup">{superscriptText(part)}</sup>;
    }
    return <React.Fragment key={`${keyPrefix}-text-${index}`}>{part}</React.Fragment>;
  });
}

export default function MathText({ text }) {
  const value = String(text ?? "");
  const nodes = [];
  let cursor = 0;
  let match;
  let fractionIndex = 0;

  FRACTION_PATTERN.lastIndex = 0;
  while ((match = FRACTION_PATTERN.exec(value)) !== null) {
    if (match.index > cursor) {
      nodes.push(...renderSuperscripts(value.slice(cursor, match.index), `plain-${fractionIndex}`));
    }

    const numerator = match[1].trim();
    const denominator = match[2].trim();
    nodes.push(
      <span
        key={`fraction-${fractionIndex}`}
        className="math-fraction"
        aria-label={`${numerator} over ${denominator}`}
      >
        <span aria-hidden="true" className="math-fraction-numerator">{renderSuperscripts(numerator, `num-${fractionIndex}`)}</span>
        <span aria-hidden="true" className="math-fraction-denominator">{renderSuperscripts(denominator, `den-${fractionIndex}`)}</span>
      </span>
    );

    cursor = match.index + match[0].length;
    fractionIndex += 1;
  }

  if (cursor < value.length) {
    nodes.push(...renderSuperscripts(value.slice(cursor), `tail-${fractionIndex}`));
  }

  return <>{nodes}</>;
}
