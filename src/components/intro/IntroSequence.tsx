"use client";

import type { CSSProperties } from "react";
import type { KeyboardEvent, TouchEvent, WheelEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type IntroScene = {
  text: string;
  duration: number;
};

type IntroWordStyle = CSSProperties & {
  "--intro-scene-duration": string;
};

const INTRO_SCENES: IntroScene[] = [
  { text: "ALWAYS", duration: 720 },
  { text: "ALERT", duration: 720 },
  { text: "FOR CHANGES", duration: 720 },
  { text: "ALWAYS ALERT FOR CHANGES", duration: 780 },
  { text: "ROTI", duration: 720 }
];

const REDUCED_MOTION_SCENES: IntroScene[] = [
  { text: "ALWAYS ALERT FOR CHANGES", duration: 1 },
  { text: "ROTI", duration: 1 }
];

const NORMAL_HERO_SPREAD_DELAY_MS = 260;
const NORMAL_HERO_INTERACTIVE_DELAY_MS = NORMAL_HERO_SPREAD_DELAY_MS + 1280;
const NORMAL_OVERLAY_EXIT_MS = 980;
const QUICK_HERO_SPREAD_DELAY_MS = 80;
const QUICK_HERO_INTERACTIVE_DELAY_MS = QUICK_HERO_SPREAD_DELAY_MS + 140;
const QUICK_OVERLAY_EXIT_MS = 360;
const SCROLL_STEP_LOCK_MS = 620;
const WHEEL_STEP_THRESHOLD = 24;
const TOUCH_STEP_THRESHOLD = 36;

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
  const finishedRef = useRef(false);
  const lastStepAtRef = useRef(-SCROLL_STEP_LOCK_MS);
  const prefersReducedMotionRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const completeIntro = useCallback(
    (isSkipped = false) => {
      if (finishedRef.current) {
        return;
      }

      finishedRef.current = true;
      clearTimers();
      setIsExiting(true);

      const shouldMoveQuickly = isSkipped || prefersReducedMotionRef.current;
      const heroSpreadDelay = shouldMoveQuickly ? QUICK_HERO_SPREAD_DELAY_MS : NORMAL_HERO_SPREAD_DELAY_MS;
      const heroInteractiveDelay = shouldMoveQuickly
        ? QUICK_HERO_INTERACTIVE_DELAY_MS
        : NORMAL_HERO_INTERACTIVE_DELAY_MS;
      const overlayExitDelay = shouldMoveQuickly ? QUICK_OVERLAY_EXIT_MS : NORMAL_OVERLAY_EXIT_MS;

      setDocumentIntroState({
        heroInteractive: false,
        heroSpread: false,
        introActive: false,
        introComplete: true
      });

      timersRef.current.push(
        window.setTimeout(() => {
          setDocumentIntroState({
            heroInteractive: false,
            heroSpread: true,
            introActive: false,
            introComplete: true
          });
          window.dispatchEvent(new CustomEvent("roti:hero-spread"));
        }, heroSpreadDelay)
      );

      timersRef.current.push(
        window.setTimeout(() => {
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
    [clearTimers]
  );

  const canStepScene = useCallback(() => {
    const now = window.performance.now();

    if (now - lastStepAtRef.current < SCROLL_STEP_LOCK_MS) {
      return false;
    }

    lastStepAtRef.current = now;
    return true;
  }, []);

  const stepScene = useCallback(
    (direction: 1 | -1) => {
      if (finishedRef.current || isExiting) {
        return;
      }

      if (direction > 0) {
        if (sceneIndex >= scenes.length - 1) {
          completeIntro(false);
          return;
        }

        setSceneIndex(sceneIndex + 1);
        return;
      }

      setSceneIndex(Math.max(0, sceneIndex - 1));
    },
    [completeIntro, isExiting, sceneIndex, scenes.length]
  );

  const requestSceneStep = useCallback(
    (direction: 1 | -1) => {
      if (!canStepScene()) {
        return;
      }

      stepScene(direction);
    },
    [canStepScene, stepScene]
  );

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (Math.abs(event.deltaY) < WHEEL_STEP_THRESHOLD) {
        return;
      }

      requestSceneStep(event.deltaY > 0 ? 1 : -1);
    },
    [requestSceneStep]
  );

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const startY = touchStartYRef.current;
      const endY = event.changedTouches[0]?.clientY;

      touchStartYRef.current = null;

      if (startY === null || endY === undefined) {
        return;
      }

      const deltaY = startY - endY;

      if (Math.abs(deltaY) < TOUCH_STEP_THRESHOLD) {
        return;
      }

      requestSceneStep(deltaY > 0 ? 1 : -1);
    },
    [requestSceneStep]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        completeIntro(true);
        return;
      }

      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " " || event.key === "Enter") {
        event.preventDefault();
        requestSceneStep(1);
        return;
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        requestSceneStep(-1);
      }
    },
    [completeIntro, requestSceneStep]
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const activeScenes = prefersReducedMotion ? REDUCED_MOTION_SCENES : INTRO_SCENES;
    const focusFrame = window.requestAnimationFrame(() => {
      introRef.current?.focus({ preventScroll: true });
    });

    prefersReducedMotionRef.current = prefersReducedMotion;
    setScenes(activeScenes);
    setSceneIndex(0);
    setIsExiting(false);
    setIsVisible(true);
    setMainInteractionBlocked(true);
    setDocumentIntroState({
      heroInteractive: false,
      heroSpread: false,
      introActive: true,
      introComplete: false
    });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      clearTimers();
      setMainInteractionBlocked(false);
      delete document.body.dataset.rotiHeroInteractive;
      delete document.body.dataset.rotiIntroActive;
      delete document.body.dataset.rotiIntroComplete;
      delete document.body.dataset.rotiHeroSpread;
    };
  }, [clearTimers, completeIntro]);

  if (!isVisible) {
    return null;
  }

  const currentScene = scenes[Math.min(sceneIndex, scenes.length - 1)] ?? INTRO_SCENES[0];
  const wordStyle = {
    "--intro-scene-duration": `${currentScene.duration}ms`
  } as IntroWordStyle;

  return (
    <div
      ref={introRef}
      className="intro-sequence"
      data-exiting={isExiting}
      role="dialog"
      aria-label="ROTI intro"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onWheel={handleWheel}
    >
      <div className="intro-sequence__content" aria-live="polite">
        <p
          key={`${currentScene.text}-${sceneIndex}`}
          className="intro-sequence__word"
          data-brand={currentScene.text === "ROTI"}
          style={wordStyle}
        >
          {currentScene.text}
        </p>
      </div>
      <button className="intro-sequence__skip" type="button" onClick={() => completeIntro(true)}>
        SKIP
      </button>
    </div>
  );
}
