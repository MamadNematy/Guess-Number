import Game from "@/components/Game";
import Reveal from "@/components/Reveal";
import HeroBg from "@/components/HeroBg";
import StackFlow from "@/components/StackFlow";
import { LOGOS } from "@/components/Logos";

const REPO = "https://github.com/MamadNematy/Guess-Number";
const STACK = [
  ["Next.js", "App Router and fast static build"],
  ["React", "State-driven game interface"],
  ["TypeScript", "Typed game rules"],
  ["Tailwind CSS", "Dark theme with no custom CSS files"],
];
const STEPS = [
  [
    "1",
    "The computer picks",
    "A random whole number is chosen at the start of every round. Pick a level to set the range.",
  ],
  [
    "2",
    "You guess",
    "You have 10 attempts. Type a number and press Enter to see if it is too high or too low.",
  ],
  [
    "3",
    "The range narrows",
    "Every hint shrinks the glowing range. Three misses on the same side make the card shake.",
  ],
];
const FAQ = [
  [
    "How is the number chosen?",
    "With Math.random, a new whole number inside the level range at the start of every round.",
  ],
  [
    "Why only 10 attempts?",
    "Halving the range each time finds any number from 1 to 100 in 7 guesses, so 10 is fair. Hard mode needs 9.",
  ],
  [
    "Is my best score saved?",
    "Yes, but only in your own browser. Nothing is sent to a server.",
  ],
];

export default function Home() {
  return (
    <main>
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
        <span className="flex items-center gap-3 text-2xl">
          <img src="/logo.svg" alt="" width={36} height={36} />
          Guess The Number
        </span>
        <a
          href={REPO}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-accent px-5 py-2 text-accent transition hover:bg-accent hover:text-bg"
        >
          View code
        </a>
      </header>

      <div className="relative overflow-hidden">
        <HeroBg />
        <section className="relative mx-auto max-w-4xl px-6 pt-20 pb-40 text-center md:pt-32">
          <h1
            className="rise mt-6 text-5xl leading-tight font-medium md:text-8xl"
            style={{ animationDelay: "150ms" }}
          >
            Guess The Number
          </h1>
          <p
            className="rise mx-auto mt-8 max-w-2xl text-lg text-mute md:text-2xl"
            style={{ animationDelay: "300ms" }}
          >
            The computer hides a number. You have 10 attempts to find it.
          </p>
          <a
            href="#play"
            className="rise mt-10 inline-block rounded-full bg-accent px-8 py-3.5 text-xl text-bg transition hover:scale-105"
            style={{ animationDelay: "450ms" }}
          >
            Play now
          </a>
        </section>
      </div>

      <section
        id="play"
        className="mx-auto max-w-6xl scroll-mt-8 px-4 py-16 sm:px-6"
      >
        <Game />
      </section>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center text-3xl md:text-4xl">How it works</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 150}>
                <div className="h-full rounded-2xl border border-line bg-card/70 p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-bg">
                    {n}
                  </span>
                  <h3 className="mt-4 text-2xl">{t}</h3>
                  <p className="mt-2 text-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center text-3xl md:text-4xl">Built with</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STACK.map(([n, d], i) => (
              <Reveal key={n} delay={i * 120}>
                <div className="h-full rounded-2xl border border-line bg-card/70 p-5 transition hover:-translate-y-1 hover:border-accent/60">
                  <div className="mb-4 text-ink">{LOGOS[n]}</div>
                  <h3 className="text-xl">{n}</h3>
                  <p className="mt-2 text-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <StackFlow />
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-8 shadow-[0_12px_0_-2px_#0c0d10,0_30px_60px_-12px_rgba(0,0,0,0.7)] transition-transform duration-500 [transform:perspective(1200px)_rotateX(4deg)] hover:[transform:perspective(1200px)_rotateX(0deg)]">
            <div
              aria-hidden
              className="pixels absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent)]"
            />
            <div className="relative">
              <h2 className="mb-8 text-3xl md:text-4xl">Questions</h2>
              {FAQ.map(([q, a]) => (
                <details
                  key={q}
                  className="border-t border-line py-5 last:border-b"
                >
                  <summary className="cursor-pointer text-xl">{q}</summary>
                  <p className="mt-3 text-mute">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <footer className="mt-16 border-t border-line">
        <div aria-hidden className="relative h-20 overflow-hidden">
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-line" />
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute left-0 h-9 w-9 text-accent"
            style={{
              top: "calc(50% - 18px)",
              animation: "fly 14s linear infinite",
            }}
          >
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
        <div className="mx-auto max-w-4xl px-6 pb-12">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-card/80 text-mute md:flex-row">
            <p className="flex-1 p-6">
              Guess The Number, my first JavaScript project rebuilt with Next.js
            </p>
            <div className="border-t border-dashed border-line md:border-s md:border-t-0" />
            <p className="flex-1 p-6 text-ink">
              Developed by{" "}
              <a
                href="https://github.com/MamadNematy"
                target="_blank"
                rel="noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                Mohammad Hassan Nemati
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
