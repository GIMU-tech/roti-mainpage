import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ROTI Brand Portal",
  description: "ROTI integrated brand portal for ROTI CAMP, ROTI HOMESYS, and LeEL."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
