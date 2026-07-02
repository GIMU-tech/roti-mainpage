"use client";

import { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";

const SPLINE_SCENE_URL = "https://prod.spline.design/mPGSrispUY3muypb/scene.splinecode";

export function SplineGlassCardTest() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("모델 로드 중");

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    let disposed = false;
    const splineApp = new Application(canvas, { renderOnDemand: false });

    splineApp
      .load(SPLINE_SCENE_URL)
      .then(() => {
        if (!disposed) {
          setStatus("모델 로드 완료");
        }
      })
      .catch(() => {
        if (!disposed) {
          setStatus("모델 로드 실패");
        }
      });

    return () => {
      disposed = true;
      splineApp.dispose();
    };
  }, []);

  return (
    <section className="spline-card-test" aria-label="ROTI Spline 유리 카드 미리보기">
      <div className="spline-card-test__chrome" aria-label="테스트 페이지 상단">
        <a className="spline-card-test__logo" href="/" aria-label="ROTI 메인으로 이동">
          ROTI
        </a>
        <span>유리 카드 테스트</span>
      </div>

      <div className="spline-card-test__scene" aria-hidden="true">
        <canvas ref={canvasRef} className="spline-card-test__canvas" />
      </div>

      <div className="spline-card-test__copy">
        <p>ROTI 브랜드 포털</p>
        <h1>검은 유리 안쪽의 브랜드 장면</h1>
        <span>정리되는 집을 위한 ROTI HOMESYS</span>
      </div>

      <div className="spline-card-test__portal" aria-hidden="true">
        <span>BRAND PORTAL</span>
        <strong>01 / TEST</strong>
      </div>

      <div className="spline-card-test__card" aria-label="ROTI HOMESYS 카드 디자인 투영 테스트">
        <div className="spline-card-test__card-depth" aria-hidden="true" />
        <div className="spline-card-test__design">
          <span className="spline-card-test__design-label">ROTI BRAND PORTAL</span>
          <strong>
            ROTI
            <br />
            HOMESYS
          </strong>
          <i />
          <p>정리되는 집</p>
          <small>수납 · 이동 · 생활동선</small>
        </div>
        <div className="spline-card-test__glass" aria-hidden="true" />
        <div className="spline-card-test__card-back" aria-hidden="true" />
      </div>

      <p className="spline-card-test__status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
