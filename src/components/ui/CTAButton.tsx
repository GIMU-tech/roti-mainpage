import type { AnchorHTMLAttributes, ReactNode } from "react";

type CTAButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function CTAButton({ children, ...props }: CTAButtonProps) {
  return (
    <a className="cta-button" {...props}>
      {children}
    </a>
  );
}
