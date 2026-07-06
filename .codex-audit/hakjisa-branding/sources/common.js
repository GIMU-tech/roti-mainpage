/* ==========================================================================
   공통 JavaScript - 모든 페이지에서 사용
   ========================================================================== */

// 1. GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// 2. Lenis 부드러운 스크롤 초기화
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false
});

// 3. GSAP ScrollTrigger와 Lenis 완전 동기화
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// 4. DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    // Lenis 크기 변경 시 ScrollTrigger 갱신
    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    
    // 초기 새로고침
    ScrollTrigger.refresh();

    // 공통 요소들을 최상위 스코프에서 선언
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section');

    /* ========================================================================
       유틸리티 함수들
       ======================================================================== */
    
    // body 스타일 초기화 함수
    const resetBodyStyles = () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
    };

    // 헤더 light 클래스 처리 함수
    const updateHeaderLightClass = (scrollPosition) => {
        if (!header) return;
        
        // heroSection이 있고 해당 영역 내부에 있으면 light 유지, 아니면 제거
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (scrollPosition < heroHeight) {
                header.classList.add('light');
            } else {
                header.classList.remove('light');
            }
        } else {
            // 서브페이지(heroSection 없음)에서는 light 클래스 제거
            header.classList.remove('light');
        }
    };

    /* ========================================================================
       헤더 스크롤 상태 변경
       ======================================================================== */
    if (header) {
        let lastScroll = 0;
        
        // 메인 페이지: 기본으로 light 클래스 적용
        if (heroSection) {
            header.classList.add('light');
        }
        
        // Lenis 스크롤 이벤트로 헤더 상태 변경
        lenis.on('scroll', ({ scroll }) => {
            const heroHeight = heroSection ? heroSection.offsetHeight : 0;
            
            // 메인 페이지: hero 섹션 내에서는 기존 헤더 유지
            if (heroSection && scroll < heroHeight) {
                header.classList.remove('scrolled', 'hidden');
                header.classList.add('light'); // light 클래스 유지
            }
            // hero 섹션 이후 또는 서브 페이지
            else if (scroll <= 50) {
                header.classList.remove('scrolled', 'hidden');
                if (heroSection) header.classList.remove('light'); // hero 섹션 벗어나면 light 제거
            } 
            // 아래로 스크롤 (내릴 때) - 헤더 숨김
            else if (scroll > lastScroll && scroll > 100) {
                header.classList.add('scrolled', 'hidden');
                if (heroSection) header.classList.remove('light'); // hero 섹션 벗어나면 light 제거
            } 
            // 위로 스크롤 (올릴 때) - 헤더 표시
            else if (scroll < lastScroll) {
                header.classList.add('scrolled');
                header.classList.remove('hidden');
                if (heroSection) header.classList.remove('light'); // hero 섹션 벗어나면 light 제거
            }
            
            lastScroll = scroll;
        });
    }

    /* ========================================================================
       맨 위로 가기 버튼 (스크롤 방향 감지)
       ======================================================================== */
    const scrollTopBtn = document.querySelector('.scroll-top');

    if (scrollTopBtn) {
        const overviewSection = document.querySelector('.overview-section');
        const isMainPage = overviewSection !== null;
        let isInOverviewArea = false;
        let lastScrollForBtn = 0;
        const MIN_SCROLL_FOR_SUBPAGE = 300;
        
        // 메인 페이지: overview-section 영역 감지
        if (isMainPage) {
            ScrollTrigger.create({
                trigger: overviewSection,
                start: 'top bottom',
                end: 'max',
                onEnter: () => { isInOverviewArea = true; },
                onLeaveBack: () => {
                    isInOverviewArea = false;
                    scrollTopBtn.classList.remove('visible');
                }
            });
        }

        // 스크롤 방향에 따른 버튼 표시/숨김 함수
        const toggleButtonVisibility = (currentScroll, lastScroll) => {
            if (currentScroll < lastScroll) {
                scrollTopBtn.classList.add('visible');
            } else if (currentScroll > lastScroll) {
                scrollTopBtn.classList.remove('visible');
            }
        };

        // 스크롤 이벤트
        lenis.on('scroll', ({ scroll }) => {
            if (isMainPage) {
                // 메인 페이지: overview 영역 안에서만 동작
                if (isInOverviewArea) {
                    toggleButtonVisibility(scroll, lastScrollForBtn);
                }
            } else {
                // 서브페이지: 일정 스크롤 이후에만 동작
                if (scroll > MIN_SCROLL_FOR_SUBPAGE) {
                    toggleButtonVisibility(scroll, lastScrollForBtn);
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            }
            
            lastScrollForBtn = scroll;
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            lenis.scrollTo(0, { duration: 1.2 });
        });
    }

    /* ========================================================================
       언어 선택 드롭다운 (Spring MessageSource 연동)
       ======================================================================== */
    const languageSelector = document.querySelector('.language-selector');
    const languageButton = document.querySelector('.language-button');
    const languageDropdown = document.querySelector('.language-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangSpan = document.querySelector('.current-lang');

    if (languageSelector && languageButton && languageDropdown) {
        // 쿠키에서 현재 언어 가져오기
        const getCurrentLanguage = () => {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'lang') return value;
            }
            return 'ko'; // 기본값: 한국어
        };

        // 현재 언어 표시 업데이트
        const updateCurrentLanguage = (lang) => {
            const displayText = lang === 'ko' ? 'KR' : 'EN';
            if (currentLangSpan) {
                currentLangSpan.textContent = displayText;
            }
            // 활성 옵션 표시
            langOptions.forEach(option => {
                if (option.dataset.lang === lang) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
        };

        // 드롭다운 닫기
        const closeLanguageDropdown = () => {
            languageSelector.classList.remove('active');
        };

        // 쿠키 설정 함수
        const setLanguageCookie = (lang) => {
            const expires = new Date();
            expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1년
            // SameSite=Lax 추가로 크로스사이트 쿠키 정책 호환성 확보
            // HTTPS 환경에서는 Secure 속성도 추가
            const isSecure = window.location.protocol === 'https:';
            const secureFlag = isSecure ? ';Secure' : '';
            document.cookie = `lang=${lang};expires=${expires.toUTCString()};path=/;SameSite=Lax${secureFlag}`;
        };

        // 언어 변경 URL 생성 (Spring LocaleChangeInterceptor 연동)
        const getLanguageChangeUrl = (lang) => {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            return url.toString();
        };

        // 초기화: 현재 언어 설정 표시
        const currentLang = getCurrentLanguage();
        updateCurrentLanguage(currentLang);

        // 드롭다운 토글
        languageButton.addEventListener('click', (e) => {
            e.stopPropagation();
            languageSelector.classList.toggle('active');
        });

        // 언어 옵션 클릭 - 쿠키를 먼저 설정하고 페이지 새로고침
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = option.dataset.lang;
                closeLanguageDropdown();
                
                // 1. 쿠키를 먼저 설정 (즉시 반영을 위해)
                setLanguageCookie(selectedLang);
                
                // 2. 현재 URL에서 lang 파라미터 제거 후 새로고침
                // LocaleResolver가 쿠키를 읽어서 올바른 언어 사용
                const url = new URL(window.location.href);
                url.searchParams.delete('lang'); // 기존 lang 파라미터 제거
                window.location.href = url.toString();
            });
        });

        // 외부 클릭 시 드롭다운 닫기
        document.addEventListener('click', (e) => {
            if (!languageSelector.contains(e.target)) {
                closeLanguageDropdown();
            }
        });

        // ESC 키로 드롭다운 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLanguageDropdown();
            }
        });
    }

    /* ========================================================================
       모바일 메뉴 토글
       ======================================================================== */
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuButton && mobileMenu) {
        let savedScrollPosition = 0;

        // 메뉴 닫기 함수 (통합)
        const closeMenu = (shouldRestoreScroll = true) => {
            menuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
          
            resetBodyStyles();
            lenis.start();
          
            ScrollTrigger.getAll().forEach(st => st.enable());
          
            if (!shouldRestoreScroll) {
              requestAnimationFrame(() => {
                ScrollTrigger.refresh();
                updateHeaderLightClass(0);
              });
              return;
            }
          
            const y = savedScrollPosition;
          
            // 1) 다음 프레임: 레이아웃/트리거 계산 먼저 안정화
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
              lenis.resize?.(); // Lenis에 resize가 있으면 호출(없으면 무시됨)
          
              // 2) 그 다음 프레임: 스크롤 복원 (핵심)
              requestAnimationFrame(() => {
                // window.scrollTo가 안 먹는 환경이 있어 scrollTop도 같이 세팅
                document.documentElement.scrollTop = y;
                document.body.scrollTop = y;
                window.scrollTo(0, y);
          
                lenis.scrollTo(y, { immediate: true });
          
                updateHeaderLightClass(y);
              });
            });
          };

        // 메뉴 열기/닫기 토글
        menuButton.addEventListener('click', () => {
            const isOpening = !mobileMenu.classList.contains('active');
          
            menuButton.classList.toggle('active');
            mobileMenu.classList.toggle('active');
          
            if (isOpening) {
              // 메뉴 열기
              if (header) header.classList.add('light');
          
              savedScrollPosition = window.scrollY;
          
              ScrollTrigger.getAll().forEach(st => st.disable(false));
          
              document.body.style.position = 'fixed';
              document.body.style.top = `-${savedScrollPosition}px`;
              document.body.style.left = '0';
              document.body.style.right = '0';
              document.body.style.overflow = 'hidden';
          
              lenis.stop();
            } else {
              // 메뉴 닫기
              closeMenu(true);
            }
          });
          

        // 메뉴 링크 클릭 시 닫기 (페이지 이동하므로 스크롤 복원 불필요)
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu(false);
            });
        });

        // 메뉴 배경 클릭 시 닫기
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMenu(true);
            }
        });
    }
});

// 5. 페이지 로드 완료 후 스크롤 초기화
window.addEventListener('load', () => {
    lenis.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
});

/* ==========================================================================
   접근성 모드 토글 (페이드 전환)
   ========================================================================== */

// 쿠키 읽기 헬퍼 함수
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// 접근성 모드 전환 함수
function toggleAccessibilityMode() {
    // 1. 현재 스크롤 위치 저장
    const scrollPos = window.scrollY;
    sessionStorage.setItem('scrollPos', scrollPos);
    sessionStorage.setItem('transitioning', 'true');
    
    // 2. 페이드 아웃 애니메이션
    document.body.style.transition = 'opacity 0.25s ease-out';
    document.body.style.opacity = '0';
    
    // 3. 현재 모드 확인 및 토글
    const isAccessible = getCookie('accessibility') === 'true';
    const newValue = !isAccessible;
    
    // 4. 쿠키 설정
    const expires = new Date();
    expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1년
    const isSecure = window.location.protocol === 'https:';
    const secureFlag = isSecure ? ';Secure' : '';
    document.cookie = `accessibility=${newValue};expires=${expires.toUTCString()};path=/;SameSite=Lax${secureFlag}`;
    
    // 5. 페이드 완료 후 페이지 새로고침
    setTimeout(() => {
        window.location.href = '/';
    }, 250);
}

// 페이지 로드 시 전환 효과 처리
document.addEventListener('DOMContentLoaded', () => {
    const isTransitioning = sessionStorage.getItem('transitioning') === 'true';
    
    if (isTransitioning) {
        // 전환 플래그 제거
        sessionStorage.removeItem('transitioning');
        
        // 페이드 인 효과
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-in';
        
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
        
        // 스크롤 위치 복원 (페이지가 완전히 로드된 후)
        const scrollPos = sessionStorage.getItem('scrollPos');
        if (scrollPos) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(scrollPos));
                sessionStorage.removeItem('scrollPos');
            }, 100);
        }
    }
    
    // 버튼 텍스트 업데이트 (현재 모드에 따라 전환 가능한 모드 표시)
    const modeText = document.querySelector('.accessibility-mode-text');
    if (modeText) {
        const isAccessible = getCookie('accessibility') === 'true';
        const storyMode = modeText.dataset.storyMode || 'Story Mode';
        const accessibleMode = modeText.dataset.accessibleMode || 'Accessible Mode';
        
        // 현재 접근성 모드면 → 스토리 모드로 전환 가능
        // 현재 스토리 모드면 → 접근성 모드로 전환 가능
        modeText.textContent = isAccessible ? storyMode : accessibleMode;
    }
});