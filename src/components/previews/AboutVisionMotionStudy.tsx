"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import { CinematicSectionReveal } from "@/components/motion/CinematicSectionReveal";
import { ScrollFillTypography } from "@/components/motion/ScrollFillTypography";
import { AboutRotiSection } from "@/components/sections/AboutRotiSection";
import { RotiVisionValuesSection } from "@/components/sections/RotiVisionValuesSection";
import { HOME_SECTION_IDS } from "@/data/sections";
import { siteContent } from "@/data/siteContent";
import styles from "./AboutVisionMotionStudy.module.css";

type StudySection = "opening" | "about" | "vision";

const STUDY_SECTION_IDS: Record<StudySection, string> = {
  opening: "motion-study-opening",
  about: HOME_SECTION_IDS.about,
  vision: HOME_SECTION_IDS.standard
};

export function AboutVisionMotionStudy() {
  const [activeSection, setActiveSection] = useState<StudySection>("opening");
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const sections = (Object.entries(STUDY_SECTION_IDS) as Array<[StudySection, string]>)
      .map(([key, id]) => ({ key, element: document.getElementById(id) }))
      .filter((entry): entry is { key: StudySection; element: HTMLElement } => Boolean(entry.element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const matched = sections.find(({ element }) => element === visible?.target);
        if (matched) {
          setActiveSection(matched.key);
        }
      },
      { threshold: [0.3, 0.55, 0.75] }
    );

    sections.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const replayCurrentSection = () => {
    if (activeSection === "opening") {
      document.getElementById(STUDY_SECTION_IDS.opening)?.scrollIntoView({ behavior: "smooth" });
    }
    setReplayKey((current) => current + 1);
  };

  return (
    <main className={styles.study}>
      <header className={styles.studyHeader} aria-label="모션 시안 탐색">
        <a className={styles.logo} href={`#${STUDY_SECTION_IDS.opening}`} aria-label="시안 처음으로 이동">
          <Image src="/images/logos/roti-logo.png" alt="ROTI" width={589} height={140} priority />
        </a>

        <nav className={styles.navigation} aria-label="시안 구간">
          {(Object.entries(STUDY_SECTION_IDS) as Array<[StudySection, string]>).map(([key, id]) => (
            <a key={key} href={`#${id}`} aria-current={activeSection === key ? "location" : undefined}>
              <span aria-hidden="true" />
              {key === "opening" ? "처음" : key === "about" ? "회사 소개" : "비전"}
            </a>
          ))}
        </nav>

        <button className={styles.replay} type="button" onClick={replayCurrentSection}>
          <ArrowCounterClockwise aria-hidden="true" weight="regular" />
          다시 보기
        </button>
      </header>

      <ScrollFillTypography
        id={STUDY_SECTION_IDS.opening}
        lines={siteContent.about.title}
        replayKey={replayKey}
      />

      <CinematicSectionReveal replayKey={replayKey}>
        <AboutRotiSection showTitle={false} />
        <RotiVisionValuesSection />
      </CinematicSectionReveal>
    </main>
  );
}
