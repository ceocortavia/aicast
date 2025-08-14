export default function GradientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-animated-gradient" />
      <div className="absolute inset-0 grid-overlay" />
    </div>
  );
}


