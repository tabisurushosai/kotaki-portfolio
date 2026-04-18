import type { ReactNode } from "react";
import { cn } from "../cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 max-w-5xl px-4 sm:px-6 md:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
