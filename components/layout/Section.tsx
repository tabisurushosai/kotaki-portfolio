import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "../cn";
import { Container } from "./Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export type SectionTone = "paper" | "white" | "ink";

export type SectionProps = {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  tone: SectionTone;
  children: ReactNode;
  className?: string;
  /** ink セクションのみ。背景レイヤーがスクロールに応じてわずかに移動（reduced-motion では無効） */
  parallaxInk?: boolean;
};

const toneClass: Record<SectionTone, string> = {
  paper: "bg-brand-paper text-brand-ink",
  white: "bg-white text-brand-ink",
  ink: "bg-brand-primary-deep text-white",
};

export function Section({
  id,
  eyebrow,
  title,
  lead,
  tone,
  children,
  className,
  parallaxInk = false,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallaxInk || tone !== "ink") return;
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mq.matches;

    let raf = 0;
    const tick = () => {
      if (reduced) {
        layer.style.transform = "";
        return;
      }
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const mid = rect.top + rect.height / 2;
      const center = vh / 2;
      const norm = (mid - center) / Math.max(vh, 1);
      const max = rect.height * 0.05;
      const y = -norm * max;
      layer.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const onReducedChange = () => {
      reduced = mq.matches;
      if (reduced) layer.style.transform = "";
      else tick();
    };
    mq.addEventListener("change", onReducedChange);

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        tick();
        raf = 0;
      });
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      mq.removeEventListener("change", onReducedChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parallaxInk, tone]);

  const inkSurface =
    parallaxInk && tone === "ink"
      ? "relative overflow-hidden bg-transparent text-white"
      : toneClass.ink;

  const inner = (
    <>
      <Reveal>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          variant={tone === "ink" ? "ink" : "default"}
        />
      </Reveal>
      {children}
    </>
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        tone === "ink" ? inkSurface : toneClass[tone],
        "scroll-mt-[var(--site-header-scroll-padding)] py-section-mobile md:py-section",
        className
      )}
    >
      {parallaxInk && tone === "ink" ? (
        <>
          <div
            ref={layerRef}
            className="stance-parallax-layer pointer-events-none absolute inset-x-0 z-0 bg-brand-primary-deep"
            aria-hidden="true"
          />
          <Container className="relative z-10">{inner}</Container>
        </>
      ) : (
        <Container>{inner}</Container>
      )}
    </section>
  );
}
