"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HOME_SECTION_IDS } from "@/data/sections";
import { rotiStatsContent, type RotiStatItem } from "@/data/stats";

const COUNTER_DURATION_MS = 1400;
const COUNTER_ENTRY_THRESHOLD = 0.35;

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

type StatCellProps = {
  item: RotiStatItem;
  value: number;
  primary?: boolean;
};

function StatCell({ item, value, primary = false }: StatCellProps) {
  const formattedValue = `${Math.round(value)}${item.suffix ?? ""}`;
  const accessibleValue =
    item.suffix === "+"
      ? `${item.value} 이상`
      : item.suffix?.includes("~")
        ? `${item.value}년부터`
        : String(item.value);

  return (
    <article className={`roti-stats__stat${primary ? " roti-stats__stat--primary" : ""}`} data-stat={item.id}>
      <div className="roti-stats__stat-content">
        <p className="roti-stats__value" aria-label={`${accessibleValue}, ${item.label}`}>
          <span aria-hidden="true">{formattedValue}</span>
        </p>
        <p className={primary ? "roti-stats__prefix" : "roti-stats__label"}>
          {item.label}
          {item.detail ? <span className="roti-stats__detail">{item.detail}</span> : null}
        </p>
      </div>
      <div className="roti-stats__art" aria-hidden="true">
        <Image src={item.image} alt="" fill sizes={primary ? "26vw" : "17vw"} />
      </div>
    </article>
  );
}

export function RotiStatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const [values, setValues] = useState<number[]>(() => rotiStatsContent.items.map((item) => item.from));

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | undefined;

    const completeCounters = () => {
      setValues(rotiStatsContent.items.map((item) => item.value));
    };

    const startCounters = () => {
      if (hasAnimatedRef.current) {
        return;
      }

      hasAnimatedRef.current = true;
      observer?.disconnect();

      if (prefersReducedMotion) {
        completeCounters();
        return;
      }

      const startedAt = performance.now();

      const tick = (now: number) => {
        let isComplete = true;

        const nextValues = rotiStatsContent.items.map((item) => {
          const elapsed = now - startedAt - item.delay;
          const progress = Math.max(0, Math.min(elapsed / COUNTER_DURATION_MS, 1));

          if (progress < 1) {
            isComplete = false;
          }

          return item.from + (item.value - item.from) * easeOutCubic(progress);
        });

        setValues(nextValues);

        if (!isComplete) {
          animationFrameRef.current = window.requestAnimationFrame(tick);
        } else {
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      startCounters();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (entry?.isIntersecting && entry.intersectionRatio >= COUNTER_ENTRY_THRESHOLD) {
            startCounters();
          }
        },
        { threshold: [COUNTER_ENTRY_THRESHOLD] }
      );
      observer.observe(section);
    }

    return () => {
      observer?.disconnect();

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  const [primaryStat, ...secondaryStats] = rotiStatsContent.items;

  return (
    <section
      ref={sectionRef}
      id={HOME_SECTION_IDS.stats}
      className="roti-stats"
      aria-labelledby="roti-stats-title"
    >
      <div className="roti-stats__inner">
        <header className="roti-stats__intro">
          <h2 id="roti-stats-title">{rotiStatsContent.title}</h2>
          <p>{rotiStatsContent.description}</p>
        </header>

        <div className="roti-stats__board" aria-label="ROTI 주요 현황">
          <StatCell item={primaryStat} value={values[0]} primary />
          <div className="roti-stats__secondary">
            {secondaryStats.map((item, index) => (
              <StatCell key={item.id} item={item} value={values[index + 1]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
