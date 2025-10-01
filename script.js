// ------- 기존 유지: 커서 관련 --------
const cursorParent = document.getElementById('mouse-cursor')
const cursorChild = cursorParent.children[0]
window.addEventListener('mousemove', mousemove)
window.addEventListener('mousedown', mousedown)
window.addEventListener('mouseup', mouseup)

let scale = 1;
let cursorX = 0, cursorY = 0;
let stage = '';

function mousemove(e) {
  cursorX = e.pageX - cursorParent.offsetWidth / 2
  cursorY = e.pageY - cursorParent.offsetHeight / 2
  cursorParent.style.transform =
    `translate3d(${cursorX}px, ${cursorY}px, 0)`

  switch (e.target.getAttribute('data-cursor')) {
    case 'topcontainer':
    case 'top1':
    case 'top2':
    case 'top3':
    case 'main1':
    case 'main2':
    case 'main3':
    case 'main4':
    case 'bottomItem1':
    case 'bottomItem2':
    case 'bottomItem3':
      if (stage === e.target.getAttribute('data-cursor')) return;
      stage = e.target.getAttribute('data-cursor');
      scale = (['top1', 'top2', 'top3', 'main4', 'bottomItem1', 'bottomItem2', 'bottomItem3'].includes(stage)) ? 2 : 1;
      break;
  }
  cursorChild.style.setProperty('--cursor-scale', scale);
}

function mousedown(e) {
  scale *= 0.75;
  cursorChild.style.setProperty('--cursor-scale', scale);
}
function mouseup(e) {
  scale *= 1.25;
  cursorChild.style.setProperty('--cursor-scale', scale);
}

// ------- 기존 유지: 스크롤 시 headerBox 축소 --------
const headerBox = document.getElementById('headerBox');
const topBoxes = document.getElementById('topBoxes');
const topBox = document.querySelectorAll('.topBox');
const logo = document.getElementById('logo');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    if (!headerBox.dataset.isExpanded) {
      headerBox.classList.add('scrolled');
      topBoxes.classList.add('scrolled');
      topBox.forEach(box => box.classList.add('scrolled'));
      logo.style.pointerEvents = 'none';
    }
  } else {
    headerBox.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
    logo.style.pointerEvents = 'auto';
    headerBox.dataset.isExpanded = 'true';
  }
});

headerBox.addEventListener('click', function () {
  if (this.classList.contains('scrolled')) {
    this.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
    logo.style.pointerEvents = 'auto';
    headerBox.dataset.isExpanded = 'true';
  }
});

window.addEventListener('scroll', function () {
  if (window.scrollY > 50 && headerBox.dataset.isExpanded === 'true') {
    headerBox.classList.add('scrolled');
    topBoxes.classList.add('scrolled');
    topBox.forEach(box => box.classList.add('scrolled'));
    logo.style.pointerEvents = 'none';
    headerBox.dataset.isExpanded = 'false';
  }
});





// circleForS3: 중앙 밴드에서 슬라이드, 텍스트: #section2가 10% 보이면 살짝 위로 페이드인
(() => {
  const circle   = document.getElementById('circleForS3');
  const section2 = document.getElementById('section2');
  const texts    = document.querySelectorAll('#s3text, #viewAllProjects');
  if (!circle || !section2 || !texts.length) return;

  // 텍스트 초기 상태(아래로 12px)
  texts.forEach(el => {
    if (!el.style.transition) el.style.transition = 'opacity 900ms ease, transform 700ms ease';
    el.style.opacity   = '0';
    el.style.transform = 'translate(-50%, 50px)';
  });

  // 원 보여주기/숨기기
  const setCircle = (on) => {
    circle.style.opacity   = on ? '1' : '0';
    circle.style.transform = on
      ? 'translateX(-50%) translateY(0)'
      : 'translateX(-50%) translateY(100px)';
  };

  // 텍스트 보여주기/숨기기 (살짝 올라오며)
  const setTexts = (on) => {
    texts.forEach(el => {
      el.style.opacity   = on ? '1' : '0';
      el.style.transform = on ? 'translate(-50%, 0)' : 'translate(-50%, 12px)';
    });
  };

  // 1) 원: 뷰포트 중앙 밴드(위/아래 10% 잘라낸 영역)에서만 on
  new IntersectionObserver((entries) => {
    setCircle(entries[0].isIntersecting);
  }, {
    root: null,
    rootMargin: '-5% 0px -5% 0px',
    threshold: 0
  }).observe(circle);

// 2) 텍스트: #section2가 아주 살짝만 보여도(≈2%) 등장, 1% 이하로 떨어지면 숨김
(() => {
  const SHOW_AT = 0.02; // 2%
  const HIDE_AT = 0.01; // 1% (히스테리시스)
  let shown = false;

  new IntersectionObserver(([entry]) => {
    const r = entry.intersectionRatio || 0;
    if (!shown && r >= SHOW_AT) {
      shown = true;
      setTexts(true);
    } else if (shown && r <= HIDE_AT) {
      shown = false;
      setTexts(false);
    }
  }, {
    root: null,
    threshold: [0, 0.01, 0.02, 1]
  }).observe(section2);
})();

})();






window.addEventListener('scroll', () => {
  const text = document.querySelector('#section12 .floating-text');
  const rect = text.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 글자 중심 Y값
  const textCenter = rect.top + rect.height / 2;

  // 화면 중앙 위치
  const midScreen = windowHeight / 2;

  if (textCenter >= midScreen) {
    text.style.opacity = 1; // 중앙 아래에서는 완전 보임
  } else {
    // 중앙보다 위로 올라갈수록 1→0 으로 서서히 줄어듦
    const distance = midScreen - textCenter;
    const fadeRange = 150; // 150px 범위 동안 점점 사라짐
    let opacity = 1 - distance / fadeRange;
    if (opacity < 0) opacity = 0;
    text.style.opacity = opacity;
  }
});






(function () {
  const container = document.getElementById('workPreviewScroll');
  if (!container) return;

  /* ---------- 1) 트랙 구성 & 복제 ---------- */
  const originals = Array.from(container.children);
  if (!originals.length) return;

  const track = document.createElement('div');
  track.className = 'scroll-track';
  const frag1 = document.createDocumentFragment();
  originals.forEach(n => frag1.appendChild(n));
  const frag2 = document.createDocumentFragment();
  originals.forEach(n => frag2.appendChild(n.cloneNode(true)));
  track.appendChild(frag1);
  track.appendChild(frag2);
  container.appendChild(track);

  /* ---------- 2) 비디오 하이드레이션 ---------- */
  function hydrateVideos(root) {
    const vids = (root || track).querySelectorAll('video');
    vids.forEach(v => {
      const ds = v.getAttribute('data-src') || v.closest('.workThumbnail')?.getAttribute('data-src');
      if (!v.getAttribute('src') && ds) v.setAttribute('src', ds);
      v.muted = true; v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      if (!v.getAttribute('preload')) v.setAttribute('preload', 'metadata');
      v.play?.().catch(() => {});
    });
  }
  hydrateVideos(track);

  /* ---------- 3) 캡션 주입 & 내비/터치 ---------- */
  function hydrateCaptions(root) {
    (root || track).querySelectorAll('.workThumbnail').forEach(card => {
      const title = card.dataset.title || '';
      const sub   = card.dataset.subtitle || '';
      if (!card.querySelector('.thumb-caption')) {
        const cap = document.createElement('div');
        cap.className = 'thumb-caption';
        cap.innerHTML = `<strong class="thumb-title">${title}</strong><div class="thumb-sub">${sub}</div>`;
        card.appendChild(cap);
      }
      const link = card.dataset.link;
      if (link) {
        card.style.cursor = 'pointer';
        card.setAttribute('role','link');
        card.setAttribute('tabindex','0');
        card.addEventListener('click', () => { window.location.href = link; });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.href = link; }
        });
        // 터치: 첫 탭은 올림, 두 번째 탭은 이동
        let touchedOnce = false;
        card.addEventListener('touchend', (e) => {
          if (!touchedOnce) { card.classList.add('is-active'); touchedOnce = true; setTimeout(()=>touchedOnce=false,1200); e.preventDefault(); }
          else { window.location.href = link; }
        }, { passive:false });
        card.addEventListener('mouseleave', () => card.classList.remove('is-active'));
      }
    });
  }
  hydrateCaptions(track);

  /* ---------- 4) 세트 수 보강 & 측정 ---------- */
  function getGapPx() {
    const cs = getComputedStyle(track);
    const g = cs.gap || cs.columnGap || '0px';
    const n = parseFloat(g);
    return Number.isFinite(n) ? n : 0;
  }
  let oneSetWidth = 0;
  function measureOneSetWidth() {
    const gap = getGapPx();
    const firstRect = track.children[0].getBoundingClientRect();
    const lastRect  = track.children[originals.length - 1].getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const left  = firstRect.left - trackRect.left;
    const right = lastRect.right - trackRect.left;
    oneSetWidth = Math.round((right - left) + gap);
    if (container.scrollLeft === 0 && oneSetWidth > 0) container.scrollLeft = 1;
  }
  function appendCloneSet() {
    const f = document.createDocumentFragment();
    originals.forEach(n => f.appendChild(n.cloneNode(true)));
    track.appendChild(f);
    hydrateVideos(track);
    hydrateCaptions(track);
    reserveCaptionSpace(); // 새 캡션 높이 반영
  }
  function ensureEnoughSets() {
    measureOneSetWidth();
    if (!oneSetWidth) return;
    while (track.children.length / originals.length < 3) appendCloneSet();
    while (track.scrollWidth < container.clientWidth * 2 &&
           track.children.length / originals.length < 10) appendCloneSet();
  }
  ensureEnoughSets();

  /* ---------- 5) 자동 스크롤 + 래핑 ---------- */
  let autoOn = true;
  let lastT = performance.now();
  const SPEED = (window.innerWidth <= 767) ? 170 : 240; // px/s

  function wrapSeamless() {
    const W = oneSetWidth || 1;
    let r = container.scrollLeft % W;
    if (r < 0) r += W;
    const base = Math.floor(container.scrollLeft / W) * W;
    const target = base + r;
    if (Math.abs(target - container.scrollLeft) > 0.5) {
      container.scrollLeft = Math.round(target);
    }
    if (container.scrollLeft >= W * 2) container.scrollLeft -= W;
  }
  function tick(now) {
    const dt = (now - lastT) / 1500;
    lastT = now;
    if (autoOn && oneSetWidth > 0) {
      container.scrollLeft += SPEED * dt;
      wrapSeamless();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(t => { lastT = t; tick(t); });

  /* ---------- 6) 입력(휠/드래그) ---------- */
  let resumeTimer = null;
  function pauseAuto() {
    autoOn = false;
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => (autoOn = true), 1000);
  }
  container.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.cancelable) e.preventDefault();
      container.scrollLeft += e.deltaX;
      wrapSeamless();
      pauseAuto();
    }
  }, { passive:false });

  let isDown=false, startX=0, startY=0, startLeft=0, lock=null;
  container.addEventListener('mousedown', (e) => {
    isDown = true; lock = null; pauseAuto();
    startX = e.clientX; startY = e.clientY; startLeft = container.scrollLeft;
    container.classList.add('is-dragging');
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!lock) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) lock = 'x';
      else if (Math.abs(dy) > 6 && Math.abs(dy) > Math.abs(dx)) lock = 'y';
    }
    if (lock === 'x') { e.preventDefault(); container.scrollLeft = startLeft - dx; wrapSeamless(); }
    else if (lock === 'y') { isDown = false; container.classList.remove('is-dragging'); }
  });
  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false; lock = null;
    container.classList.remove('is-dragging');
    pauseAuto();
  });

  /* ---------- 7) 캡션 높이만큼 바닥 여유 동적 확보 ---------- */
  function reserveCaptionSpace() {
    const travel = 16, spare = 16;
    let maxH = 0;
    container.querySelectorAll('.thumb-caption').forEach(el => {
      const h = Math.max(el.offsetHeight || 0, el.scrollHeight || 0);
      if (h > maxH) maxH = h;
    });
    if (maxH < 24) maxH = 24;
    const need = Math.round(maxH + travel + spare);
    container.style.setProperty('--caption-reserve', need + 'px');
  }
  reserveCaptionSpace();
  window.addEventListener('resize', () => setTimeout(reserveCaptionSpace, 60), { passive:true });
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(reserveCaptionSpace).catch(()=>{}); }

  /* ---------- 8) 가시 카드만 play/pause ---------- */
  const ioPlay = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const v = e.target.querySelector('video'); if (!v) return;
      if (e.isIntersecting) v.play?.().catch(()=>{});
      else v.pause?.();
    });
  }, { root: container, threshold: 0.2 });
  track.querySelectorAll('.workThumbnail').forEach(el => ioPlay.observe(el));

  
  /* ---------- 9) 경계 깜빡임 방지: '가장 가까운 카드'만 활성 ---------- */
  (function activateNearestCardOnHover() {
    let raf = null;
    let current = null;
    let lastX = 0;

    function pick(clientX) {
      const cards = track.querySelectorAll('.workThumbnail');
      if (!cards.length) return;

      let best = null, bestDist = Infinity;
      cards.forEach(card => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;          // 카드 중심 X
        const d  = Math.abs(cx - clientX);
        if (d < bestDist) { best = card; bestDist = d; }
      });

      if (best && best !== current) {
        current?.classList.remove('is-active');
        current = best;
        current.classList.add('is-active');
      }
    }

    container.addEventListener('mousemove', (e) => {
      lastX = e.clientX;
      if (raf) return;
      raf = requestAnimationFrame(() => { pick(lastX); raf = null; });
    }, { passive: true });

    container.addEventListener('mouseenter', (e) => { pick(e.clientX); }, { passive: true });
    container.addEventListener('mouseleave', () => {
      current?.classList.remove('is-active');
      current = null;
    }, { passive: true });
  })();
})();










(() => {
  const svg = document.getElementById('circleForS3');
  if (!svg) return;
  const disk = svg.querySelector('circle');
  if (!disk) return;

  // 파(블루) → 빨(레드) → 노(옐로) 순환
  const ORDER = ['#75BDFF', '#FF5721', '#FFD600'];

  // 현재 색 기준 다음 색 반환(목록에 없으면 파란색부터 시작)
  const nextInOrder = (cur) => {
    const i = ORDER.findIndex(c => c.toLowerCase() === (cur || '').toLowerCase());
    return ORDER[(i >= 0 ? i + 1 : 0) % ORDER.length];
  };

  // SVG에서도 매 클릭마다 확실히 재생되는 '들썩' 애니메이션
  const bump = () => {
    disk.style.animation = 'none';                 // 리셋
    void disk.getBoundingClientRect().width;       // reflow (SVG-safe)
    requestAnimationFrame(() => {
      disk.style.animation = 'circle-bump 280ms cubic-bezier(.16,1,.3,1)';
    });
  };
  disk.addEventListener('animationend', () => { disk.style.animation = ''; });

  // 초기 fill이 없으면 파란색으로 세팅(순서 시작점 고정)
  if (!disk.getAttribute('fill')) disk.setAttribute('fill', ORDER[0]);

  svg.addEventListener('click', () => {
    const current = disk.getAttribute('fill');
    disk.setAttribute('fill', nextInOrder(current));  // 파→빨→노→파...
    bump();                                           // 클릭마다 들썩!
  });
})();














(() => {
  const container = document.getElementById('workPreviewScroll');
  if (!container) return;

  // 데스크톱(웹)에서만 동작
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  // 세트 타겟: 트랙이 있으면 트랙, 없으면 컨테이너 자체
  const target = container.querySelector('.scroll-track') || container;

  // 초기 상태: 아래 대기(불투명 0)
  target.classList.add('set-reveal');

  // 컨테이너가 화면에 10% 이상 보이면 ↑페이드인, 미만이면 ↓페이드아웃
  const io = new IntersectionObserver(([entry]) => {
    const show = entry.isIntersecting && entry.intersectionRatio >= 0.40;
    target.classList.toggle('is-in', show);
  }, {
    root: null,
    threshold: [0, 0.40, 0.41, 1] // 10% 경계에서 토글
  });

  io.observe(container);

  // 첫 로드 시 강제 1회 체크(브라우저 IO 타이밍 편차 대비)
  requestAnimationFrame(() => {
    const r  = container.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    const ratio   = visible / Math.min(vh, Math.max(1, r.height));
    target.classList.toggle('is-in', ratio >= 0.10);
  });
})();

