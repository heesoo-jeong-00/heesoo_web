// ===== Header shrink on scroll =====
const headerBox = document.getElementById('headerBox');
const topBoxes = document.getElementById('topBoxes');
const topBox = document.querySelectorAll('.topBox');
const logo = document.getElementById('logo');

document.addEventListener('DOMContentLoaded', () => {
  if (headerBox) headerBox.dataset.isExpanded = 'true'; // 초기 상태 명시
});

if (headerBox && topBoxes) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (!headerBox.dataset.isExpanded || headerBox.dataset.isExpanded === 'false') {
        headerBox.classList.add('scrolled');
        topBoxes.classList.add('scrolled');
        topBox.forEach(box => box.classList.add('scrolled'));
        logo && (logo.style.pointerEvents = 'none');
      }
    } else {
      headerBox.classList.remove('scrolled');
      topBoxes.classList.remove('scrolled');
      topBox.forEach(box => box.classList.remove('scrolled'));
      if (logo) logo.style.pointerEvents = 'auto';
      headerBox.dataset.isExpanded = 'true';
    }
  });

  headerBox.addEventListener('click', function () {
    if (this.classList.contains('scrolled')) {
      this.classList.remove('scrolled');
      topBoxes.classList.remove('scrolled');
      topBox.forEach(box => box.classList.remove('scrolled'));
      if (logo) logo.style.pointerEvents = 'auto';
      headerBox.dataset.isExpanded = 'true';
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50 && headerBox.dataset.isExpanded === 'true') {
      headerBox.classList.add('scrolled');
      topBoxes.classList.add('scrolled');
      topBox.forEach(box => box.classList.add('scrolled'));
      if (logo) logo.style.pointerEvents = 'none';
      headerBox.dataset.isExpanded = 'false';
    }
  });
}

/* ===== section2 텍스트/원 등장 ===== */
(() => {
  const circle   = document.getElementById('circleForS3');
  const section2 = document.getElementById('section2');
  const texts    = document.querySelectorAll('#s3text, #viewAllProjects');
  if (!circle || !section2 || !texts.length) return;

  texts.forEach(el => {
    if (!el.style.transition) el.style.transition = 'opacity 900ms ease, transform 700ms ease';
    el.style.opacity = '0';
    el.style.transform = 'translate(-50%, 50px)';
  });

  const setCircle = (on) => {
    circle.style.opacity   = on ? '1' : '0';
    circle.style.transform = on ? 'translateX(-50%) translateY(0)'
                                : 'translateX(-50%) translateY(100px)';
  };
  const setTexts = (on) => {
    texts.forEach(el => {
      el.style.opacity   = on ? '1' : '0';
      el.style.transform = on ? 'translate(-50%, 0)' : 'translate(-50%, 12px)';
    });
  };

  new IntersectionObserver((entries) => {
    setCircle(entries[0].isIntersecting);
  }, { root: null, rootMargin: '-5% 0px -5% 0px', threshold: 0 }).observe(circle);

  (() => {
    const SHOW_AT = 0.02, HIDE_AT = 0.01;
    let shown = false;
    new IntersectionObserver(([entry]) => {
      const r = entry.intersectionRatio || 0;
      if (!shown && r >= SHOW_AT) { shown = true;  setTexts(true); }
      else if (shown && r <= HIDE_AT) { shown = false; setTexts(false); }
    }, { root: null, threshold: [0, 0.01, 0.02, 1] }).observe(section2);
  })();
})();

/* ===== 원 클릭 색 순환 + '톡' ===== */
(() => {
  const svg = document.getElementById('circleForS3');
  if (!svg) return;
  const disk = svg.querySelector('circle');
  if (!disk) return;

  const ORDER = ['#75BDFF', '#FF5721', '#FFD600'];
  const nextInOrder = (cur) => {
    const i = ORDER.findIndex(c => c.toLowerCase() === (cur || '').toLowerCase());
    return ORDER[(i >= 0 ? i + 1 : 0) % ORDER.length];
  };
  const bump = () => {
    disk.style.animation = 'none';
    void disk.getBoundingClientRect().width;
    requestAnimationFrame(() => {
      disk.style.animation = 'circle-bump 280ms cubic-bezier(.16,1,.3,1)';
    });
  };
  disk.addEventListener('animationend', () => { disk.style.animation = ''; });
  if (!disk.getAttribute('fill')) disk.setAttribute('fill', ORDER[0]);

  svg.addEventListener('click', () => {
    const current = disk.getAttribute('fill');
    disk.setAttribute('fill', nextInOrder(current));
    bump();
  });
})();

/* ===== floating text 페이드 ===== */
window.addEventListener('scroll', () => {
  const text = document.querySelector('#section12 .floating-text');
  if (!text) return;
  const rect = text.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const textCenter = rect.top + rect.height / 2;
  const midScreen = windowHeight / 2;

  if (textCenter >= midScreen) {
    text.style.opacity = 1;
  } else {
    const distance = midScreen - textCenter;
    const fadeRange = 150;
    let opacity = 1 - distance / fadeRange;
    if (opacity < 0) opacity = 0;
    text.style.opacity = opacity;
  }
}, { passive: true });

/* =====================================================
   Carousel — 무한 루프 + 네이티브 링크 클릭 보존 (보강판)
   ===================================================== */
(() => {
  const root = document.getElementById('workPreviewScroll');
  if (!root) return;

  const viewport = root.querySelector('.carousel-viewport');
  const track    = root.querySelector('.carousel-track');
  const btnPrev  = root.querySelector('.carousel-edge.prev');
  const btnNext  = root.querySelector('.carousel-edge.next');

  if (!viewport || !track || !btnPrev || !btnNext) return;

  let base = Array.from(track.querySelectorAll('.workThumbnail'));
  if (!base.length) return;

  function hydrate(card) {
    const title = card.dataset.title || '';
    const sub   = card.dataset.subtitle || '';

    if (!card.querySelector('.thumb-caption')) {
      const cap = document.createElement('div');
      cap.className = 'thumb-caption';
      cap.innerHTML = `<strong class="thumb-title">${title}</strong><div class="thumb-sub">${sub}</div>`;
      card.appendChild(cap);
    }

    // 클릭 타깃 보장 (전체 앵커)
    const link = card.dataset.link;
    if (link && !card.querySelector('.card-link')) {
      const a = document.createElement('a');
      a.className = 'card-link';
      a.href = link;
      a.setAttribute('aria-label', `${title || 'work'} — open`);
      a.style.position = 'absolute';
      a.style.inset = '0';
      a.style.zIndex = '4';
      a.style.borderRadius = '12px';
      a.style.display = 'block';
      card.appendChild(a);
    }

    const v = card.querySelector('video');
    if (v) {
      const ds = v.getAttribute('data-src') || card.getAttribute('data-src');
      if (!v.getAttribute('src') && ds) v.setAttribute('src', ds);
      v.muted = true; v.setAttribute('muted',''); v.setAttribute('playsinline','');
      if (!v.getAttribute('preload')) v.setAttribute('preload','metadata');
    }
  }
  base.forEach(hydrate);

  // 3세트 구성
  const N = base.length;
  const frag = document.createDocumentFragment();
  const before = base.map(el => { const c = el.cloneNode(true); hydrate(c); return c; });
  const middle = base;
  const after  = base.map(el => { const c = el.cloneNode(true); hydrate(c); return c; });

  track.innerHTML = '';
  before.forEach(n => frag.appendChild(n));
  middle.forEach(n => frag.appendChild(n));
  after.forEach(n => frag.appendChild(n));
  track.appendChild(frag);

  let items = Array.from(track.querySelectorAll('.workThumbnail'));

  // ======= 치수/측정 보강 =======
  let gap = 24, slideW = 0;

  const widthOf = (el) => {
    if (!el) return 0;
    let w = el.offsetWidth;
    if (!w) w = el.getBoundingClientRect().width;
    if (!w) {
      const cs = getComputedStyle(el);
      w = parseFloat(cs.width);
    }
    if (!w) {
      const cssVar = parseFloat(
        getComputedStyle(root).getPropertyValue('--slide-w')
      );
      if (Number.isFinite(cssVar)) w = cssVar;
    }
    if (!w && viewport) w = viewport.clientWidth * 0.3;
    if (!w) w = 320; // 최후 안전망
    return Math.round(w);
  };

  const getGap = () => {
    const cs = getComputedStyle(track);
    const raw = (cs.gap || cs.columnGap || '24').toString().trim();
    const num = parseFloat(raw);
    return Number.isFinite(num) ? num : 24;
  };

  const measure = () => {
    gap    = getGap();
    slideW = widthOf(items[0]);
  };
  // ==============================

  // 상태/이동
  let index = N; // 중앙 세트 시작

  const unit = () => (slideW + gap);
  const translateFor = (idx) => -idx * unit();

  function applyTransform(idx, withTransition = true) {
    if (!withTransition) track.style.transition = 'none';
    track.style.transform = `translateX(${translateFor(idx)}px)`;
    if (!withTransition) {
      void track.getBoundingClientRect().width; // reflow
      track.style.transition = '';
    }
  }

  function setActive() {
    items.forEach((el, i) => el.classList.toggle('is-active', i === index));
    items.forEach((el, i) => {
      const v = el.querySelector('video'); if (!v) return;
      if (i === index) v.play?.().catch(()=>{});
      else v.pause?.();
    });
  }

  function goTo(idx, animate = true) {
    index = idx;
    applyTransform(index, animate);
    setActive();
  }
  const next = () => goTo(index + 1, true);
  const prev = () => goTo(index - 1, true);

  // 경계 재정렬
  track.addEventListener('transitionend', () => {
    if (index >= 2 * N) {
      goTo(index - N, false);
    } else if (index < N) {
      goTo(index + N, false);
    }
  });

  // 입력
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  viewport?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  // 스와이프 (탭과 구분, 앵커 네이티브 클릭 보존)
  let pointerDown = false, startX = 0, startIndex = 0, dragged = 0;
  const THRESH = 50;
  let isSwiping = false;

  const onDown = (e) => {
    pointerDown = true;
    startX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    startIndex = index;
    dragged = 0;
    isSwiping = false;
    track.style.transition = 'none';
  };

  const onMove = (e) => {
    if (!pointerDown) return;
    const cx = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const dx = cx - startX;
    dragged = dx;

    if (!isSwiping && Math.abs(dx) > 6) {
      isSwiping = true;
      root.querySelectorAll('.workThumbnail')
          .forEach(el => el.classList.add('swiping'));
    }

    if (isSwiping) {
      const baseX = translateFor(startIndex);
      track.style.transform = `translateX(${baseX + dx}px)`;
    }
  };

  const finishSwipe = () => {
    requestAnimationFrame(() => {
      root.querySelectorAll('.workThumbnail')
          .forEach(el => el.classList.remove('swiping'));
    });
  };

  const onUp = () => {
    if (!pointerDown) return;
    pointerDown = false;
    track.style.transition = '';

    if (isSwiping) {
      if (dragged <= -THRESH) next();
      else if (dragged >= THRESH) prev();
      else goTo(startIndex, true);
    }
    finishSwipe();
  };

  track.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });
  window.addEventListener('pointercancel', onUp, { passive: true });

  // 터치 전용도 지원
  track.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onUp, { passive: true });
  window.addEventListener('touchcancel', onUp, { passive: true });

  // 버튼 Y 중앙 고정
  function positionEdges() {
    const rC = root.getBoundingClientRect();
    const rV = (viewport || root).getBoundingClientRect();
    const localMid = (rV.top - rC.top) + (rV.height / 2);
    btnPrev.style.top = localMid + 'px';
    btnNext.style.top = localMid + 'px';
  }

  // ======= 초기화/타이밍 보강 =======
  const init = () => {
    items = Array.from(track.querySelectorAll('.workThumbnail'));
    measure();
    applyTransform(N, false); // 중앙 세트로 즉시 배치
    index = N;
    setActive();
    positionEdges();
  };

  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      init();
      // 이미지/비디오 로딩 이후 폭 변동 보정
      setTimeout(() => {
        measure();
        applyTransform(index, false);
        positionEdges();
      }, 0);
    });
  }, { once: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      measure(); applyTransform(index, false); positionEdges();
    }).catch(()=>{});
  }

  Array.from(track.querySelectorAll('img')).forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', () => {
        measure(); applyTransform(index, false); positionEdges();
      }, { once: true });
    }
  });
  Array.from(track.querySelectorAll('video')).forEach(v => {
    const onReady = () => { measure(); applyTransform(index, false); positionEdges(); };
    v.addEventListener('loadedmetadata', onReady, { once: true });
    if (!v.src) {
      const ds = v.getAttribute('data-src') || v.closest('.workThumbnail')?.getAttribute('data-src');
      if (ds) v.src = ds;
    }
  });

  const ro = new ResizeObserver(()=>{ measure(); applyTransform(index, false); positionEdges(); });
  if (viewport) ro.observe(viewport);

  window.addEventListener('resize', positionEdges, { passive:true });
  window.addEventListener('scroll', positionEdges,  { passive:true });
})();
