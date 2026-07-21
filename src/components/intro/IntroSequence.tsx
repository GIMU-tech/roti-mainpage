"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { scrollToTarget } from "@/lib/scroll/smoothScroll";

type IntroPhase = "always" | "alert" | "changes" | "logo";

type IntroScene = {
  phase: IntroPhase;
  text: string;
  duration: number;
};

type IntroSceneStyle = CSSProperties & {
  "--intro-scene-duration": string;
};

const INTRO_WORD_SCENE_MS = 800;
const INTRO_LOGO_SCENE_MS = 1150;
const INTRO_SESSION_STORAGE_KEY = "roti:intro:played";
const SHOULD_REPLAY_INTRO_ON_REFRESH = process.env.NODE_ENV !== "production";

const INTRO_SCENES: IntroScene[] = [
  { phase: "always", text: "ALWAYS", duration: INTRO_WORD_SCENE_MS },
  { phase: "alert", text: "ALERT", duration: INTRO_WORD_SCENE_MS },
  { phase: "changes", text: "FOR CHANGES", duration: INTRO_WORD_SCENE_MS },
  { phase: "logo", text: "ROTI", duration: INTRO_LOGO_SCENE_MS }
];

const REDUCED_MOTION_SCENES: IntroScene[] = [{ phase: "logo", text: "ROTI", duration: 650 }];

const NORMAL_HERO_SPREAD_DELAY_MS = 180;
const NORMAL_HERO_SETTLE_MS = 1840;
const NORMAL_HERO_INTERACTIVE_DELAY_MS = NORMAL_HERO_SPREAD_DELAY_MS + NORMAL_HERO_SETTLE_MS;
const NORMAL_OVERLAY_EXIT_MS = 1240;
const QUICK_HERO_SPREAD_DELAY_MS = 80;
const QUICK_HERO_SETTLE_MS = 180;
const QUICK_HERO_INTERACTIVE_DELAY_MS = QUICK_HERO_SPREAD_DELAY_MS + QUICK_HERO_SETTLE_MS;
const QUICK_OVERLAY_EXIT_MS = 360;

function setDocumentIntroState({
  heroInteractive,
  heroSpread,
  introActive,
  introComplete
}: {
  heroInteractive: boolean;
  heroSpread: boolean;
  introActive: boolean;
  introComplete: boolean;
}) {
  document.body.dataset.rotiHeroInteractive = String(heroInteractive);
  document.body.dataset.rotiIntroActive = String(introActive);
  document.body.dataset.rotiIntroComplete = String(introComplete);
  document.body.dataset.rotiHeroSpread = String(heroSpread);
  document.documentElement.dataset.rotiHeroInteractive = String(heroInteractive);
  document.documentElement.dataset.rotiIntroActive = String(introActive);
  document.documentElement.dataset.rotiIntroComplete = String(introComplete);
  document.documentElement.dataset.rotiHeroSpread = String(heroSpread);
}

function setDocumentHeroSettling(isSettling: boolean) {
  document.body.dataset.rotiHeroSettling = String(isSettling);
  document.documentElement.dataset.rotiHeroSettling = String(isSettling);
}

function resetHeroScrollPosition() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  scrollToTarget(0, { duration: 0, lock: true });
}

function setMainInteractionBlocked(isBlocked: boolean) {
  const main = document.querySelector("main");

  if (!main) {
    return;
  }

  if (isBlocked) {
    main.setAttribute("inert", "");
    main.setAttribute("aria-hidden", "true");
    return;
  }

  main.removeAttribute("inert");
  main.removeAttribute("aria-hidden");
}

export function IntroSequence() {
  const [scenes, setScenes] = useState<IntroScene[]>(INTRO_SCENES);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const introRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const autoAdvanceTimerRef = useRef<number | null>(null);
  const finishedRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const clearAutoAdvanceTimer = useCallback(() => {
    if (autoAdvanceTimerRef.current !== null) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  }, []);

  const completeIntro = useCallback(
    (isSkipped = false) => {
      if (finishedRef.current) {
        return;
      }

      finishedRef.current = true;
      clearTimers();
      clearAutoAdvanceTimer();
      setIsExiting(true);

      if (!SHOULD_REPLAY_INTRO_ON_REFRESH) {
        try {
          window.sessionStorage.setItem(INTRO_SESSION_STORAGE_KEY, "true");
        } catch {
          // Storage can be unavailable in privacy-restricted browsing contexts.
        }
      }

      const shouldMoveQuickly = isSkipped || prefersReducedMotionRef.current;
      const heroSpreadDelay = shouldMoveQuickly ? QUICK_HERO_SPREAD_DELAY_MS : NORMAL_HERO_SPREAD_DELAY_MS;
      const heroSettleDelay = shouldMoveQuickly ? QUICK_HERO_SETTLE_MS : NORMAL_HERO_SETTLE_MS;
      const heroInteractiveDelay = shouldMoveQuickly
        ? QUICK_HERO_INTERACTIVE_DELAY_MS
        : NORMAL_HERO_INTERACTIVE_DELAY_MS;
      const overlayExitDelay = shouldMoveQuickly ? QUICK_OVERLAY_EXIT_MS : NORMAL_OVERLAY_EXIT_MS;

      resetHeroScrollPosition();
      setDocumentHeroSettling(false);
      setDocumentIntroState({
        heroInteractive: false,
        heroSpread: false,
        introActive: false,
        introComplete: true
      });

      timersRef.current.push(
        window.setTimeout(() => {
          resetHeroScrollPosition();
          setDocumentHeroSettling(!shouldMoveQuickly);
          setDocumentIntroState({
            heroInteractive: false,
            heroSpread: true,
            introActive: false,
            introComplete: true
          });
          window.dispatchEvent(new CustomEvent("roti:hero-spread"));
          timersRef.current.push(
            window.setTimeout(() => {
              setDocumentHeroSettling(false);
            }, heroSettleDelay)
          );
        }, heroSpreadDelay)
      );

      timersRef.current.push(
        window.setTimeout(() => {
          resetHeroScrollPosition();
          setDocumentHeroSettling(false);
          setDocumentIntroState({
            heroInteractive: true,
            heroSpread: true,
            introActive: false,
            introComplete: true
          });
          setMainInteractionBlocked(false);
          window.dispatchEvent(new CustomEvent("roti:hero-interactive"));
        }, heroInteractiveDelay)
      );

      timersRef.current.push(
        window.setTimeout(() => {
          setIsVisible(false);
        }, overlayExitDelay)
      );
    },
    [clearAutoAdvanceTimer, clearTimers]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        completeIntro(true);
      }
    },
    [completeIntro]
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const activeScenes = prefersReducedMotion ? REDUCED_MOTION_SCENES : INTRO_SCENES;

    let hasPlayedIntro = false;

    if (!SHOULD_REPLAY_INTRO_ON_REFRESH) {
      try {
        hasPlayedIntro = window.sessionStorage.getItem(INTRO_SESSION_STORAGE_KEY) === "true";
      } catch {
        hasPlayedIntro = false;
      }
    }

    if (hasPlayedIntro) {
      finishedRef.current = true;
      setScenes(activeScenes);
      setSceneIndex(Math.max(activeScenes.length - 1, 0));
      setIsExiting(false);
      setIsVisible(false);
      setMainInteractionBlocked(false);
      setDocumentHeroSettling(false);
      setDocumentIntroState({
        heroInteractive: true,
        heroSpread: true,
        introActive: false,
        introComplete: true
      });
      resetHeroScrollPosition();
      window.dispatchEvent(new CustomEvent("roti:hero-spread"));
      window.dispatchEvent(new CustomEvent("roti:hero-interactive"));

      return () => {
        setMainInteractionBlocked(false);
        delete document.body.dataset.rotiHeroInteractive;
        delete document.body.dataset.rotiIntroActive;
        delete document.body.dataset.rotiIntroComplete;
        delete document.body.dataset.rotiHeroSpread;
        delete document.body.dataset.rotiHeroSettling;
        delete document.documentElement.dataset.rotiHeroInteractive;
        delete document.documentElement.dataset.rotiIntroActive;
        delete document.documentElement.dataset.rotiIntroComplete;
        delete document.documentElement.dataset.rotiHeroSpread;
        delete document.documentElement.dataset.rotiHeroSettling;
      };
    }

    const focusFrame = window.requestAnimationFrame(() => {
      introRef.current?.focus({ preventScroll: true });
    });

    finishedRef.current = false;
    clearTimers();
    clearAutoAdvanceTimer();
    prefersReducedMotionRef.current = prefersReducedMotion;
    setScenes(activeScenes);
    setSceneIndex(0);
    setIsExiting(false);
    setIsVisible(true);
    setMainInteractionBlocked(true);
    setDocumentHeroSettling(false);
    setDocumentIntroState({
      heroInteractive: false,
      heroSpread: false,
      introActive: true,
      introComplete: false
    });
    resetHeroScrollPosition();

    const preventIntroMomentumScroll = (event: Event) => {
      if (document.body.dataset.rotiHeroInteractive === "false") {
        event.preventDefault();
      }
    };
    let scrollResetFrame = 0;
    const keepHeroPinnedUntilInteractive = () => {
      if (document.body.dataset.rotiHeroInteractive !== "false" || window.scrollY === 0 || scrollResetFrame) {
        return;
      }

      scrollResetFrame = window.requestAnimationFrame(() => {
        scrollResetFrame = 0;

        if (document.body.dataset.rotiHeroInteractive === "false") {
          resetHeroScrollPosition();
        }
      });
    };

    window.addEventListener("wheel", preventIntroMomentumScroll, { capture: true, passive: false });
    window.addEventListener("touchmove", preventIntroMomentumScroll, { capture: true, passive: false });
    window.addEventListener("scroll", keepHeroPinnedUntilInteractive, { capture: true, passive: true });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.cancelAnimationFrame(scrollResetFrame);
      window.removeEventListener("wheel", preventIntroMomentumScroll, { capture: true });
      window.removeEventListener("touchmove", preventIntroMomentumScroll, { capture: true });
      window.removeEventListener("scroll", keepHeroPinnedUntilInteractive, { capture: true });
      clearTimers();
      clearAutoAdvanceTimer();
      setMainInteractionBlocked(false);
      delete document.body.dataset.rotiHeroInteractive;
      delete document.body.dataset.rotiIntroActive;
      delete document.body.dataset.rotiIntroComplete;
      delete document.body.dataset.rotiHeroSpread;
      delete document.body.dataset.rotiHeroSettling;
      delete document.documentElement.dataset.rotiHeroInteractive;
      delete document.documentElement.dataset.rotiIntroActive;
      delete document.documentElement.dataset.rotiIntroComplete;
      delete document.documentElement.dataset.rotiHeroSpread;
      delete document.documentElement.dataset.rotiHeroSettling;
    };
  }, [clearAutoAdvanceTimer, clearTimers, completeIntro]);

  useEffect(() => {
    clearAutoAdvanceTimer();

    if (finishedRef.current || isExiting || scenes.length === 0) {
      return;
    }

    const currentScene = scenes[Math.min(sceneIndex, scenes.length - 1)];

    if (!currentScene) {
      return;
    }

    autoAdvanceTimerRef.current = window.setTimeout(() => {
      autoAdvanceTimerRef.current = null;

      if (sceneIndex >= scenes.length - 1) {
        completeIntro(false);
        return;
      }

      setSceneIndex((currentIndex) => Math.min(currentIndex + 1, scenes.length - 1));
    }, currentScene.duration);

    return clearAutoAdvanceTimer;
  }, [clearAutoAdvanceTimer, completeIntro, isExiting, sceneIndex, scenes]);

  if (!isVisible) {
    return null;
  }

  const currentScene = scenes[Math.min(sceneIndex, scenes.length - 1)] ?? INTRO_SCENES[0];
  const wordStyle = {
    "--intro-scene-duration": `${currentScene.duration}ms`
  } as IntroSceneStyle;

  return (
    <div
      ref={introRef}
      className="intro-sequence"
      data-exiting={isExiting}
      role="dialog"
      aria-label="ROTI — Always alert for changes"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <div className="intro-sequence__backdrop" aria-hidden="true">
        <Image
          className="intro-sequence__backdrop-image"
          src="/images/intro/roti-intro-architecture.webp"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <span className="intro-sequence__backdrop-shade" />
      </div>
      <div className="intro-sequence__content" aria-live="polite">
        {currentScene.phase === "logo" ? (
          <div
            key={`${currentScene.phase}-${sceneIndex}`}
            className="intro-sequence__brand"
            style={wordStyle}
          >
            <span className="intro-sequence__logo-letters" role="img" aria-label="ROTI">
              <span className="intro-sequence__logo-letter" data-letter="r" aria-hidden="true" />
              <span className="intro-sequence__logo-letter" data-letter="o" aria-hidden="true" />
              <span className="intro-sequence__logo-letter" data-letter="t" aria-hidden="true" />
              <span className="intro-sequence__logo-letter" data-letter="i" aria-hidden="true" />
            </span>
          </div>
        ) : (
          <p key={`${currentScene.phase}-${sceneIndex}`} className="intro-sequence__word" style={wordStyle}>
            {currentScene.text}
          </p>
        )}
      </div>
      <button className="intro-sequence__skip" type="button" onClick={() => completeIntro(true)}>
        SKIP
      </button>
    </div>
  );
}
