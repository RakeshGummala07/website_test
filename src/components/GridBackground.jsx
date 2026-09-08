export default function GridBackground({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute top-10 right-0 h-[380px] w-[380px] rounded-full bg-magenta-500/[0.14] blur-[120px]" />
    </div>
  );
}
