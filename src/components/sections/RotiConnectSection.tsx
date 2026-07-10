"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { SectionGrid } from "@/components/layout/SectionGrid";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { rotiConnectContent, type RotiConnectItem } from "@/data/rotiConnect";
import { HOME_SECTION_IDS } from "@/data/sections";

export function RotiConnectSection() {
  const [activeId, setActiveId] = useState<RotiConnectItem["id"]>(rotiConnectContent.items[0].id);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeItem = rotiConnectContent.items.find((item) => item.id === activeId) ?? rotiConnectContent.items[0];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHasEntered(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const activateItem = (index: number, shouldFocus = false) => {
    const item = rotiConnectContent.items[index];

    if (!item) {
      return;
    }

    setActiveId(item.id);

    if (shouldFocus) {
      window.requestAnimationFrame(() => {
        triggerRefs.current[index]?.focus();
      });
    }
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = rotiConnectContent.items.length - 1;
    let targetIndex: number | undefined;

    if (event.key === "ArrowDown") {
      targetIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowUp") {
      targetIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      targetIndex = 0;
    } else if (event.key === "End") {
      targetIndex = lastIndex;
    }

    if (targetIndex === undefined) {
      return;
    }

    event.preventDefault();
    activateItem(targetIndex, true);
  };

  return (
    <SectionShell
      ref={sectionRef}
      className="roti-connect"
      id={HOME_SECTION_IDS.group}
      aria-labelledby="roti-connect-title"
      data-entered={hasEntered}
      data-visual={activeItem.visual}
    >
      <div className="roti-connect__visuals" aria-hidden="true">
        <span className="roti-connect__visual roti-connect__visual--rings" />
        <span className="roti-connect__visual roti-connect__visual--grid" />
        <span className="roti-connect__visual roti-connect__visual--network" />
      </div>
      <SectionGrid className="roti-connect__grid">
        <div className="roti-connect__intro">
          <SectionLabel>{rotiConnectContent.eyebrow}</SectionLabel>
          <h2 id="roti-connect-title" className="roti-connect__title">
            {rotiConnectContent.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="roti-connect__description">{rotiConnectContent.description}</p>
        </div>

        <ol className="roti-connect__items" aria-label="ROTI 문의 유형">
          {rotiConnectContent.items.map((item, index) => (
            <li
              key={item.id}
              className="roti-connect__item"
              data-active={activeId === item.id}
              data-visual={item.visual}
              style={{ "--connect-item-index": index } as CSSProperties}
            >
              <button
                ref={(element) => {
                  triggerRefs.current[index] = element;
                }}
                id={`roti-connect-trigger-${item.id}`}
                className="roti-connect__trigger"
                type="button"
                aria-expanded={activeId === item.id}
                aria-controls={`roti-connect-panel-${item.id}`}
                onClick={() => activateItem(index)}
                onFocus={() => activateItem(index)}
                onMouseEnter={() => activateItem(index)}
                onKeyDown={(event) => handleTriggerKeyDown(event, index)}
              >
                <span className="roti-connect__index">{item.index}</span>
                <div className="roti-connect__heading">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>
                <span className="roti-connect__arrow" aria-hidden="true" />
              </button>
              <div
                id={`roti-connect-panel-${item.id}`}
                className="roti-connect__panel"
                role="region"
                aria-labelledby={`roti-connect-trigger-${item.id}`}
                aria-hidden={activeId !== item.id}
              >
                <div className="roti-connect__panel-inner">
                  <a href={item.href} tabIndex={activeId === item.id ? 0 : -1}>
                    {item.ctaLabel}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </SectionGrid>
    </SectionShell>
  );
}
