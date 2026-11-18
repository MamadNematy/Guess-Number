const D = [
  ["7", "8%", "18%"], ["42", "20%", "62%"], ["?", "34%", "30%"], ["99", "52%", "72%"], ["13", "66%", "22%"],
  ["58", "78%", "58%"], ["3", "90%", "28%"], ["?", "14%", "82%"], ["21", "86%", "80%"],
];

export default function HeroBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="pixels absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-accent/20 blur-3xl" style={{ animation: "drift 12s ease-in-out infinite" }} />
      <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" style={{ animation: "drift 16s ease-in-out infinite reverse" }} />
      {D.map(([t, x, y], i) => (
        <span key={i} className="absolute text-3xl font-medium text-accent/25 sm:text-5xl"
          style={{ left: x, top: y, animation: `floatNum ${8 + i}s ease-in-out ${i * 0.4}s infinite` }}>{t}</span>
      ))}
    </div>
  );
}
