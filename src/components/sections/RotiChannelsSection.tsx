"use client";

import { useEffect, useRef, useState } from "react";
import { HOME_SECTION_IDS } from "@/data/sections";

const channelRows = [
  ["네이버", "쿠팡", "G마켓", "옥션", "11번가", "인터파크"],
  ["신세계", "이마트몰", "롯데ON", "홈앤쇼핑", "CJmall", "GS SHOP", "현대홈쇼핑", "아마존", "큐텐"]
] as const;

const TRACK_REPEAT_COUNT = 4;

export function RotiChannelsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={HOME_SECTION_IDS.channels}
      className="roti-channels"
      data-paused={isVisible ? "false" : "true"}
      aria-labelledby="roti-channels-title"
    >
      <div className="roti-channels__inner">
        <header className="roti-channels__heading">
          <h2 id="roti-channels-title">어디서나 만나는 로티</h2>
          <p>일상의 가까운 채널에서 로티의 제품을 만나보세요.</p>
        </header>

        <div className="roti-channels__marquees" aria-label="로티 판매 채널">
          {channelRows.map((channels, rowIndex) => (
            <div
              key={channels[0]}
              className={`roti-channels__marquee${rowIndex === 1 ? " roti-channels__marquee--reverse" : ""}`}
              tabIndex={0}
              aria-label={`${rowIndex === 0 ? "오픈마켓" : "종합몰과 글로벌"} 채널. 마우스를 올리거나 포커스하면 움직임이 멈춥니다.`}
            >
              <div className="roti-channels__track">
                {Array.from({ length: TRACK_REPEAT_COUNT }, (_, repeatIndex) => (
                  <div
                    key={`${channels[0]}-${repeatIndex}`}
                    className="roti-channels__group"
                    aria-hidden={repeatIndex === 0 ? undefined : true}
                  >
                    {channels.map((channel) => (
                      <span key={`${channel}-${repeatIndex}`} className="roti-channels__channel">
                        {channel}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="roti-channels__sr-only">
            오픈마켓: 네이버, 쿠팡, G마켓, 옥션, 11번가, 인터파크. 종합몰: 신세계, 이마트몰, 롯데ON,
            홈앤쇼핑, CJmall, GS SHOP, 현대홈쇼핑. 글로벌: 아마존, 큐텐.
          </p>
        </div>

        <p className="roti-channels__closing">로티 제품은 이미 당신 가까이에 있습니다.</p>
      </div>
    </section>
  );
}
