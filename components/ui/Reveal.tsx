import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../cn";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** in-view 後、トランジション開始までの遅延（カード群の stagger 用） */
  delayMs?: number;
  /** true のとき交差検知は一度だけ */
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delayMs = 0,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setVisible(true);
        if (once) io.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn("reveal-item", visible && "reveal-item--visible", className)}
      style={
        reducedMotion || !visible
          ? undefined
          : { transitionDelay: `${delayMs}ms` }
      }
    >
      {children}
    </div>
  );
}
