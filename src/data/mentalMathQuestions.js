export const mentalMathQuestions = [
  {
    id: "number-01",
    category: "Number sense",
    prompt: "48 × 25",
    answer: 1200,
    solution: "Use 25 = 100 ÷ 4. So 48 × 25 = 4800 ÷ 4 = 1200.",
  },
  {
    id: "number-02",
    category: "Number sense",
    prompt: "125 × 72",
    answer: 9000,
    solution: "Group 72 as 8 × 9. Since 125 × 8 = 1000, the result is 1000 × 9 = 9000.",
  },
  {
    id: "number-03",
    category: "Number sense",
    prompt: "999 + 888 − 777",
    answer: 1110,
    solution: "Pair the easy difference first: 888 − 777 = 111. Then 999 + 111 = 1110.",
  },
  {
    id: "number-04",
    category: "Number sense",
    prompt: "35² − 15²",
    answer: 1000,
    solution: "Use a² − b² = (a − b)(a + b): 20 × 50 = 1000.",
  },
  {
    id: "number-05",
    category: "Number sense",
    prompt: "102² − 98²",
    answer: 800,
    solution: "Use difference of squares: (102 − 98)(102 + 98) = 4 × 200 = 800.",
  },
  {
    id: "number-06",
    category: "Number sense",
    prompt: "What is the sum of all integers from 1 to 24?",
    answer: 300,
    solution: "Pair first and last terms: 24 × 25 ÷ 2 = 300.",
  },
  {
    id: "number-07",
    category: "Number sense",
    prompt: "What is the sum of the first 15 positive odd integers?",
    answer: 225,
    solution: "The first n odd numbers sum to n². So 15² = 225.",
  },
  {
    id: "number-08",
    category: "Number theory",
    prompt: "Find the least common multiple of 12, 18, and 30.",
    answer: 180,
    solution: "Take the highest prime powers: 2² × 3² × 5 = 4 × 9 × 5 = 180.",
  },
  {
    id: "number-09",
    category: "Digits",
    prompt: "A two-digit number has digits whose sum is 11. Reversing its digits increases the number by 27. What is the original number?",
    answer: 47,
    solution: "Reversing changes a two-digit number by 9 times the digit difference. 27 ÷ 9 = 3, so the digits differ by 3 and sum to 11: 4 and 7. The original is 47.",
  },
  {
    id: "number-10",
    category: "Number theory",
    prompt: "What is the smallest positive integer that leaves remainder 2 when divided by 5 and remainder 4 when divided by 7?",
    answer: 32,
    solution: "Numbers that are 2 mod 5 are 2, 7, 12, 17, 22, 27, 32. The first that is also 4 mod 7 is 32.",
  },
  {
    id: "percent-01",
    category: "Percent",
    prompt: "What is 62.5% of 144?",
    answer: 90,
    solution: "62.5% = {{frac|5|8}}. One-eighth of 144 is 18, and 18 × 5 = 90.",
  },
  {
    id: "percent-02",
    category: "Percent",
    prompt: "What is 15% of 360 plus 25% of 160?",
    answer: 94,
    solution: "15% of 360 = 54 and 25% of 160 = 40. Add them: 94.",
  },
  {
    id: "fraction-01",
    category: "Fractions",
    prompt: "Three-fifths of a number is 42 greater than one-fourth of the same number. Find the number.",
    answer: 120,
    solution: "{{frac|3|5}} − {{frac|1|4}} = {{frac|7|20}}. So {{frac|7|20}} of the number is 42, giving 42 × 20 ÷ 7 = 120.",
  },
  {
    id: "ratio-01",
    category: "Ratio",
    prompt: "A : B = 3 : 5 and B : C = 10 : 7. If B = 40, find A + C.",
    answer: 52,
    solution: "From A : B = 3 : 5, A = 24. From B : C = 10 : 7, C = 28. So A + C = 52.",
  },
  {
    id: "percent-03",
    category: "Percent",
    prompt: "A price of ₱800 is increased by 25%, then discounted by 20%. What is the final price?",
    answer: 800,
    solution: "Increase ₱800 by 25% to ₱1000. Then 20% off ₱1000 is ₱200, bringing it back to ₱800.",
  },
  {
    id: "percent-04",
    category: "Percent",
    prompt: "An item costs ₱960 after a 20% discount. What was its original price?",
    answer: 1200,
    solution: "₱960 is 80% of the original. Divide by 0.8: ₱960 ÷ 0.8 = ₱1200.",
  },
  {
    id: "percent-05",
    category: "Percent",
    prompt: "30% of a number plus 20 is 110. Find the number.",
    answer: 300,
    solution: "Subtract 20 first: 30% of the number is 90. Since 10% is 30, the whole number is 300.",
  },
  {
    id: "ratio-02",
    category: "Ratio",
    prompt: "Three quantities are in the ratio 2 : 3 : 5 and their sum is 140. What is the largest quantity?",
    answer: 70,
    solution: "The ratio has 10 total parts. Each part is 140 ÷ 10 = 14, so the largest is 5 × 14 = 70.",
  },
  {
    id: "fraction-02",
    category: "Fractions",
    prompt: "Three-fifths of a class are girls. One-third of the girls are absent. If 24 girls are present, how many students are in the class?",
    answer: 60,
    solution: "Present girls are {{frac|2|3}} of all girls, so there are 36 girls. If 36 is {{frac|3|5}} of the class, the class has 36 × 5 ÷ 3 = 60 students.",
  },
  {
    id: "ratio-03",
    category: "Ratio",
    prompt: "The ratio of A to B is 5 : 3. If A gives 8 to B, they become equal. What is A + B?",
    answer: 64,
    solution: "Let A = 5k and B = 3k. Equal after the transfer means 5k − 8 = 3k + 8, so k = 8. Total = 8k = 64.",
  },
  {
    id: "age-01",
    category: "Age",
    prompt: "Ana is twice Ben’s age. Six years ago, Ana was three times Ben’s age. How old is Ana now?",
    answer: 24,
    solution: "Let Ben be B, so Ana is 2B. Six years ago: 2B − 6 = 3(B − 6), giving B = 12. Ana is 24.",
  },
  {
    id: "age-02",
    category: "Age",
    prompt: "A father is 44 and his son is 14. How many years ago was the father four times as old as his son?",
    answer: 4,
    solution: "Four years ago they were 40 and 10. Since 40 = 4 × 10, the answer is 4 years ago.",
  },
  {
    id: "age-03",
    category: "Age",
    prompt: "A mother and daughter have a total age of 50. In five years, the mother will be three times the daughter’s age. How old is the daughter now?",
    answer: 10,
    solution: "Their total in five years will be 60. A 3 : 1 split of 60 gives 45 and 15 then, so the daughter is 10 now.",
  },
  {
    id: "age-04",
    category: "Age",
    prompt: "Two brothers are 4 years apart. Five years ago, the older brother was twice the younger brother’s age. How old is the older brother now?",
    answer: 13,
    solution: "Five years ago their ages differed by 4 and one was twice the other, so they were 8 and 4. Add five years: the older brother is 13.",
  },
  {
    id: "age-05",
    category: "Age",
    prompt: "A is 4 years older than B. Three years ago, the sum of their ages was 22. How old is B now?",
    answer: 12,
    solution: "Their current age sum is 22 + 6 = 28. Two ages 4 apart that total 28 are 16 and 12, so B is 12.",
  },
  {
    id: "age-06",
    category: "Age",
    prompt: "Three siblings have consecutive even ages whose sum is 42. How old is the oldest?",
    answer: 16,
    solution: "The middle age is the average: 42 ÷ 3 = 14. The consecutive even ages are 12, 14, and 16.",
  },
  {
    id: "age-07",
    category: "Age",
    prompt: "A father is 36 and his daughter is 8. In how many years will the father be three times her age?",
    answer: 6,
    solution: "In 6 years they will be 42 and 14, and 42 = 3 × 14.",
  },
  {
    id: "age-08",
    category: "Age",
    prompt: "In four years, a person’s age will be {{frac|5|4}} of their present age. What is their present age?",
    answer: 16,
    solution: "The extra {{frac|1|4}} of the present age equals 4 years. So one-fourth is 4 and the present age is 16.",
  },
  {
    id: "age-09",
    category: "Age",
    prompt: "Mia is three times Leo’s age. In eight years, Mia will be twice Leo’s age. How old is Mia now?",
    answer: 24,
    solution: "Let Leo be L, so Mia is 3L. In eight years: 3L + 8 = 2(L + 8), giving L = 8. Mia is 24.",
  },
  {
    id: "age-10",
    category: "Average",
    prompt: "The average age of four people is 18. When a fifth person joins, the average becomes 20. How old is the fifth person?",
    answer: 28,
    solution: "The first four total 4 × 18 = 72. Five people total 5 × 20 = 100. The newcomer is 100 − 72 = 28.",
  },
  {
    id: "distance-01",
    category: "Distance",
    prompt: "A car travels at 72 km/h for 25 minutes. How many kilometers does it travel?",
    answer: 30,
    displayAnswer: "30 km",
    solution: "25 minutes is {{frac|5|12}} of an hour. 72 × {{frac|5|12}} = 6 × 5 = 30 km.",
  },
  {
    id: "distance-02",
    category: "Distance",
    prompt: "A train moving at 90 km/h passes a pole in 20 seconds. How long is the train, in meters?",
    answer: 500,
    displayAnswer: "500 m",
    solution: "90 km/h = 25 m/s. In 20 seconds the train travels its own length: 25 × 20 = 500 m.",
  },
  {
    id: "distance-03",
    category: "Distance",
    prompt: "Two cyclists leave the same point in opposite directions at 18 km/h and 12 km/h. How far apart are they after 2.5 hours?",
    answer: 75,
    displayAnswer: "75 km",
    solution: "Opposite directions add their speeds: 18 + 12 = 30 km/h. Then 30 × 2.5 = 75 km.",
  },
  {
    id: "distance-04",
    category: "Distance",
    prompt: "A rider travels at 40 km/h. Thirty minutes later, another rider leaves the same point at 60 km/h. How many hours after the second rider starts will they catch the first?",
    answer: 1,
    displayAnswer: "1 hour",
    solution: "The first rider has a 20 km head start. The closing speed is 60 − 40 = 20 km/h, so catching up takes 1 hour.",
  },
  {
    id: "distance-05",
    category: "Average speed",
    prompt: "A person travels 12 km at 4 km/h, then 18 km at 6 km/h. What is the average speed for the whole trip?",
    answer: 5,
    displayAnswer: "5 km/h",
    solution: "The two legs each take 3 hours. Total distance is 30 km over 6 hours, so the average speed is 5 km/h.",
  },
  {
    id: "work-01",
    category: "Work",
    prompt: "A can finish a job in 6 days and B in 3 days. How many days will they need working together?",
    answer: 2,
    displayAnswer: "2 days",
    solution: "Their daily rates are {{frac|1|6}} and {{frac|1|3}}. Together that is {{frac|1|2}} of the job per day, so they need 2 days.",
  },
  {
    id: "work-02",
    category: "Work",
    prompt: "A pipe fills a tank in 12 minutes while a drain empties it in 18 minutes. If both are open, how long does it take to fill the tank?",
    answer: 36,
    displayAnswer: "36 min",
    solution: "Net rate = {{frac|1|12}} − {{frac|1|18}} = {{frac|1|36}} of the tank per minute, so the tank fills in 36 minutes.",
  },
  {
    id: "work-03",
    category: "Work",
    prompt: "Eight workers can finish a job in 15 days. At the same rate, how many days will 12 workers need?",
    answer: 10,
    displayAnswer: "10 days",
    solution: "The job is 8 × 15 = 120 worker-days. With 12 workers: 120 ÷ 12 = 10 days.",
  },
  {
    id: "work-04",
    category: "Work",
    prompt: "A can do a job alone in 10 hours. A and B together can do it in 6 hours. How long would B need alone?",
    answer: 15,
    displayAnswer: "15 h",
    solution: "B’s rate is {{frac|1|6}} − {{frac|1|10}} = {{frac|1|15}} of the job per hour, so B alone needs 15 hours.",
  },
  {
    id: "rate-01",
    category: "Rate",
    prompt: "Three machines make 450 items in 5 minutes. At the same rate, how many items can five machines make in 8 minutes?",
    answer: 1200,
    displayAnswer: "1200 items",
    solution: "Each machine makes 450 ÷ (3 × 5) = 30 items per minute. Five machines for 8 minutes make 30 × 5 × 8 = 1200.",
  },
  {
    id: "algebra-01",
    category: "Algebra",
    prompt: "If (x + {{frac|1|x}}) = 5, find (x² + {{frac|1|x²}}).",
    answer: 23,
    solution: "Square the given expression: (x + {{frac|1|x}})² = x² + 2 + {{frac|1|x²}} = 25. Subtract 2 to get 23.",
  },
  {
    id: "algebra-02",
    category: "Algebra",
    prompt: "If a + b = 18 and ab = 77, find a² + b².",
    answer: 170,
    solution: "Use a² + b² = (a + b)² − 2ab = 18² − 154 = 324 − 154 = 170.",
  },
  {
    id: "algebra-03",
    category: "Algebra",
    prompt: "If x + y = 13 and x − y = 5, find 3x + 2y.",
    answer: 35,
    solution: "Add the equations to get 2x = 18, so x = 9 and y = 4. Then 3(9) + 2(4) = 35.",
  },
  {
    id: "pattern-01",
    category: "Pattern",
    prompt: "Find the next number: 2, 6, 12, 20, 30, ___",
    answer: 42,
    solution: "The terms are n(n + 1): 1 × 2, 2 × 3, 3 × 4, 4 × 5, 5 × 6. Next is 6 × 7 = 42.",
  },
  {
    id: "pattern-02",
    category: "Pattern",
    prompt: "Find the next number: 3, 8, 15, 24, 35, ___",
    answer: 48,
    solution: "The differences are 5, 7, 9, 11, so the next difference is 13. Then 35 + 13 = 48.",
  },
  {
    id: "pattern-03",
    category: "Pattern",
    prompt: "Find the next number: 2, 5, 11, 23, 47, ___",
    answer: 95,
    solution: "Each term is double the previous term plus 1. So 47 × 2 + 1 = 95.",
  },
  {
    id: "algebra-04",
    category: "Algebra",
    prompt: "If 2ˣ × 8 = 256, find x.",
    answer: 5,
    solution: "8 = 2³ and 256 = 2⁸. So 2ˣ × 2³ = 2⁸, which gives x + 3 = 8 and x = 5.",
  },
  {
    id: "algebra-05",
    category: "Algebra",
    prompt: "If {{frac|x|3}} + {{frac|x|4}} = 14, find x.",
    answer: 24,
    solution: "{{frac|1|3}} + {{frac|1|4}} = {{frac|7|12}}, so {{frac|7x|12}} = 14. Multiply by {{frac|12|7}} to get x = 24.",
  },
  {
    id: "geometry-01",
    category: "Geometry",
    prompt: "How many diagonals does a regular decagon have?",
    answer: 35,
    solution: "An n-gon has {{frac|n(n − 3)|2}} diagonals. For n = 10: 10 × 7 ÷ 2 = 35.",
  },
  {
    id: "clock-01",
    category: "Geometry",
    prompt: "What is the smaller angle between the hands of a clock at exactly 3:30?",
    answer: 75,
    displayAnswer: "75°",
    solution: "At 3:30 the minute hand is at 180°. The hour hand is halfway between 3 and 4, at 105°. The difference is 75°.",
  },
];

export function parseMentalMathAnswer(value) {
  const normalized = String(value ?? "")
    .trim()
    .replace(/,/g, "")
    .replace(/[₱$%°]/g, "")
    .replace(/\s+/g, "");
  if (!normalized) return null;
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
}

export function getMentalMathQuestionById(id) {
  return mentalMathQuestions.find((question) => question.id === id) || null;
}

export function getMentalMathAnswerLabel(question) {
  if (!question) return "—";
  return question.displayAnswer || String(question.answer);
}

export function getRandomMentalMathQuestion({ excludeId = null, allowedIds = null } = {}) {
  const allowed = Array.isArray(allowedIds) && allowedIds.length
    ? new Set(allowedIds)
    : null;
  let pool = mentalMathQuestions.filter((question) => (!allowed || allowed.has(question.id)) && question.id !== excludeId);
  if (!pool.length) pool = mentalMathQuestions.filter((question) => !allowed || allowed.has(question.id));
  if (!pool.length) pool = mentalMathQuestions;
  return pool[Math.floor(Math.random() * pool.length)];
}
