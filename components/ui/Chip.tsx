import type { ReactNode } from "react";
import { cn } from "../cn";

export type ChipVariant = "period" | "status" | "body" | "tag";

export type ChipProps = {
  variant: ChipVariant;
  children: ReactNode;
  className?: string;
};

export function Chip({ variant, children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "chip",
        variant === "period" && "chip--period",
        variant === "status" && "chip--status",
        variant === "body" && "chip--body",
        variant === "tag" && "chip--tag",
        className
      )}
    >
      {children}
    </span>
  );
}
