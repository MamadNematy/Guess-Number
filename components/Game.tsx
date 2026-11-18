"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Guess, judge, Level, LEVELS, MAX_ATTEMPTS, randomTarget, range, trend, validate } from "@/lib/game";
import Confetti from "./Confetti";

export default function Game() {
  const [level, setLevel] = useState<Level>(LEVELS[1]);
  const [target, setTarget] = useState(() => randomTarget(LEVELS[1].max));
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState("");
  const [best, setBest] = useState<Record<string, number>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  // best scores are kept in this browser only
  useEffect(() => {
    try { setBest(JSON.parse(localStorage.getItem("gtn-best") ?? "{}")); } catch { /* storage unavailable */ }
  }, []);

  const last = guesses[guesses.length - 1];
  const won = last?.hint === "correct";
  const lost = !won && guesses.length >= MAX_ATTEMPTS;
  const playing = !won && !lost;
  const [lo, hi] = range(guesses, level.max);
  const left = ((lo - 1) / level.max) * 100;
  const width = (Math.max(hi - lo + 1, 1) / level.max) * 100;

  const reset = (l: Level = level) => {
    setLevel(l); setTarget(randomTarget(l.max)); setGuesses([]); setInput(""); setError("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!playing) return;
    const value = validate(input, level.max);
    if (value === null) { setError(`Enter a whole number from 1 to ${level.max}`); return; }
    const hint = judge(value, target);
    const next = [...guesses, { value, hint }];
    setGuesses(next); setInput(""); setError("");
    if (hint === "correct") {
      if (!best[level.id] || next.length < best[level.id]) {
        const b = { ...best, [level.id]: next.length };
        setBest(b);
        try { localStorage.setItem("gtn-best", JSON.stringify(b)); } catch { /* storage unavailable */ }
      }
    } else if (trend(next.map((g) => g.hint)) >= 2) {
      setShake(hint);
      setTimeout(() => setShake(""), 500);
    }
  };

  const n = guesses.length;
  const message = error ? { t: error, c: "text-warn" }
    : won ? { t: `Correct! It was ${target}, found in ${n} ${n === 1 ? "attempt" : "attempts"}.`, c: "text-good" }
    : lost ? { t: `Game over. The number was ${target}.`, c: "text-red-400" }
    : last ? (last.hint === "high" ? { t: "Too high. Go lower.", c: "text-warn" } : { t: "Too low. Go higher.", c: "text-accent" })
    : { t: `Pick a number from 1 to ${level.max}.`, c: "text-mute" };

  return (
    <div className={`mx-auto max-w-xl rounded-3xl border border-line bg-card/80 p-5 sm:p-10 ${shake ? `shake-${shake}` : ""}`}>
      {won && <Confetti />}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-full bg-bg/70 p-1">
          {LEVELS.map((l) => (
            <button key={l.id} onClick={() => reset(l)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${l.id === level.id ? "bg-accent text-bg" : "text-mute hover:text-ink"}`}>
              {l.label} <span className="opacity-70">1-{l.max}</span>
            </button>
          ))}
        </div>
        <span className="text-sm text-mute">Best: {best[level.id] ? `${best[level.id]} attempts` : "none yet"}</span>
      </div>

      {/* the glowing segment is the range that is still possible */}
      <div className="mt-8" aria-label={`The number is between ${lo} and ${hi}`}>
        <div className="relative h-3 rounded-full bg-line">
          <div className="absolute h-3 rounded-full bg-accent shadow-[0_0_20px_var(--color-accent)] transition-all duration-700"
            style={{ left: `${left}%`, width: `${width}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-sm text-mute"><span>{lo}</span><span>{hi}</span></div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-1.5" aria-label={`${MAX_ATTEMPTS - n} attempts left`}>
        {Array.from({ length: MAX_ATTEMPTS }, (_, i) => (
          <span key={i} className={`h-3 w-3 rounded-full border transition-all duration-500 ${i < n ? "scale-75 border-line bg-line" : "border-accent bg-accent/30"}`} />
        ))}
      </div>

      <form onSubmit={submit} className="mt-8 flex gap-3">
        <input ref={inputRef} autoFocus value={input} onChange={(e) => setInput(e.target.value)} disabled={!playing}
          inputMode="numeric" maxLength={3} placeholder="Your guess..." aria-label="Your guess"
          className="min-w-0 flex-1 rounded-full border border-line bg-bg px-5 py-3 text-center text-xl disabled:opacity-40" />
        <button type="submit" disabled={!playing || input === ""}
          className="rounded-full bg-accent px-6 py-3 text-bg transition hover:scale-105 disabled:opacity-40">Guess</button>
      </form>

      <p key={message.t + n} aria-live="polite" className={`pop mt-6 min-h-8 text-center text-xl ${message.c}`}>{message.t}</p>

      {n > 0 && (
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {guesses.map((g, i) => (
            <li key={i} className={`pop rounded-full border px-3 py-1 text-sm ${g.hint === "correct" ? "border-good text-good" : g.hint === "high" ? "border-warn/60 text-warn" : "border-accent/60 text-accent"}`}>
              {g.value} {g.hint === "low" ? "↑" : g.hint === "high" ? "↓" : "✓"}
            </li>
          ))}
        </ul>
      )}

      {!playing && (
        <div className="mt-8 text-center">
          <button onClick={() => reset()} className="pop rounded-full border border-accent px-8 py-3 text-accent transition hover:bg-accent hover:text-bg">Play again</button>
        </div>
      )}
    </div>
  );
}
