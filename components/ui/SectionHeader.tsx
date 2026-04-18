import type { ReactNode } from "react";
import { cn } from "../cn";

export type SectionHeaderVariant = "default" | "ink";

export type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  variant?: SectionHeaderVariant;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  variant = "default",
}: SectionHeaderProps) {
  const ink = variant === "ink";

  return (
    <header data-section-header>
      {eyebrow != null && eyebrow !== "" ? (
        <p
          className={cn(
            "mb-2 text-xs font-light uppercase tracking-widest",
            ink ? "text-white/75" : "text-brand-primary/80"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "section-title h-section",
          ink && "!text-white"
        )}
      >
        {title}
      </h2>
      {lead != null && lead !== "" ? (
        <p
          className={cn(
            "section-lead mt-2",
            ink && "!text-neutral-200"
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
