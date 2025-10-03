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
      if (stage === 'topcontainer') return
      scale = 1;
      stage = 'topcontainer'
      console.log('topcontainer')
      break


    case 'top1':
      if (stage === 'top1') return
      scale = 2;
      stage = 'top1'
      console.log('top1')
      break
    case 'top2':
      if (stage === 'top2') return
      scale = 2;
      stage = 'top2'
      console.log('top2')
      break
    case 'top3':
      if (stage === 'top3') return
      scale = 2;
      stage = 'top3'
      console.log('top3')
      break



    case 'main1':
      if (stage === 'main1') return
      scale = 1;
      stage = 'main1'
      console.log('main1')
      break

    case 'main2':
      if (stage === 'main2') return
      scale = 1;
      stage = 'main2'
      console.log('main2')
      break

    case 'main3':
      if (stage === 'main3') return
      scale = 1;
      stage = 'main3'
      console.log('main3')
      break



    case 'bottomItem1':
      if (stage === 'bottomItem1') return
      scale = 2;
      stage = 'bottomItem1'
      console.log('bottomItem1')
      break

    case 'bottomItem2':
      if (stage === 'bottomItem2') return
      scale = 2;
      stage = 'bottomItem2'
      console.log('bottomItem2')
      break

    case 'bottomItem3':
      if (stage === 'bottomItem3') return
      scale = 2;
      stage = 'bottomItem3'
      console.log('bottomItem3')
      break
  }

  cursorChild.style.setProperty('--cursor-scale', scale)

}

function mousedown(e) {
  scale *= 0.75
  cursorChild.style.setProperty('--cursor-scale', scale)
}
function mouseup(e) {
  scale *= 1.25
  cursorChild.style.setProperty('--cursor-scale', scale)
}



//애니메이션 추가

// HTML 요소에 대한 참조 변수를 설정
const headerBox = document.getElementById('headerBox');
const topBoxes = document.getElementById('topBoxes');
const topBox = document.querySelectorAll('.topBox');
const logo = document.getElementById('logo');

// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', function () {
  // 스크롤 위치가 50px 이상이고, headerBox가 확대된 상태가 아닐 경우
  if (window.scrollY > 50) {
    // 확대된 상태가 아니면 축소 스타일 적용
    if (!headerBox.dataset.isExpanded) {
      headerBox.classList.add('scrolled');
      topBoxes.classList.add('scrolled');
      topBox.forEach(box => box.classList.add('scrolled'));
      logo.style.pointerEvents = 'none';  // 로고 클릭 이벤트 비활성화
    }
  } else {
    // 스크롤 위치가 50px 이하인 경우, 모든 스타일을 제거하고, 확대 상태로 설정
    headerBox.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
    logo.style.pointerEvents = 'auto';  // 로고 클릭 이벤트 활성화
    headerBox.dataset.isExpanded = 'true';  // 확대 상태를 true로 설정
  }
});

// 클릭 이벤트 리스너 추가
headerBox.addEventListener('click', function () {
  // headerBox가 이미 축소된 상태인 경우
  if (this.classList.contains('scrolled')) {
    this.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
    logo.style.pointerEvents = 'auto';  // 로고 클릭 이벤트 활성화
    headerBox.dataset.isExpanded = 'true';  // 확대 상태를 true로 설정
  }
});

// 스크롤 이벤트에서 확대된 상태를 해제하고 다시 축소되도록 처리
window.addEventListener('scroll', function () {
  if (window.scrollY > 50 && headerBox.dataset.isExpanded === 'true') {
    headerBox.classList.add('scrolled');
    topBoxes.classList.add('scrolled');
    topBox.forEach(box => box.classList.add('scrolled'));
    logo.style.pointerEvents = 'none';  // 로고 클릭 이벤트 비활성화
    headerBox.dataset.isExpanded = 'false';  // 확대 상태를 false로 재설정
  }
});

//페이지 로드 시 main 투명도 조절
document.addEventListener('DOMContentLoaded', function () {
  // "boxes" 클래스를 가진 모든 요소를 선택합니다.
  const boxes = document.querySelectorAll('.boxes'); // 클래스 선택자를 사용합니다.
  boxes.forEach(el => {
    el.style.opacity = 1;
  });
});




// (2) 서클 관련 scale 조정
document.getElementById('circleForS3').addEventListener('mouseover', () => {
  scale = 1;
});
document.getElementById('viewAllProjects').addEventListener('mouseover', (event) => {
  scale = 2;
  event.stopPropagation();
});



// (4) IntersectionObserver (❗스크롤 이벤트 밖으로 빼줬다!)
// const circleForS3 = document.getElementById('circleForS3');
// const elementsToShow = document.querySelectorAll('#s3text, #viewAllProjects');

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       circleForS3.style.opacity = '1';
//       circleForS3.style.transform = 'translateX(-50%) translateY(0)';
//       elementsToShow.forEach(element => {
//         element.style.opacity = '1';
//         element.style.transform = 'translate(-50%, 0)';
//       });
//     } else {
//       circleForS3.style.opacity = '1';
//       circleForS3.style.transform = 'translateX(-50%) translateY(30px)';
//       elementsToShow.forEach(element => {
//         element.style.opacity = '1';
//         element.style.transform = 'translate(-50%, 30px)';
//       });
//     }
//   });
// }, { threshold: 0.2 });

// observer.observe(document.getElementById('s2'));

// (5) 모바일 br 제거
function removeBrOnMobile() {
  if (window.innerWidth <= 767) {
    document.querySelectorAll('br').forEach(br => br.remove());
  }
}
window.addEventListener('DOMContentLoaded', removeBrOnMobile);
window.addEventListener('resize', removeBrOnMobile);





/* #s2 기준 원/텍스트 페이드(기존 유지) */

/* #s2 기준 원/텍스트 페이드 (개선판) */
(function () {
  const circle = document.getElementById('circleForS3');
  const section = document.getElementById('s2');
  const texts = document.querySelectorAll('#s3text, #viewAllProjects');
  if (!circle || !section || !texts.length) return;

  // 초기 텍스트 상태(아래 살짝 + 투명)
  const showTexts = (on) => {
    texts.forEach(el => {
      el.style.opacity = on ? '1' : '0';
      el.style.transform = on ? 'translate(-50%, 0)' : 'translate(-50%, 12px)';
    });
  };
  showTexts(false);



  // 1) 원: 섹션이 화면에 보이면 1초 뒤에 등장
  let circleTimer = null;

  const ioCircle = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      // 보이면 타이머 시작
      if (!circleTimer) {
        circleTimer = setTimeout(() => {
          circle.style.transform = 'translateX(-50%) translateY(0)';
        }, 300); // 10ms = 1초 뒤
      }
    } else {
      // 안 보이면 초기화 + 다시 내려가기
      clearTimeout(circleTimer);
      circleTimer = null;
      circle.style.transform = 'translateX(-50%) translateY(80px)';
    }
  }, {
    root: null,
    threshold: 0.01 // 10%만 보여도 "보임"으로 간주
  });

  ioCircle.observe(section);


  // 2) 텍스트: 가시율 히스테리시스 (올라오면 인, 내려가면 아웃)
  const SHOW_AT = 0.2; 
  const HIDE_AT = 0.2; 
  let shown = false;

  const ioText = new IntersectionObserver(([entry]) => {
    const r = entry.intersectionRatio || 0;
    if (!shown && r >= SHOW_AT) { shown = true; showTexts(true); }
    else if (shown && r <= HIDE_AT) { shown = false; showTexts(false); }
  }, {
    root: null,
    threshold: [0, 0.2, 0.2, 1]
  });
  ioText.observe(section);

  // iOS/Safari 폴백: IO가 불안정할 때 대비
  let ticking = false;
  const fallback = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const r = section.getBoundingClientRect();
    const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    const ratio = visible / Math.min(vh, Math.max(1, r.height));
    if (!shown && ratio >= SHOW_AT) { shown = true; showTexts(true); }
    else if (shown && ratio <= HIDE_AT) { shown = false; showTexts(false); }
    ticking = false;
  };
  const onScrollResize = () => { if (!ticking) { ticking = true; requestAnimationFrame(fallback); } };
  window.addEventListener('scroll', onScrollResize, { passive: true });
  window.addEventListener('resize', onScrollResize, { passive: true });
  requestAnimationFrame(fallback);
})();










/* 모바일에서 <br> 제거(요청 유지) */
(function () {
  function removeBrOnMobile() { if (window.innerWidth <= 767) document.querySelectorAll('br').forEach(br => br.remove()); }
  window.addEventListener('DOMContentLoaded', removeBrOnMobile);
  window.addEventListener('resize', removeBrOnMobile);
})();





/* ===========================================
   모바일 전용: 중앙 스냅 캐러셀 + 양방향 무한 이어붙이기
   (세로 스크롤 시 깜빡임 방지: width 변화에만 반응)
   =========================================== */
(function () {
  const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    || window.matchMedia('(max-width: 1024px)').matches;
  if (!isMobile) return;

  const container = document.getElementById('workPreviewScroll');
  const circle = document.getElementById('circleForS3');
  const fadeTexts = document.querySelectorAll('#s3text, #viewAllProjects');
  if (!container) return;

  /* ---------- 트랙 래핑(없으면 생성) ---------- */
  if (!container.querySelector('.scroll-track')) {
    const kids = Array.from(container.children);
    const trackEl = document.createElement('div');
    trackEl.className = 'scroll-track';
    kids.forEach(n => trackEl.appendChild(n));
    container.appendChild(trackEl);
  }
  const track = container.querySelector('.scroll-track');

  /* ---------- 비디오 하이드레이션 ---------- */
  function hydrateVideos(root) {
    const vids = (root || track).querySelectorAll('video');
    vids.forEach(v => {
      const ds = v.getAttribute('data-src') || v.closest('.workThumbnail')?.getAttribute('data-src');
      if (!v.getAttribute('src') && ds) v.setAttribute('src', ds);
      v.muted = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
      if (!v.getAttribute('preload')) v.setAttribute('preload', 'metadata');
      v.play?.().catch(() => { });
    });
  }
  hydrateVideos(track);

  /* ---------- 캡션 주입 ---------- */
  function hydrateCaptions(root) {
    (root || track).querySelectorAll('.workThumbnail').forEach(card => {
      const title = card.dataset.title || '';
      const sub = card.dataset.subtitle || '';
      if (!card.querySelector('.thumb-caption')) {
        const cap = document.createElement('div');
        cap.className = 'thumb-caption';
        cap.innerHTML = `<strong class="thumb-title">${title}</strong><div class="thumb-sub">${sub}</div>`;
        card.appendChild(cap);
      }
    });
  }
  hydrateCaptions(track);

  /* ---------- 캡션 높이만큼 바닥 여유 ---------- */
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
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(reserveCaptionSpace).catch(() => { });
  }

  /* ---------- 세트 측정/복제 (양방향 무한) ---------- */
  const ORIGINAL_COUNT = track.children.length;
  const templateHTML = Array.from(track.children).slice(0, ORIGINAL_COUNT).map(n => n.outerHTML).join('');

  function getGapPx() {
    const cs = getComputedStyle(track);
    const g = cs.gap || cs.columnGap || '0px';
    const n = parseFloat(g);
    return Number.isFinite(n) ? n : 0;
  }

  let oneSetWidth = 0;
  function measureOneSetWidth() {
    const gap = getGapPx();
    const firstSet = Array.from(track.children).slice(0, ORIGINAL_COUNT);
    if (!firstSet.length) return;
    let sum = 0;
    firstSet.forEach((el, i) => {
      sum += el.offsetWidth || el.getBoundingClientRect().width;
      if (i < firstSet.length - 1) sum += gap;
    });
    oneSetWidth = Math.round(sum);
  }

  function appendSetOnce() {
    const tmp = document.createElement('div');
    tmp.innerHTML = templateHTML;
    const frag = document.createDocumentFragment();
    while (tmp.firstChild) frag.appendChild(tmp.firstChild);
    track.appendChild(frag);
    hydrateVideos(track); hydrateCaptions(track);
    requestAnimationFrame(updateCenteredCard);
  }

  function prependSetOnce() {
    const tmp = document.createElement('div');
    tmp.innerHTML = templateHTML;
    const frag = document.createDocumentFragment();
    while (tmp.firstChild) frag.appendChild(tmp.firstChild);
    track.insertBefore(frag, track.firstChild);

    container.classList.add('snap-off');       // 스냅/스무스 잠깐 OFF
    if (oneSetWidth) container.scrollLeft += oneSetWidth;
    requestAnimationFrame(() => container.classList.remove('snap-off'));

    hydrateVideos(track); hydrateCaptions(track);
    requestAnimationFrame(updateCenteredCard);
  }

  function centerCardAt(index) {
    const cards = track.children;
    const card = cards[index];
    if (!card) return;
    const target = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
    container.scrollLeft = Math.max(0, Math.round(target));
    updateCenteredCard();
  }

  // 초기: 앞/뒤 1세트씩 + 가운데 세트 첫 카드 중앙
  container.classList.add('snap-off');
  requestAnimationFrame(() => {
    measureOneSetWidth();
    prependSetOnce();
    appendSetOnce();
    centerCardAt(ORIGINAL_COUNT);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => container.classList.remove('snap-off'));
    });
  });

  // 끝/처음 근처에서 동적 추가
  let guard = false;
  function checkEnds() {
    if (guard) return;
    guard = true;
    requestAnimationFrame(() => {
      measureOneSetWidth();
      const remainRight = container.scrollWidth - (container.scrollLeft + container.clientWidth);
      const remainLeft = container.scrollLeft;
      const threshold = Math.max(container.clientWidth * 1.2, oneSetWidth * 0.6);
      if (remainRight < threshold) appendSetOnce();
      if (remainLeft < threshold) prependSetOnce();
      guard = false;
    });
  }

  /* ---------- 중앙 카드 판별(가로 스크롤에서만) ---------- */
  let lastLeft = container.scrollLeft;
  let currentCenter = null;
  const CENTER_HYST = 8; // px

  function updateCenteredCard() {
    const cards = track.querySelectorAll('.workThumbnail');
    if (!cards.length) return;
    const vpLeft = container.getBoundingClientRect().left;
    const vpCenterX = vpLeft + container.clientWidth / 2;

    let curDist = Infinity;
    if (currentCenter && currentCenter.isConnected) {
      const cr = currentCenter.getBoundingClientRect();
      curDist = Math.abs((cr.left + cr.width / 2) - vpCenterX);
    }

    let best = null, bestDist = Infinity;
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      const d = Math.abs((r.left + r.width / 2) - vpCenterX);
      if (d < bestDist) { best = card; bestDist = d; }
    });

    if (best && (best !== currentCenter) && (bestDist + CENTER_HYST < curDist)) {
      cards.forEach(c => c.classList.remove('is-center'));
      best.classList.add('is-center');
      currentCenter = best;
    }
  }

  // 가로 스크롤 변화시에만 동작 (세로 스크롤로 인한 깜빡임 차단)
  container.addEventListener('scroll', () => {
    const left = container.scrollLeft;
    if (left !== lastLeft) {
      lastLeft = left;
      updateCenteredCard();
      checkEnds();
    }
  }, { passive: true });

  /* ---------- 폭(width) 변화에만 반응하도록 처리 ---------- */
  let lastVW = document.documentElement.clientWidth;
  let lastCW = container.clientWidth;

  function onWidthChangeOnly(cb) {
    return () => {
      const vw = document.documentElement.clientWidth;
      const cw = container.clientWidth;
      // 폭이 실제로 바뀐 경우에만 실행(주소창 높이변화 등은 무시)
      if (Math.abs(vw - lastVW) > 1 || Math.abs(cw - lastCW) > 1) {
        lastVW = vw; lastCW = cw;
        requestAnimationFrame(cb);
      }
    };
  }

  // 폭 변경(가로 회전 등)일 때만 재계산/재중앙
  window.addEventListener('resize', onWidthChangeOnly(() => {
    updateCenteredCard();
    checkEnds();
    recenterToNearest();
  }), { passive: true });

  // iOS에서 visualViewport 높이 요동은 무시, 폭 변화에만 반응
  if (window.visualViewport) {
    let lastVVW = window.visualViewport.width;
    window.visualViewport.addEventListener('resize', () => {
      const w = window.visualViewport.width;
      if (Math.abs(w - lastVVW) > 1) {
        lastVVW = w;
        requestAnimationFrame(() => {
          updateCenteredCard();
          checkEnds();
          recenterToNearest();
        });
      }
    }, { passive: true });
  }

  // 명시적으로 방향 전환 시 살짝 늦춰 재중앙
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      updateCenteredCard();
      checkEnds();
      recenterToNearest();
    }, 120);
  }, { passive: true });

  /* ---------- 리소스 로드 후 미세 재중앙 ---------- */
  function recenterToNearest() {
    const cards = track.querySelectorAll('.workThumbnail');
    if (!cards.length) return;
    const vpLeft = container.getBoundingClientRect().left;
    const vpCenter = vpLeft + container.clientWidth / 2;
    let best = null, bestDelta = Infinity;
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const d = Math.abs(cx - vpCenter);
      if (d < bestDelta) { bestDelta = d; best = card; }
    });
    if (!best) return;
    const target = best.offsetLeft - (container.clientWidth - best.offsetWidth) / 2;
    container.classList.add('snap-off');
    requestAnimationFrame(() => {
      container.scrollLeft = Math.round(target);
      updateCenteredCard();
      requestAnimationFrame(() => container.classList.remove('snap-off'));
    });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => requestAnimationFrame(recenterToNearest));
  }
  Array.from(track.querySelectorAll('img')).forEach(img => {
    if (!img.complete) img.addEventListener('load', () => requestAnimationFrame(recenterToNearest), { once: true });
  });

  /* ---------- 클릭 네비: 중앙 카드일 때만 ---------- */
  /* 모바일 전용: 카드 한 번 탭 → 즉시 링크로 이동 */
  (() => {
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches
      || window.matchMedia('(max-width: 1024px)').matches;
    if (!isMobile) return;

    const track =
      document.querySelector('#workPreviewScroll .scroll-track') ||
      document.getElementById('workPreviewScroll');
    if (!track) return;

    const TAP_SLOP = 10;   // 손가락 흔들림 허용 오차(px)
    const TAP_TIME = 350;  // 탭으로 인정할 최대 시간(ms)
    let sx = 0, sy = 0, st = 0, moved = false;

    track.addEventListener('touchstart', (e) => {
      const t = e.targetTouches[0] || e.changedTouches[0];
      sx = t.clientX; sy = t.clientY; st = Date.now(); moved = false;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      const t = e.targetTouches[0] || e.changedTouches[0];
      if (Math.abs(t.clientX - sx) > TAP_SLOP || Math.abs(t.clientY - sy) > TAP_SLOP) moved = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const dt = Date.now() - st;
      if (moved || dt > TAP_TIME) return;

      const card = e.target.closest('.workThumbnail');
      if (!card) return;

      // 중앙 카드일 때만 이동하려면 아래 한 줄 주석 해제
      // if (!card.classList.contains('is-center')) return;

      const link = card.dataset.link;
      if (!link) return;

      if (e.cancelable) e.preventDefault(); // 유령 click 방지
      window.location.href = link;          // ✅ 한 번 탭으로 즉시 이동
    }, { passive: false });
  })();

  /* ---------- 보이는 카드만 video play/pause ---------- */
  const ioPlay = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const v = e.target.querySelector('video'); if (!v) return;
      if (e.isIntersecting) v.play?.().catch(() => { });
      else v.pause?.();
    });
  }, { root: container, threshold: 0.5 });
  track.querySelectorAll('.workThumbnail').forEach(el => ioPlay.observe(el));

  /* ---------- 컨테이너 리빌: 1회만(opacity만 변경) ---------- */
  (function revealOnce() {
    container.classList.add('reveal-hidden');
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        container.classList.remove('reveal-hidden');
        container.classList.add('reveal-in');
        io.disconnect();
      }
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    io.observe(container);
  })();

  /* ---------- Section2: 원 슬라이드 + 텍스트 페이드 ---------- */

  // Circle + Text 등장 트리거(마커 + 스크롤 폴백)
  (function () {
    const circle = document.getElementById('circleForS3');
    const texts = document.querySelectorAll('#s3text, #viewAllProjects');
    if (!circle || !texts.length) return;

    // 섹션 추적: circle의 가장 가까운 섹션/컨테이너
    const section =
      circle.closest('#s2, #section2, section') ||
      document.getElementById('s2') ||
      document.getElementById('section2') ||
      circle.parentElement;

    if (!section) return;

    // 섹션 position 보장(마커 absolute 배치를 위해)
    const secPos = getComputedStyle(section).position;
    if (secPos === 'static') section.style.position = 'relative';

    // ★ 트리거 위치(뷰포트 기준): 섹션 상단에서 25vh 지점이 화면에 닿으면 show
    const SHOW_VH = 95; // 더 일찍 뜨게 하려면 숫자 ↓(예: 10), 늦게 하려면 ↑(예: 40)

    // 숨김/보임 구현(클래스 토글만)
    const show = () => {
      circle.classList.add('circle-in');
      circle.classList.remove('circle-out');
      texts.forEach(el => el.classList.add('visible'));
    };
    const hide = () => {
      circle.classList.remove('circle-in');
      circle.classList.add('circle-out');
      texts.forEach(el => el.classList.remove('visible'));
    };

    // 초기 상태(아래대기/숨김)
    hide();

    // 섹션 안에 보이지 않는 마커 생성(관찰 대상)
    let marker = section.querySelector('#s3-trigger');
    if (!marker) {
      marker = document.createElement('div');
      marker.id = 's3-trigger';
      marker.setAttribute('aria-hidden', 'true');
      marker.style.cssText = [
        'position:absolute',
        'left:0', 'right:0',
        `top:${SHOW_VH}vh`,  // 뷰포트 기준 오프셋
        'height:1px',
        'pointer-events:none',
        'opacity:0'
      ].join(';');
      section.appendChild(marker);
    }

    // IntersectionObserver: 마커가 화면에 들어오면 등장, 벗어나면 숨김
    const io = new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? show() : hide();
    }, {
      root: null,
      threshold: 0,         // 한 픽셀만 닿아도 트리거
      rootMargin: '0px'     // 오프셋은 마커의 top에서 조절
    });
    io.observe(marker);

    // ------- 폴백(언제나 동작 보장) -------
    let ticking = false;
    function fallbackCheck() {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // 섹션 상단에서 SHOW_VH 만큼 내려온 지점의 화면 좌표
      const triggerY = r.top + (vh * (SHOW_VH / 100));

      // 그 지점이 화면 내부에 있고 섹션이 보이는 중이면 show, 아니면 hide
      const inView = (triggerY < vh) && (r.bottom > 0);
      inView ? show() : hide();

      ticking = false;
    }

    const onScrollResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(fallbackCheck);
      }
    };

    window.addEventListener('scroll', onScrollResize, { passive: true });
    window.addEventListener('resize', onScrollResize, { passive: true });
    requestAnimationFrame(fallbackCheck); // 초기 1회 강제 체크
  })();


  /* ---------- 모바일: <br> 제거 ---------- */
  (function removeBrOnMobile() {
    document.querySelectorAll('br').forEach(br => br.remove());
  })();

})();




window.addEventListener('scroll', () => {
  const text = document.querySelector('#section12 .floating-text');
  const rect = text.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 글자 중심 Y값
  const textCenter = rect.top + rect.height / 1.8;

  // 화면 중앙 위치
  const midScreen = windowHeight / 1.8;

  if (textCenter >= midScreen) {
    text.style.opacity = 1; // 중앙 아래에서는 완전 보임
  } else {
    // 중앙보다 위로 올라갈수록 1→0 으로 서서히 줄어듦
    const distance = midScreen - textCenter;
    const fadeRange = 120; // 150px 범위 동안 점점 사라짐
    let opacity = 1 - distance / fadeRange;
    if (opacity < 0) opacity = 0;
    text.style.opacity = opacity;
  }
});










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

  // 트랙(있으면 그걸 쓰고, 없으면 컨테이너 자체)
  const track = container.querySelector('.scroll-track') || container;

  // 초기 상태: 숨김 쪽으로
  track.classList.remove('set-in');

  // 세트(컨테이너)가 뷰포트에 10% 이상 보이면 set-in, 아니면 제거
  const io = new IntersectionObserver(([entry]) => {
    const show = entry.isIntersecting && entry.intersectionRatio >= 0.10;
    track.classList.toggle('set-in', show);
  }, {
    root: null,                  // 화면 기준
    threshold: [0, 0.40, 0.41, 1]// 10% 경계에서 토글
  });

  io.observe(container);

  // 첫 로드 즉시 1회 강제 체크(브라우저 IO 타이밍 편차 대비)
  requestAnimationFrame(() => {
    const r = container.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    const ratio = visible / Math.min(vh, Math.max(1, r.height));
    track.classList.toggle('set-in', ratio >= 0.10);
  });
})();








(() => {
  // 태블릿 세로에서만 동작
  const mq = '(hover: none) and (pointer: coarse) and (min-width: 768px) and (orientation: portrait)';
  if (!window.matchMedia(mq).matches) return;

  const container = document.getElementById('workPreviewScroll');
  if (!container) return;

  // 대상: 트랙이 있으면 트랙, 없으면 컨테이너 자체
  const target = container.querySelector('.scroll-track') || container;

  // 초기 상태: 아래 대기(불투명 0)
  target.classList.add('tp-reveal');

  // 10% 이상 보이면 인, 미만이면 아웃
  const io = new IntersectionObserver(([entry]) => {
    const show = entry.isIntersecting && entry.intersectionRatio >= 0.50;
    target.classList.toggle('is-in', show);
  }, {
    root: null,
    threshold: [0, 0.50, 0.51, 1]
  });
  io.observe(container);

  // iOS Safari 폴백(스크롤/리사이즈 때 수동 계산)
  let ticking = false;
  const fallback = () => {
    const r  = container.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    const ratio   = visible / Math.min(vh, Math.max(1, r.height));
    target.classList.toggle('is-in', ratio >= 0.50);
    ticking = false;
  };
  const onSR = () => { if (!ticking) { ticking = true; requestAnimationFrame(fallback); } };

  window.addEventListener('scroll', onSR,  { passive: true });
  window.addEventListener('resize', onSR,  { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(fallback, 120), { passive: true });

  // 첫 로드 강제 1회 체크
  requestAnimationFrame(fallback);
})();

