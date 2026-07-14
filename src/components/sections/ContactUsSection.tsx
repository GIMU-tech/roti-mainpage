"use client";

import { CaretDown } from "@phosphor-icons/react";
import type { FormEvent } from "react";
import { useState } from "react";
import { brands } from "@/data/brands";
import { footerLocations } from "@/data/footer";
import { HOME_SECTION_IDS } from "@/data/sections";

const inquiryTypes = ["고객·제품 문의", "기업·단체 구매", "유통·입점·협업"] as const;

export function ContactUsSection() {
  const [formStatus, setFormStatus] = useState("");
  const seoulOffice = footerLocations[0];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      setFormStatus("필수 항목과 개인정보 동의를 확인해 주세요.");
      return;
    }

    setFormStatus("현재 문의 전송 기능은 준비 중입니다.");
  };

  return (
    <section className="roti-contact" id={HOME_SECTION_IDS.contact} aria-labelledby="roti-contact-title">
      <div className="roti-contact__layout">
        <div className="roti-contact__intro">
          <h2 className="roti-contact__title" id="roti-contact-title">
            CONTACT US
          </h2>

          <p className="roti-contact__lead">
            제품 문의부터 기업 구매, 유통 및 협업까지
            <br />
            목적에 맞는 내용을 남겨주세요.
          </p>

          <dl className="roti-contact__details">
            <div>
              <dt>CONTACT</dt>
              <dd>제품 · 기업 구매 · 유통 · 협업 문의</dd>
            </div>
            <div>
              <dt>SEOUL OFFICE</dt>
              <dd>{seoulOffice?.address}</dd>
            </div>
          </dl>
        </div>

        <form className="roti-contact__panel" noValidate onSubmit={handleSubmit}>
          <div className="roti-contact__panel-heading">
            <h3>문의 정보를 입력해 주세요.</h3>
            <p>표시된 항목을 기준으로 문의 목적을 구분합니다.</p>
          </div>

          <div className="roti-contact__form-grid">
            <label className="roti-contact__field">
              <span>문의 유형</span>
              <select name="inquiryType" defaultValue="" required>
                <option value="" disabled>
                  선택해 주세요
                </option>
                {inquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <CaretDown className="roti-contact__select-icon" aria-hidden="true" weight="bold" />
            </label>

            <label className="roti-contact__field">
              <span>관심 브랜드</span>
              <select name="brand" defaultValue="" required>
                <option value="" disabled>
                  선택해 주세요
                </option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
                <option value="roti">ROTI</option>
              </select>
              <CaretDown className="roti-contact__select-icon" aria-hidden="true" weight="bold" />
            </label>

            <label className="roti-contact__field">
              <span>이름</span>
              <input name="name" type="text" autoComplete="name" placeholder="이름을 입력해 주세요" required />
            </label>

            <label className="roti-contact__field">
              <span>소속 / 부서</span>
              <input name="department" type="text" autoComplete="organization" placeholder="소속 또는 부서명" />
            </label>

            <label className="roti-contact__field">
              <span>연락처</span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="연락 가능한 번호" required />
            </label>

            <label className="roti-contact__field">
              <span>이메일</span>
              <input name="email" type="email" autoComplete="email" placeholder="name@company.com" required />
            </label>
          </div>

          <div className="roti-contact__consent-action">
            <div className="roti-contact__consent-copy">
              <label className="roti-contact__consent">
                <input name="privacy" type="checkbox" required />
                <span>문의 확인을 위한 개인정보 수집 및 이용에 동의합니다.</span>
              </label>
              <p className="roti-contact__status" aria-live="polite">
                {formStatus}
              </p>
            </div>
            <button className="roti-contact__submit" type="submit">
              문의 내용 확인
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
