import { useEffect, useLayoutEffect, useRef, useState } from "react";

type HeroKpiAnimatedNumberProps = {
  value: number;
  className?: string;
  durationMs?: number;
};

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export function HeroKpiAnimatedNumber({
  value,
  className,
  durationMs = 500,
}: HeroKpiAnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
    }
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / durationMs);
          const eased = easeOutQuad(t);
          setDisplay(Math.round(value * eased));
          if (t < 1) {
            rafRef.current = requestAnimationFrame(tick);
          }
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.15, rootMargin: "0px" }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
