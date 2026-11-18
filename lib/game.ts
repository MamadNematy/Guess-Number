// All game rules live in this file. The React components only display them.

export type Hint = "low" | "high" | "correct";
export type Guess = { value: number; hint: Hint };
export type Level = { id: "easy" | "normal" | "hard"; label: string; max: number };

export const MAX_ATTEMPTS = 10;
export const LEVELS: Level[] = [
  { id: "easy", label: "Easy", max: 50 },
  { id: "normal", label: "Normal", max: 100 },
  { id: "hard", label: "Hard", max: 500 },
];

// Random whole number from 1 to max
export const randomTarget = (max: number): number => Math.floor(Math.random() * max) + 1;

// Returns the number if the text is a whole number from 1 to max, otherwise null
export function validate(raw: string, max: number): number | null {
  if (!/^\d+$/.test(raw.trim())) return null;
  const n = Number(raw);
  return n >= 1 && n <= max ? n : null;
}

export const judge = (guess: number, target: number): Hint =>
  guess === target ? "correct" : guess > target ? "high" : "low";

// How many times in a row the last guesses missed on the same side
export function trend(hints: Hint[]): number {
  let count = 0;
  for (let i = hints.length - 1; i > 0; i--) {
    if (hints[i] !== "correct" && hints[i] === hints[i - 1]) count++;
    else break;
  }
  return count;
}

// The numbers that are still possible after the guesses so far
export function range(guesses: Guess[], max: number): [number, number] {
  let lo = 1;
  let hi = max;
  for (const g of guesses) {
    if (g.hint === "low") lo = Math.max(lo, g.value + 1);
    if (g.hint === "high") hi = Math.min(hi, g.value - 1);
  }
  return [lo, hi];
}
