import type { Metadata } from "next";
import { AboutVisionMotionStudy } from "@/components/previews/AboutVisionMotionStudy";

export const metadata: Metadata = {
  title: "About & Vision Motion Study | ROTI",
  description: "ROTI About and Vision cinematic motion prototype.",
  robots: {
    index: false,
    follow: false
  }
};

export default function MotionStudyPage() {
  return <AboutVisionMotionStudy />;
}
