import Image from "next/image";
import type { Brand } from "@/types/brand";

type BrandCardIdentityProps = {
  brand: Brand;
  className?: string;
  decorative?: boolean;
};

export function BrandCardIdentity({ brand, className, decorative = false }: BrandCardIdentityProps) {
  const rootClassName = ["brand-card-identity", `brand-card-identity--${brand.id}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={rootClassName}>
      <strong className="brand-card-identity__logo">
        <Image
          src={brand.logoSrc}
          alt={decorative ? "" : brand.logoAlt}
          width={brand.logoWidth}
          height={brand.logoHeight}
          sizes="(max-width: 768px) 7.2rem, 10.4rem"
        />
      </strong>
      <span className="brand-card-identity__line" aria-hidden="true" />
      <span className="brand-card-identity__description">{brand.visualTagline}</span>
    </span>
  );
}
