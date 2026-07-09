import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type SectionGridProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function SectionGrid({ children, className, ...props }: SectionGridProps) {
  return (
    <div className={cx("section-grid", className)} {...props}>
      {children}
    </div>
  );
}
