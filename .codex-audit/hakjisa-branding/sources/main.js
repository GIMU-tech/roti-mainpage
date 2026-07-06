document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       [Section 1] Hero (메인 비주얼)
       ========================================================================== */
    
    // 1. 초기 상태
    gsap.set(['.hero-subtitle', '.hero-title', '.hero-description-1'], { 
        autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' 
    });
    gsap.set('.hero-description-2', { 
        autoAlpha: 0, clipPath: 'inset(0 100% 0 0)', visibility: 'hidden' 
    });
    gsap.set('.hero-image-2', { opacity: 0 });

    // 오프닝 완료 플래그
    let introComplete = false;

    // 2. 오프닝 (power2.out)
    const introTl = gsap.timeline({ delay: 1 });
    introTl.to('.hero-subtitle', { autoAlpha: 1, duration: 0.3, clipPath: 'inset(0 0% 0 0)', ease: 'power2.out' })
           .to('.hero-title', { autoAlpha: 1, duration: 0.6, clipPath: 'inset(0 0% 0 0)', ease: 'power2.out' }, '-=0.6')
           .to('.hero-description-1', { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', ease: 'power2.out' }, '-=0.2')
           .add(() => {
               introComplete = true;
           });

    // 3. 스크롤 연동
    const heroScrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: '+=200%', // 딜레이 고려하여 길이 확보
            pin: true,
            scrub: 1,
            toggleActions: "play pause resume reset",
            onUpdate: (self) => {
                // introTl이 완료되지 않았으면 스크롤 막기
                if (!introComplete) {
                    self.scroll(self.start);
                }
            }
        }
    });

    heroScrollTl
        .fromTo('.hero-description-1', 
            { autoAlpha: 1 }, 
            { autoAlpha: 0, duration: 1, immediateRender: false}
        )
        .to('.hero-image-2', { opacity: 1, duration: 1.5 }, "+=0.3")
        .fromTo('.hero-description-2', 
            { autoAlpha: 0, visibility: 'hidden', clipPath: 'inset(0 100% 0 0)' },
            { 
                autoAlpha: 1, 
                visibility: 'visible',
                clipPath: 'inset(0 0% 0 0)', 
                duration: 1.5
            }, 
            "-=0.8"
        )
        .to({}, { duration: 1 }, ">");


    /* ==========================================================================
       [Section 2] Values (가치 소개)
       ========================================================================== */
    
      // 초기 설정에 성능 최적화 추가
gsap.set(['.values-left', '.values-right'], { autoAlpha: 1, x: 0 });
const allTextElements = gsap.utils.toArray('.values-label, .values-title, .values-subtitle, .values-pagination, .values-description');
gsap.set(allTextElements, { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' });

const slides = gsap.utils.toArray(".values-set");
if (slides.length > 1) {
    gsap.set(slides.slice(1), { autoAlpha: 0 });
}

// 성능 최적화를 위한 will-change 설정
gsap.set('.image--masked, .image--top, .bird-image-wrapper', { 
    force3D: true,
    willChange: 'transform'
});

const mainTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.values-section',
        start: 'top top',
        end: `+=${slides.length * 300}%`, 
        pin: true,
        scrub: 0.5, // 1 → 0.5로 줄여서 더 부드럽게
        anticipatePin: 1
    }
});

slides.forEach((slide, index) => {
    const treeMasked = slide.querySelector('.valueTreeMasked');
    const treeTop = slide.querySelector('.valueTreeTop');
    const flowerMasked1 = slide.querySelector('.flowerMasked1');
    const flowerTop1 = slide.querySelector('.flowerTop1');
    const flowerMasked2 = slide.querySelector('.flowerMasked2');
    const flowerTop2 = slide.querySelector('.flowerTop2');
    const bookTop = slide.querySelector('.bookTop');
    const butterflyMasked = slide.querySelector('.butterflyMasked');
    const butterflyTop = slide.querySelector('.butterflyTop');
    const birdWrapper = slide.querySelector('.bird-image-wrapper');
    const birdPathSvg = slide.querySelector('path');
    const label = slide.querySelector('.values-label');
    const titles = slide.querySelectorAll('.values-title, .values-subtitle');
    const descriptions = slide.querySelectorAll('.values-pagination, .values-description');
    const isValues2 = slide.id === 'values-2';
    const isValues3 = slide.id === 'values-3';

    gsap.set(slide, { zIndex: 10 + index });
    let targetOffset = 0; 

    if (birdWrapper && birdPathSvg) {
        const len = birdPathSvg.getTotalLength();
        const drawRatio = (slide.id === 'values-2') ? 0.95 : 0.85;
        targetOffset = len * (1 - drawRatio);

        gsap.set(birdPathSvg, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
        gsap.set(birdWrapper, { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%", scale: 0.5, autoAlpha: 0 });
    }

    if (index > 0) {
        mainTl.to(slide, { autoAlpha: 1, duration: 3, ease: "none" }); // 5 → 3
    }

    if (isValues2) {
        console.log('values2');
        // duration 줄이고, ease 단순화
        mainTl.fromTo(flowerMasked1, 
            {scale: 0.6, y: 300}, 
            {scale: 1, y: 0, duration: 4, ease: 'power1.out' }) // duration 6→4, ease 단순화
        .fromTo(flowerTop1, 
            {scale: 0.6, y: 300}, 
            {scale: 1, y: 0, duration: 4, ease: 'power1.out' }, "<")
        .fromTo(flowerMasked2, 
            {scale: 0.6, y: 300, x: -100}, 
            {scale: 1, y: 0, x: 0, duration: 4, ease: 'power1.out' }, "< 1.5") // stagger 증가
        .fromTo(flowerTop2, 
            {scale: 0.6, y: 300, x: -100}, 
            {scale: 1, y: 0, x: 0, duration: 4, ease: 'power1.out' }, "<");
    } else if (isValues3) {
        mainTl.fromTo(bookTop, 
            {scale: 0.8, y: 80, x: -40}, 
            {scale: 1, y: 0, x: 0, duration: 4, ease: 'power1.out' })
        .fromTo(butterflyMasked, 
            {autoAlpha: 0, scale: 0.4, y: 200, x: -100}, 
            {autoAlpha: 1, scale: 1, y: 0, x: 0, duration: 4, ease: 'power1.out' })
        .fromTo(butterflyTop, 
            {autoAlpha: 0, scale: 0.4, y: 200, x: -100}, 
            {autoAlpha: 1, scale: 1, y: 0, x: 0, duration: 4, ease: 'power1.out' }, "<");
    } else {
        mainTl.fromTo(treeMasked, 
            {scale: 0.6, y: 300}, 
            {scale: 1, y: 0, duration: 4, ease: 'power1.out' })
        .fromTo(treeTop, 
            {scale: 0.6, y: 300}, 
            {scale: 1, y: 0, duration: 4, ease: 'power1.out' }, "<");
    }

    if (birdWrapper && birdPathSvg) {
        mainTl.to(birdWrapper, { autoAlpha: 1, duration: 0.5 }, "-=1.5");
        mainTl.to(birdWrapper, {
            motionPath: {
                path: birdPathSvg, 
                align: birdPathSvg, 
                alignOrigin: [0.5, 0.8],
                autoRotate: false // 회전 계산 제거로 성능 향상
            },
            scale: 1, 
            duration: 6, // 8 → 6
            ease: "none" 
        })
        .to(birdPathSvg, { 
            strokeDashoffset: targetOffset, 
            duration: 6, // 8 → 6
            ease: "none" 
        }, "<+=0.3");
    }

    const textDelay = (birdWrapper && birdPathSvg) ? "-=2" : ">";

    // 텍스트 애니메이션도 duration 줄임
    mainTl.to(label, { 
        clipPath: 'inset(0 0% 0 0)', 
        duration: 4, // 6 → 4
        ease: "power1.out" // power2 → power1
    }, textDelay)
    .to(titles, { 
        clipPath: 'inset(0 0% 0 0)', 
        duration: 4, 
        ease: 'power1.out', 
        stagger: 0.8 // 1 → 0.8
    }, "> 0.3") // 0.5 → 0.3
    .to(descriptions, { 
        clipPath: 'inset(0 0% 0 0)', 
        duration: 4, 
        ease: 'power1.out', 
        stagger: 0.8 
    }, "> 0.3");
    
    mainTl.to({}, { duration: 1.5 }); // 2 → 1.5
});

// blob 애니메이션 최적화
function floatBlob(target) {
    gsap.to(target, {
        x: "random(-80, 80)", // 범위 축소 (-100, 100) → (-80, 80)
        y: "random(-80, 80)", 
        scale: "random(0.95, 1.4)", // 범위 축소 (0.9, 1.6) → (0.95, 1.4)
        duration: "random(4, 6)", // 시간 증가 (3, 5) → (4, 6)
        ease: "sine.inOut", 
        onComplete: () => floatBlob(target),
        overwrite: 'auto' // 중복 애니메이션 방지
    });
}

// Intersection Observer로 화면에 보일 때만 blob 애니메이션 실행
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            floatBlob(".blob-1");
            floatBlob(".blob-2");
        } else {
            gsap.killTweensOf([".blob-1", ".blob-2"]); // 화면 밖에서는 중지
        }
    });
}, { threshold: 0.1 });

const valuesSection = document.querySelector('.values-section');
if (valuesSection) {
    observer.observe(valuesSection);
}
    /* ==========================================================================
       [Section 3] Overview (개요)
       ========================================================================== */
    
    // 1. 초기 설정 (스타일 통일)
    gsap.set([".overview-label", ".overview-title", ".overview-description"], { 
        autoAlpha: 1, 
        clipPath: 'inset(0 100% 0 0)' 
    });

    // 2. 스크롤 타임라인
    const overviewCards = document.querySelectorAll(".overview-card");
    const overviewCardsContainer = document.querySelector(".overview-cards");
    const windowWidth = window.innerWidth;
    const isSmallMobile = windowWidth <= 768;
    const isTablet = windowWidth > 768 && windowWidth <= 1024;
    
    // 카드와 로고 초기 설정 (모두 숨김)
    gsap.set(".overview-card", { autoAlpha: 0, y: 50 });
    gsap.set(".card-logo-item", { autoAlpha: 0, y: 20 });

    if (isSmallMobile) {
        // 768px 이하: 카드 1개씩 1 → 2 → 3 → 4 순차 전환
        gsap.set(".overview-card", { autoAlpha: 0, y: 0, scale: 1.02 });

        const overviewTlSmall = gsap.timeline({
            scrollTrigger: {
                trigger: ".overview-section",
                start: "top top",
                end: "+=500%",
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });

        // 텍스트 등장
        overviewTlSmall
            .to(".overview-label", { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.out" })
            .to(".overview-title", { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.out" }, "-=1.0")
            .to(".overview-description", { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.out" }, "-=0.5");

        // 1번 카드 등장
        const card1 = document.querySelector(".overview-card:nth-child(1)");
        const logos1 = card1?.querySelectorAll(".card-logo-item");
        overviewTlSmall
            .to(".overview-card:nth-child(1)", { autoAlpha: 1, scale: 1, duration: 1.5, ease: "power2.out" })
            .to(logos1, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1 }, "-=0.5");

        // 잠시 머무름
        overviewTlSmall.to({}, { duration: 1.5 });

        // 1 → 2 전환
        const card2 = document.querySelector(".overview-card:nth-child(2)");
        const logos2 = card2?.querySelectorAll(".card-logo-item");
        overviewTlSmall
            .to(".overview-card:nth-child(1)", { autoAlpha: 0, scale: 0.98, duration: 1.5, ease: "power2.inOut" })
            .add(() => overviewCardsContainer?.classList.add("show-card-2"))
            .to(".overview-card:nth-child(2)", { autoAlpha: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }, "-=1.3")
            .to(logos2, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1 }, "-=0.5");

        // 잠시 머무름
        overviewTlSmall.to({}, { duration: 1.5 });

        // 2 → 3 전환
        const card3 = document.querySelector(".overview-card:nth-child(3)");
        const logos3 = card3?.querySelectorAll(".card-logo-item");
        overviewTlSmall
            .to(".overview-card:nth-child(2)", { autoAlpha: 0, scale: 0.98, duration: 1.5, ease: "power2.inOut" })
            .add(() => { 
                overviewCardsContainer?.classList.remove("show-card-2");
                overviewCardsContainer?.classList.add("show-card-3");
            })
            .to(".overview-card:nth-child(3)", { autoAlpha: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }, "-=1.3")
            .to(logos3, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1 }, "-=0.5");

        // 잠시 머무름
        overviewTlSmall.to({}, { duration: 1.5 });

        // 3 → 4 전환
        const card4 = document.querySelector(".overview-card:nth-child(4)");
        const logos4 = card4?.querySelectorAll(".card-logo-item");
        overviewTlSmall
            .to(".overview-card:nth-child(3)", { autoAlpha: 0, scale: 0.98, duration: 1.5, ease: "power2.inOut" })
            .add(() => { 
                overviewCardsContainer?.classList.remove("show-card-3");
                overviewCardsContainer?.classList.add("show-card-4");
            })
            .to(".overview-card:nth-child(4)", { autoAlpha: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }, "-=1.3")
            .to(logos4, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1 }, "-=0.5");

        // 마지막 딜레이
        overviewTlSmall.to({}, { duration: 2 });

    } else if (isTablet) {
        // 769px ~ 1024px: 카드 2개씩 1,2 → 3,4 전환
        gsap.set(".overview-card:nth-child(3), .overview-card:nth-child(4)", { 
            autoAlpha: 0, 
            y: 0, 
            scale: 1.02 
        });

        const overviewTlMobile = gsap.timeline({
            scrollTrigger: {
                trigger: ".overview-section",
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });

        // 텍스트 등장
        overviewTlMobile
            .to(".overview-label", { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.out" })
            .to(".overview-title", { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.out" }, "-=1.0")
            .to(".overview-description", { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.out" }, "-=0.5");

        // 1,2번 카드 등장
        const firstCards = [".overview-card:nth-child(1)", ".overview-card:nth-child(2)"];
        firstCards.forEach((selector, index) => {
            const card = document.querySelector(selector);
            const logos = card?.querySelectorAll(".card-logo-item");
            const cardDelay = index === 0 ? "-=0.5" : "-=1.0";

            overviewTlMobile
                .to(selector, { autoAlpha: 1, y: 0, duration: 2, ease: "power2.out" }, cardDelay)
                .to(logos, { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out", stagger: 0.1 }, "<+=0.5");
        });

        // 잠시 머무름
        overviewTlMobile.to({}, { duration: 2 });

        // 1,2번 → 3,4번 교체 (Crossfade)
        overviewTlMobile
            .to(".overview-card:nth-child(1), .overview-card:nth-child(2)", { 
                autoAlpha: 0, 
                scale: 0.98,
                duration: 1.5, 
                ease: "power2.inOut" 
            })
            .to(".overview-card:nth-child(3), .overview-card:nth-child(4)", { 
                autoAlpha: 1, 
                scale: 1,
                duration: 1.5, 
                ease: "power2.inOut" 
            }, "-=1.3")
            .to(".overview-card:nth-child(3) .card-logo-item, .overview-card:nth-child(4) .card-logo-item", { 
                autoAlpha: 1, 
                y: 0, 
                duration: 1, 
                ease: "power2.out", 
                stagger: 0.1 
            }, "-=0.8")
            .add(() => overviewCardsContainer?.classList.add("show-second"), "-=1.5");

        // 마지막 딜레이
        overviewTlMobile.to({}, { duration: 2 });

    } else {
        // 데스크톱: 기존 4개 카드 순차 등장
        const overviewTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".overview-section",
                start: "top top",      
                end: `+=${50 + (overviewCards.length * 80)}%`,        
                pin: true,             
                scrub: 1,              
                anticipatePin: 1
            }
        });

        // 텍스트 등장 (전부 Wipe 효과로 통일)
        overviewTl
            .to(".overview-label", { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.out" })
            .to(".overview-title", { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.out" }, "-=1.0") 
            .to(".overview-description", { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.out" }, "-=0.5");

        // 카드 순차 등장
        overviewCards.forEach((card, index) => {
            const logos = card.querySelectorAll(".card-logo-item");
            const cardDelay = index === 0 ? "-=0.5" : "-=1.0";

            overviewTl
                .to(card, { autoAlpha: 1, y: 0, duration: 2, ease: "power2.out" }, cardDelay)
                .to(logos, { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out", stagger: 0.1 }, "<+=0.5");
        });
        
        // 마지막 딜레이
        overviewTl.to({}, { duration: 2 });
    }

    // 3. 로고 호버 효과
    document.querySelectorAll(".card-logo-item").forEach((item) => {
        const img = item.querySelector("img");
        item.addEventListener("mouseenter", () => {
            gsap.to(img, { scale: 1.1, duration: 0.4, ease: "back.out(1.7)", overwrite: "auto" });
        });
        item.addEventListener("mouseleave", () => {
            gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        });
    });


    /* ==========================================================================
       [Section 4] Services (서비스)
       ========================================================================== */

    const tabList = document.querySelector('.tab-list');
    const tabItems = gsap.utils.toArray('.tab-item');
    const serviceImages = gsap.utils.toArray('.service-image');
    const imageContainer = document.querySelector('.service-images');
    const serviceContents = gsap.utils.toArray('.service-content');

    // 모바일 감지
    const isMobileServices = window.innerWidth <= 768;

    const getGap = () => isMobileServices ? 16 : 20;
    const getItemHeight = () => {
      const itemHeight = tabItems[0]?.offsetHeight || 24; // 아이콘 높이
      const gap = isMobileServices ? 12 : 0; // 모바일만 gap 있음
      return itemHeight + gap;
    };
    const getImageWidth = () => {
        if (isMobileServices) {
            // 모바일: 고정 크기 530px
            return 530;
        }
        const containerWidth = imageContainer.offsetWidth;
        const preferredWidth = containerWidth * 0.5; // 50%
        return Math.max(800, Math.min(968, preferredWidth)); // clamp(800px, 50%, 968px)
    };
    
    // 모바일: 이미지 시작 위치 오프셋
    const getMobileOffset = () => {
        return 0;
    };

    const initialOpacity = [1, 0.5, 0.3];
    
    gsap.set(tabList, { y: 0 }); // 초기 위치 명시적 설정
    gsap.set(tabItems, { opacity: 0.1, fontWeight: 400 });
    tabItems.slice(0, 3).forEach((item, i) => {
        if (item) gsap.set(item, { opacity: initialOpacity[i], fontWeight: i === 0 ? 700 : 400 });
    });

    // 이미지 초기 배치
    serviceImages.forEach((img, i) => {
        if (isMobileServices) {
            // 모바일: 이미지가 가로로 나열 (슬라이드 형태, 양옆에 다른 이미지 보임)
            gsap.set(img, { 
                x: getMobileOffset() + i * (getImageWidth() + getGap()), 
                width: getImageWidth(),
                filter: 'brightness(1)', 
                position: 'absolute', 
                left: 0 
            });
        } else {
            // PC: 기존 방식 (겹치는 형태)
            gsap.set(img, { 
                x: i * (getImageWidth() + getGap()), 
                width: getImageWidth(),
                filter: 'brightness(1)', 
                position: 'absolute', 
                left: 0 
            });
        }
    });

    serviceContents.forEach((content, i) => {
        const title = content.querySelector('.service-title');
        const desc = content.querySelector('.service-description');
        gsap.set([title, desc], { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0 , ease: "power2.out" });

        if (i === 0) gsap.set(content, { autoAlpha: 1 });
        else gsap.set(content, { autoAlpha: 0 });
    });

    // 첫 번째 콘텐츠 등장 (power2.out)
    const firstContent = serviceContents[0];
    const firstTitle = firstContent.querySelector('.service-title');
    const firstDesc = firstContent.querySelector('.service-description');

    gsap.timeline({
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 80%",
            once: true
        }
    })
    .to(firstTitle, { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 1, ease: "power2.inOut" })
    .to(firstDesc, { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 1, ease: "power2.inOut" }, "-=0.5");

    // 실제 콘텐츠 개수 (탭 아이템은 순환 표시용으로 더 많음)
    const actualTabCount = serviceContents.length;

    // 메인 스크롤
    const serviceTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".services-section",
            start: "top top",
            // 첫 콘텐츠 홀드 구간 + 각 콘텐츠별 텀 추가
            end: `+=${40 + actualTabCount * 80}%`, 
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
            // snap 제거: 사용자가 스크롤한 위치에 그대로 유지
        }
    });

    // 첫 콘텐츠를 볼 수 있는 홀드 구간 추가
    serviceTl.addLabel("intro");
    serviceTl.to({}, { duration: 1 }); // 빈 애니메이션으로 스크롤 여유 공간 확보

    const opacityMap = [
        { offset: 0, opacity: 0.1, fontWeight: 400 },
        { offset: 1, opacity: 1, fontWeight: 700 },
        { offset: 2, opacity: 0.5, fontWeight: 400 },
        { offset: 3, opacity: 0.3, fontWeight: 400 }
    ];

    // 실제 콘텐츠 개수만큼만 탭 전환 (4개 콘텐츠 → 3번 전환)
    for (let i = 0; i < actualTabCount - 1; i++) {

        serviceTl.addLabel(`step-${i}`);

        // 탭 리스트 즉시 전환 (duration을 짧게 설정)
        serviceTl.to(tabList, { y: () => -((i + 1) * getItemHeight()), duration: 0.01, ease: "none" }, `step-${i}+=0.5`);
        opacityMap.forEach(({ offset, opacity, fontWeight }) => {
            const targetItem = tabItems[i + offset];
            if (targetItem) {
                // opacity도 즉시 전환
                serviceTl.to(targetItem, { opacity, fontWeight, duration: 0.01 }, `step-${i}+=0.5`);
            }
        });

        serviceTl.to(serviceContents[i], { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, `step-${i}`);

        if (serviceContents[i + 1]) {
            const nextContent = serviceContents[i + 1];
            const nextTitle = nextContent.querySelector('.service-title');
            const nextDesc = nextContent.querySelector('.service-description');

            serviceTl.to(nextContent, { autoAlpha: 1, duration: 0.1 }, `step-${i}`);
            serviceTl.fromTo(nextTitle, 
                { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0 },
                { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1, duration: 0.5, ease: "power2.out" },
                `step-${i}+=0.2`
            );
            serviceTl.fromTo(nextDesc, 
                { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0 },
                { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1, duration: 0.5, ease: "power2.out" },
                `step-${i}+=0.4`
            );
        }

        if (isMobileServices) {
            // 모바일: 모든 이미지가 왼쪽으로 슬라이드 (캐러셀 형태, 양옆에 다른 이미지 보임)
            serviceImages.forEach((img, imgIndex) => {
                serviceTl.to(img, {
                    x: () => {
                        const offset = getMobileOffset();
                        const currentX = offset + imgIndex * (getImageWidth() + getGap());
                        const moveAmount = (i + 1) * (getImageWidth() + getGap());
                        return currentX - moveAmount;
                    },
                    duration: 1, ease: "power2.inOut"
                }, `step-${i}`);
            });
        } else {
            // PC: 기존 방식 (이전 이미지 어두워지고, 다음 이미지가 위로 덮음)
            serviceTl.to(serviceImages[i], { filter: 'brightness(0.3)', duration: 1, ease: "none" }, `step-${i}`);
            
            serviceImages.forEach((img, imgIndex) => {
                if (imgIndex > i) {
                    serviceTl.to(img, {
                        x: () => {
                            const currentX = imgIndex * (getImageWidth() + getGap());
                            const moveAmount = (i + 1) * (getImageWidth() + getGap());
                            return currentX - moveAmount;
                        },
                        duration: 1, ease: "none"
                    }, `step-${i}`);
                }
            });
        }

        // 각 콘텐츠 전환 후 홀드 구간 (텀 추가)
        serviceTl.to({}, { duration: 0.5 });
    }
    serviceTl.addLabel(`step-${actualTabCount - 1}`);
    
    // 마지막 콘텐츠를 볼 수 있는 홀드 구간 추가 (About으로 넘어가기 전 텀)
    serviceTl.addLabel("outro");
    serviceTl.to({}, { duration: 0.5 });

/* ==========================================================================
   [Section 5] About (Fade In 버전)
   ========================================================================== */

// 1. 요소 선택
const aboutSection = document.querySelector('.about-section');
const aboutMainWrap = document.querySelector('.about-main-wrap');
const aboutContents = gsap.utils.toArray('.about-main-content');
const aboutVideos = gsap.utils.toArray('.about-visual-video');

const bgGradient1 = document.querySelector('.about-bg-gradient-1');
const bgGradient2 = document.querySelector('.about-bg-gradient-2');

// [설정] 색상 팔레트
const colorPalettes = [
  { color1: "#2C8BFF", color2: "#2CFBFF" },
  { color1: "#FCFF53", color2: "#D1BFFF" },
  { color1: "#7AD0BF", color2: "#FFEDBF" },
  { color1: "#9853B7", color2: "#94B0CC" }
];

// 영상 길이 5초 고정
const VIDEO_DURATION = 5;

// 로드 중복 방지 헬퍼
function ensureLoad(video) {
  if (video.dataset._loaded === "1") return;

  // preload=none/metadata여도 실제 다운로드 유도하려면 auto로 올려주는 게 안전
  if (video.preload === "none" || video.preload === "metadata") {
    video.preload = "auto";
  }

  video.dataset._loaded = "1";
  video.load();
}

function initAboutSection() {
  // (A) 레이아웃 & 비디오 초기 세팅
  const wrapHeight = window.innerHeight - 300;
  gsap.set(aboutMainWrap, { overflow: 'hidden', position: 'relative' });

  // iOS 감지
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  aboutVideos.forEach((video, i) => {
    // 스크럽 제어할 거라 기본 재생은 막음(항상 pause 상태 유지)
    video.pause();
    video.currentTime = 0;

    // "첫 프레임이 준비됐을 때" 1회만 정리 (loadedmetadata는 스크롤 중 로드될 때 끊김 유발 가능)
    video.addEventListener('loadeddata', () => {
      // 첫 프레임 확보 후, GSAP이 currentTime을 제어하도록 항상 멈춘 상태 유지
      video.pause();
      // 최초만 0초로 맞추기
      try { video.currentTime = 0; } catch (e) {}
    }, { once: true });

    // iOS에서 뒤 비디오는 완전 지연 로드(필요할 때 ensureLoad로 로드)
    if (i > 0 && isIOS) {
      video.preload = 'none';
    }

    gsap.set(video, {
      zIndex: i + 1,
      autoAlpha: i === 0 ? 1 : 0
    });
  });

  // 첫 번째 배경색 초기값 설정
  const firstColors = colorPalettes[0];
  gsap.set(bgGradient1, {
    background: `linear-gradient(84deg, ${firstColors.color1} 38.65%, rgba(0, 0, 0, 0.00) 77.14%)`
  });
  gsap.set(bgGradient2, {
    background: `linear-gradient(86deg, ${firstColors.color2} 98.05%, rgba(0, 0, 0, 0.00) 78.42%)`
  });

  // (B) 텍스트 좌표 계산
  const isMobileView = window.innerWidth <= 768;
  const centerPoint = isMobileView ? wrapHeight / 3 : wrapHeight / 2;
  const textStops = [];

  aboutContents.forEach((content) => {
    const centeringY = -(content.offsetTop - centerPoint + (content.offsetHeight / 2));
    textStops.push(centeringY);
  });

  // 마지막 콘텐츠는 화면에 남아있도록 추가 이동(기존 로직 유지)
  textStops.push(textStops[textStops.length - 1] - wrapHeight / 3.5);

  // (C) 메인 타임라인
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "top top",
      end: `+=${aboutVideos.length * 1800}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateHighlightsAndColorsThrottled();

        // 다음 비디오 미리 로드 (현재 구간 기준으로 "다음"을 선로딩)
        const len = aboutVideos.length;
        const currentPhase = Math.min(len - 1, Math.floor(self.progress * len));
        const nextIndex = currentPhase + 1;

        if (nextIndex < len) {
          const nextVideo = aboutVideos[nextIndex];
          if (nextVideo.readyState < 2) {
            ensureLoad(nextVideo);
          }
        }
      }
    }
  });

  // (D) 애니메이션 조립
  aboutVideos.forEach((video, i) => {
    const phaseLabel = `phase-${i}`;

    // 0) phase 시작에 currentTime을 명확히 0으로 세팅(스크럽에서도 시작점 일관)
    aboutTl.set(video, { currentTime: 0 }, phaseLabel);

    // 1) 비디오 로드(필요 시) + 스크러빙
    aboutTl.to(video, {
      currentTime: VIDEO_DURATION,
      duration: VIDEO_DURATION,
      ease: "none",
      onStart: () => {
        // 해당 phase가 시작될 때 로드 보장
        if (video.readyState < 2) {
          ensureLoad(video);
        }
        // 스크럽 제어를 위해 항상 재생은 멈춘 상태 유지
        video.pause();
      }
    }, phaseLabel);

    // 2) 텍스트 이동
    const startY = textStops[i];
    const endY = textStops[i + 1];

    if (endY !== undefined) {
      aboutTl.fromTo(
        aboutContents,
        { y: startY },
        {
          y: endY,
          duration: VIDEO_DURATION,
          ease: "none"
        },
        phaseLabel
      );
    }

    // 3) 다음 비디오 등장(Fade In) + 배경색 전환
    if (i < aboutVideos.length - 1) {
      const nextVideo = aboutVideos[i + 1];
      const nextColors = colorPalettes[i + 1] || colorPalettes[0];

      // 페이드인은 다음 phase 시작 직전에 겹치게(빈 구간 완화)
      const fadeStart = `${phaseLabel}+=${Math.max(0, VIDEO_DURATION - 1)}`;

      aboutTl.to(nextVideo, {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          // 페이드인 시점에 다음 비디오도 로드 보장
          if (nextVideo.readyState < 2) {
            ensureLoad(nextVideo);
          }
          nextVideo.pause();
        }
      }, fadeStart);

      aboutTl.to(bgGradient1, {
        background: `linear-gradient(84deg, ${nextColors.color1} 38.65%, rgba(0, 0, 0, 0.00) 77.14%)`,
        duration: 1,
        ease: "power2.inOut"
      }, fadeStart);

      aboutTl.to(bgGradient2, {
        background: `linear-gradient(86deg, ${nextColors.color2} 98.05%, rgba(0, 0, 0, 0.00) 78.42%)`,
        duration: 1,
        ease: "power2.inOut"
      }, fadeStart);
    }
  });

  ScrollTrigger.sort();
  ScrollTrigger.refresh();
}

// 헬퍼 함수 - 글씨 하이라이트(프레임 제한)
let lastUpdateTime = 0;
let animationFrameId = null;
const UPDATE_INTERVAL = 100; // 100ms마다만 업데이트

function updateHighlightsAndColorsThrottled() {
  const now = Date.now();

  if (animationFrameId || (now - lastUpdateTime < UPDATE_INTERVAL)) {
    return;
  }

  animationFrameId = requestAnimationFrame(() => {
    updateHighlightsAndColors();
    lastUpdateTime = Date.now();
    animationFrameId = null;
  });
}

function updateHighlightsAndColors() {
  const aboutContents = document.querySelectorAll('.about-main-content');
  const viewCenter = window.innerHeight / 2;

  aboutContents.forEach((content) => {
    const rect = content.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const dist = Math.abs(viewCenter - center);

    const title = content.querySelector('.about-title');
    const desc = content.querySelector('.about-description');

    const isNearCenter = dist < 200;
    const isScrollingUp = center < viewCenter && rect.bottom > 50;
    const targetOpacity = (isNearCenter || isScrollingUp) ? 1 : 0.1;

    if (title) {
      const currentOpacity = parseFloat(gsap.getProperty(title, "opacity")) || 1;
      if (Math.abs(currentOpacity - targetOpacity) > 0.05) {
        gsap.to(title, { opacity: targetOpacity, duration: 0.3, overwrite: true });
      }
    }
    if (desc) {
      const currentOpacity = parseFloat(gsap.getProperty(desc, "opacity")) || 1;
      if (Math.abs(currentOpacity - targetOpacity) > 0.05) {
        gsap.to(desc, { opacity: targetOpacity, duration: 0.3, overwrite: true });
      }
    }
  });
}

// 실행
initAboutSection();


    /* ==========================================================================
       [Section 6] News (뉴스)
       ========================================================================== */
    
    const newsSection = document.querySelector('.news-section');
    const newsTitle = newsSection.querySelector('.news-title');
    const newsDesc = newsSection.querySelector('.news-description');
    const newsCards = gsap.utils.toArray('.news-card');

    // 스타일 통일: Wipe Title / FadeUp Desc
    gsap.set(newsTitle, { clipPath: 'inset(0 100% 0 0)', autoAlpha: 1 });
    gsap.set(newsDesc, { y: 30, autoAlpha: 0 });

    newsCards.forEach(card => {
        const contents = card.querySelectorAll('.news-content, .news-image');
        gsap.set(card, { borderLeftColor: "rgba(206, 206, 206, 0)" });
        gsap.set(contents, { y: 50, autoAlpha: 0 }); // y: 50
    });

    // 타이틀 등장 (Trigger: top 75%)
    gsap.timeline({
        scrollTrigger: {
            trigger: ".news-section",
            start: "top 75%", 
            toggleActions: "play none none reverse",
            once: true
        }
    })
    .to(newsTitle, { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: "power2.out" })
    .to(newsDesc, { y: 0, autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "-=1.0");

    // 카드 등장
    const isMobileNews = window.innerWidth <= 768;

    if (isMobileNews) {
        // 768px 이하: pin 없이 각 카드가 화면에 들어올 때 등장
        newsCards.forEach((card, i) => {
            const contents = card.querySelectorAll('.news-content, .news-image');
            
            gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    once: true
                }
            })
            .to(card, { borderTopColor: "#cecece", duration: 0.5, ease: "none" })
            .to(contents, { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }, "-=0.3");
        });

    } else {
        // PC: 기존 방식
        const newsTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".news-section",
                start: "top top",
                end: () => `+=${100 + (newsCards.length * 40)}%`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });

        newsTl.to({}, { duration: 1 });

        // 1단계: 선이 먼저 하나씩 순차적으로 나옴
        newsCards.forEach((card, i) => {
            newsTl.to(card, { borderLeftColor: "#cecece", duration: 1, ease: "none" });
        });

        // 2단계: 모든 카드 내용이 한꺼번에 나옴
        newsTl.addLabel("contents-appear");
        const allContents = [];
        newsCards.forEach(card => {
            const contents = card.querySelectorAll('.news-content, .news-image');
            contents.forEach(content => allContents.push(content));
        });
        newsTl.to(allContents, { y: 0, autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "contents-appear");
        
        newsTl.to({}, { duration: 2 });
    }


    /* ==========================================================================
       [Section 7] Partners (파트너사)
       ========================================================================== */
    
    const partnersSection = document.querySelector('.partners-section');
    const partnersTitle = partnersSection.querySelector('.partners-title');
    const partnerTracks = gsap.utils.toArray('.partners-track'); 

    gsap.set(partnersTitle, { clipPath: 'inset(0 100% 0 0)', autoAlpha: 1 });
    gsap.set(partnerTracks, { y: 50, autoAlpha: 0 }); // y: 50

    const partnerTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".partners-section",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    partnerTl
        .to(partnersTitle, { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: "power2.out" })
        .to(partnerTracks, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }, "-=1.0");

}); 