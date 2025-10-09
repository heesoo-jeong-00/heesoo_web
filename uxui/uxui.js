// ===== Custom cursor =====
// const cursorParent = document.getElementById('mouse-cursor');
// const cursorChild = cursorParent.children[0];
// window.addEventListener('mousemove', mousemove);
// window.addEventListener('mousedown', mousedown);
// window.addEventListener('mouseup', mouseup);

// let scale = 1;
// let cursorX = 0, cursorY = 0;
// let stage = '';

// function mousemove(e) {
//   cursorX = e.pageX - cursorParent.offsetWidth / 2;
//   cursorY = e.pageY - cursorParent.offsetHeight / 2;
//   cursorParent.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

//   switch (e.target.getAttribute('data-cursor')) {
//     case 'topcontainer':
//     case 'main1':
//       if (stage === 'main1') break;
//       scale = 1; stage = 'main1'; break;
//     case 'top1':
//     case 'top2':
//     case 'top3':
//     case 'bottomItem1':
//     case 'bottomItem2':
//     case 'bottomItem3':
//       if (stage === e.target.getAttribute('data-cursor')) break;
//       scale = 2; stage = e.target.getAttribute('data-cursor'); break;
//   }
//   cursorChild.style.setProperty('--cursor-scale', scale);
// }

// function mousedown() {
//   scale *= 0.75;
//   cursorChild.style.setProperty('--cursor-scale', scale);
// }
// function mouseup() {
//   scale *= 1.25;
//   cursorChild.style.setProperty('--cursor-scale', scale);
// }

//애니메이션 추가

// HTML 요소에 대한 참조 변수를 설정
const headerBox = document.getElementById('headerBox');
const topBoxes = document.getElementById('topBoxes');
const topBox = document.querySelectorAll('.topBox');
const topBox2 = document.getElementById('topBox2');       // ✅ 추가: topBox3 참조
const logo = document.getElementById('logo');

// ✅ 추가: 축소 상태에서 네비게이션 링크 클릭 막기/허용 함수
const topLinks = document.querySelectorAll('#topBoxes a');
function setNavClickable(enabled) {
  topLinks.forEach(a => (a.style.pointerEvents = enabled ? 'auto' : 'none'));
}

// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', function () {
  // 스크롤 위치가 50px 이상이고, headerBox가 확대된 상태가 아닐 경우
  if (window.scrollY > 50) {
    // 확대된 상태가 아니면 축소 스타일 적용
    if (!headerBox.dataset.isExpanded) {
      headerBox.classList.add('scrolled');
      topBoxes.classList.add('scrolled');
      topBox.forEach(box => box.classList.add('scrolled'));
      // ✅ Creative만 다시 보이게
      topBox2?.classList.remove('scrolled');
      // ✅ 로고 숨김 + 네비 클릭 막기
      logo.style.display = 'none';
      logo.style.pointerEvents = 'none';
      setNavClickable(false); // ← 중요: 링크 비활성화(첫 탭은 헤더가 받도록)
    }
  } else {
    // 스크롤 위치가 50px 이하인 경우, 모든 스타일을 제거하고, 확대 상태로 설정
    headerBox.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
    // ✅ 로고/네비 다시 활성화
    logo.style.display = '';
    logo.style.pointerEvents = 'auto';
    setNavClickable(true); // ← 링크 다시 활성화
    headerBox.dataset.isExpanded = 'true';
  }
});

// 클릭 이벤트 리스너 추가
headerBox.addEventListener('click', function (e) {
  // headerBox가 이미 축소된 상태인 경우: 먼저 펼치기(링크 이동 금지)
  if (this.classList.contains('scrolled')) {
    e.preventDefault();
    this.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
    // ✅ 로고/네비 다시 활성화
    logo.style.display = '';
    logo.style.pointerEvents = 'auto';
    setNavClickable(true); // ← 링크 다시 활성화
    headerBox.dataset.isExpanded = 'true';
  }
});

// 스크롤 이벤트에서 확대된 상태를 해제하고 다시 축소되도록 처리
window.addEventListener('scroll', function () {
  if (window.scrollY > 50 && headerBox.dataset.isExpanded === 'true') {
    headerBox.classList.add('scrolled');
    topBoxes.classList.add('scrolled');
    topBox.forEach(box => box.classList.add('scrolled'));
    // ✅ Creative만 다시 보이게
    topBox2?.classList.remove('scrolled');
    // ✅ 로고 숨김 + 네비 클릭 막기
    logo.style.display = 'none';
    logo.style.pointerEvents = 'none';
    setNavClickable(false); // ← 링크 비활성화
    headerBox.dataset.isExpanded = 'false';
  }
});





// ===== Fade-in for boxes =====
document.addEventListener('DOMContentLoaded', function () {
  const boxes = document.querySelectorAll('.boxes');
  boxes.forEach(el => { el.style.opacity = 1; });
});

// ===== Click routing (데스크톱은 blackbox, 모바일은 카드 전체) =====
function bindCardRoute(boxId, blackId, href) {
  const box = document.getElementById(boxId);
  const black = document.getElementById(blackId);
  const go = () => { window.location.href = href; };

  if (window.innerWidth > 1024) {
    black && black.addEventListener('click', go);
  } else {
    box && box.addEventListener('click', go);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  bindCardRoute('box15', 'blackbox15', '../works/work_Verizon/work_Verizon.html');
  bindCardRoute('box16', 'blackbox16', '../works/work_BooksComeAlive/work_BooksComeAlive.html');
  bindCardRoute('box17', 'blackbox17', '../works/work_Podscribe/work_Podscribe.html');
  bindCardRoute('box2', 'blackbox2', '../works/work_With/work_With.html');
  bindCardRoute('box3', 'blackbox3', '../works/work_Nebula/work_Nebula.html');
  bindCardRoute('box11', 'blackbox11', '../works/work_TypePlay/work_TypePlay.html');
  bindCardRoute('box18', 'blackbox18', '../works/work_clock/work_clock.html');
  bindCardRoute('box13', 'blackbox13', '../works/work_Heesoo/work_Heesoo.html');
  bindCardRoute('box14', 'blackbox14', '../works/work_KineticPose/work_KineticPose.html');

  // 비디오 배속 (원래 설정 유지)
  const v15 = document.getElementById('video_box15');
  const v16 = document.getElementById('video_box16');
  if (v15) v15.playbackRate = 1.4;
  if (v16) v16.playbackRate = 1.4;
});

// ===== <br> 제거/복원 (모바일 가독성) =====
let storedBrs = [];
function removeBrOnMobile() {
  if (window.innerWidth <= 767) {
    document.querySelectorAll('br').forEach(br => {
      storedBrs.push({ parent: br.parentNode, nextSibling: br.nextSibling });
      br.remove();
    });
  } else {
    restoreBrOnDesktop();
  }
}
function restoreBrOnDesktop() {
  if (!storedBrs.length) return;
  storedBrs.forEach(({ parent, nextSibling }) => {
    if (!parent) return;
    const br = document.createElement('br');
    nextSibling ? parent.insertBefore(br, nextSibling) : parent.appendChild(br);
  });
  storedBrs = [];
}
window.addEventListener('DOMContentLoaded', removeBrOnMobile);
window.addEventListener('resize', removeBrOnMobile);
