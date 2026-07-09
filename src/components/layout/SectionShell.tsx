import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "@/lib/utils";

type SectionShellProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(function SectionShell(
  { children, className, ...props },
  ref
) {
  return (
    <section ref={ref} className={cx("section-shell", className)} {...props}>
      {children}
    </section>
  );
});
