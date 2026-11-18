const XS = [12.5, 37.5, 62.5, 87.5];

export default function StackFlow() {
  return (
    <div className="hidden lg:block">
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-28 w-full" aria-hidden>
        {XS.map((x, i) => (
          <path key={i} d={`M${x} 0 C${x} 18, 50 10, 50 30`} fill="none" stroke="var(--color-accent)"
            strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="flow" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </svg>
      <div className="mx-auto w-fit rounded-2xl border border-accent/60 bg-card px-8 py-4 text-xl shadow-[0_0_40px_-10px_var(--color-accent)]">
        Guess The Number
      </div>
    </div>
  );
}
