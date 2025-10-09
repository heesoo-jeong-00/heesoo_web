// mobile-bridge.js
(() => {
  const isMobile =
    window.matchMedia('(hover: none) and (pointer: coarse)').matches
    || window.matchMedia('(max-width: 1024px)').matches;
  if (!isMobile) return;

  const root = document.getElementById('workPreviewScroll');
  if (!root) return;

  // 새 구조: root.carousel > .carousel-edge + .carousel-viewport > .carousel-track > .workThumbnail...
  const viewport = root.querySelector('.carousel-viewport');
  const track    = root.querySelector('.carousel-track');

  // 이미 예전 구조면 버튼/클래스만 정리하고 종료
  if (!viewport || !track) {
    root.classList.remove('carousel');
    root.querySelectorAll('.carousel-edge').forEach(b => b.remove());
    // 모바일 스크립트가 자체로 .scroll-track 만들 수 있도록 나머지는 그대로 둠
  } else {
    // 1) 카드들을 root의 직계로 이동
    const cards = Array.from(track.querySelectorAll('.workThumbnail'));
    cards.forEach(card => root.appendChild(card));

    // 2) 래퍼/버튼 제거
    root.querySelectorAll('.carousel-edge').forEach(b => b.remove());
    viewport.remove(); // 내부 track도 함께 제거됨
    root.classList.remove('carousel');
  }

  // 3) 모바일 스크립트가 기대하는 최소 스타일 힌트
  //    (스크롤은 script-mobile.js가 관리하지만 안전하게 켜둠)
  root.style.overflowX = 'hidden';
  root.style.overflowY = 'visible';

  // 4) 비디오 lazy-src 보정 (중복 안전)
  root.querySelectorAll('video').forEach(v => {
    const ds = v.getAttribute('data-src') || v.closest('.workThumbnail')?.getAttribute('data-src');
    if (!v.getAttribute('src') && ds) v.setAttribute('src', ds);
    v.muted = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    if (!v.getAttribute('preload')) v.setAttribute('preload', 'metadata');
  });

  // 5) 혹시 남아있을 수 있는 데스크톱 전용 클래스/속성 정리
  root.querySelectorAll('.workThumbnail').forEach(card => {
    card.classList.remove('is-active'); // 데스크톱 용 활성표시
  });
})();
