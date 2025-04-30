// (1) 커서 관련
const cursorParent = document.getElementById('mouse-cursor');
const cursorChild = cursorParent.children[0];
window.addEventListener('mousemove', mousemove);
window.addEventListener('mousedown', mousedown);
window.addEventListener('mouseup', mouseup);

let scale = 1;
let cursorX = 0, cursorY = 0;
let stage = '';

function mousemove(e) {
  cursorX = e.pageX - cursorParent.offsetWidth / 2;
  cursorY = e.pageY - cursorParent.offsetHeight / 2;
  cursorParent.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

  switch (e.target.getAttribute('data-cursor')) {
    case 'topcontainer': if (stage !== 'topcontainer') { scale = 1; stage = 'topcontainer'; } break;
    case 'top1': case 'top2': case 'top3':
    case 'pro1': case 'pro2': case 'pro3': case 'pro4':
    case 'bottomItem1': case 'bottomItem2': case 'bottomItem3':
      if (stage !== e.target.getAttribute('data-cursor')) { scale = 2; stage = e.target.getAttribute('data-cursor'); }
      break;
    case 'main1': case 'main2': case 'detail':
      if (stage !== e.target.getAttribute('data-cursor')) { scale = 1; stage = e.target.getAttribute('data-cursor'); }
      break;
  }

  cursorChild.style.setProperty('--cursor-scale', scale);
}

function mousedown() {
  scale *= 0.75;
  cursorChild.style.setProperty('--cursor-scale', scale);
}

function mouseup() {
  scale *= 1.25;
  cursorChild.style.setProperty('--cursor-scale', scale);
}

// (2) 서클 관련 scale 조정
document.getElementById('circleForS3').addEventListener('mouseover', () => {
  scale = 1;
});
document.getElementById('viewAllProjects').addEventListener('mouseover', (event) => {
  scale = 2;
  event.stopPropagation();
});

// (3) 헤더 축소/확대
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

// (4) IntersectionObserver (❗스크롤 이벤트 밖으로 빼줬다!)
const circleForS3 = document.getElementById('circleForS3');
const elementsToShow = document.querySelectorAll('#s3text, #viewAllProjects');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      circleForS3.style.opacity = '1';
      circleForS3.style.transform = 'translateX(-50%) translateY(0)';
      elementsToShow.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translate(-50%, 0)';
      });
    } else {
      circleForS3.style.opacity = '0';
      circleForS3.style.transform = 'translateX(-50%) translateY(30px)';
      elementsToShow.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translate(-50%, 30px)';
      });
    }
  });
}, { threshold: 0.2 });

observer.observe(document.getElementById('section2'));

// (5) 모바일 br 제거
function removeBrOnMobile() {
  if (window.innerWidth <= 767) {
    document.querySelectorAll('br').forEach(br => br.remove());
  }
}
window.addEventListener('DOMContentLoaded', removeBrOnMobile);
window.addEventListener('resize', removeBrOnMobile);

// (6) 지구 회전
const earth = document.getElementById('earth');
let rotation = 0;
let baseSpeed = 0.005;
let scrollSpeed = 0;

function animateEarth() {
  rotation += baseSpeed + scrollSpeed;
  earth.style.transform = `translateX(-50%) rotate(${rotation}rad)`;
  scrollSpeed *= 0.5; // 감속 (자연스럽게)
  requestAnimationFrame(animateEarth);
}

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  const delta = currentScroll - lastScrollY;

  if (delta > 0) {
    // ✅ 스크롤 내릴 때 (시계 방향)
    scrollSpeed += 0.002 * delta;
  } else {
    // ✅ 스크롤 올릴 때 (시계 반대 방향)
    scrollSpeed += 0.002 * delta; // delta는 음수 → 반대 방향
  }

  lastScrollY = currentScroll;
});

animateEarth();



// (1) 프로젝트 서클 - 카드, 텍스트 연결
const container = document.getElementById('circleContainer');
const cards = container.querySelectorAll('.circleCard');
const titleEl = document.getElementById('projectTitle');
const subtitleEl = document.getElementById('projectSubtitle');
const projectCircle = document.getElementById('projectCircle');
let activeIndex = 0;

// ✅ 텍스트를 디졸브로 전환하는 함수
const fadeOutInText = (title, subtitle) => {
  titleEl.style.opacity = '0';
  subtitleEl.style.opacity = '0';

  setTimeout(() => {
    titleEl.textContent = title;
    subtitleEl.textContent = subtitle;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        titleEl.style.opacity = '1';
        subtitleEl.style.opacity = '1';
      });
    });
  }, 400); // transition-duration 맞춰서
};

// ✅ 카드 위치 업데이트 함수
const updatePositions = () => {
  const total = cards.length;
  
  // ✅ 화면 너비 기준으로 radius 결정
  const radius = window.innerWidth <= 1200 ? 500 : 700;

  const centerAngle = Math.PI / 2; // 12시 방향 기준

  cards.forEach((card, i) => {
    const angle = centerAngle + (2 * Math.PI * (i - activeIndex)) / total;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    card.style.transform = `translate(calc(-50% + ${x}px), calc(-50% - ${y}px)) scale(${i === activeIndex ? 1.4 : 1})`;
    card.style.opacity = (Math.abs(i - activeIndex) <= 2 || Math.abs(i - activeIndex) >= total - 2) ? 1 : 0.3;
    card.style.zIndex = i === activeIndex ? 10 : 5;
  });

  const activeCard = cards[activeIndex];
  fadeOutInText(activeCard.dataset.title || '', activeCard.dataset.subtitle || '');
};

// ✅ 카드 클릭 이벤트 등록
cards.forEach((card, i) => {
  card.addEventListener('click', () => {
    if (i === activeIndex) {
      // 클릭한 카드가 중앙(12시 방향) 카드면 링크로 이동
      const link = card.dataset.link;
      if (link) {
        window.open(link, '_self'); // 새 창에서 열고 싶으면 '_blank', 같은 창이면 '_self'
      }
    } else {
      // 중앙 카드가 아니면 중앙으로 회전만
      activeIndex = i;
      updatePositions();
    }
  });
});


// ✅ 초기 위치 설정
updatePositions();

// (2) 프로젝트 섹션 배경색 스크롤 트리거
const bgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
      projectCircle.classList.remove('bg-active');
    } else {
      projectCircle.classList.add('bg-active');
    }
  });
}, {
  threshold: 0,
  rootMargin: '0px'
});

bgObserver.observe(projectCircle);






const eyes = document.querySelectorAll('.eye');

document.addEventListener('mousemove', (e) => {
  eyes.forEach(eye => {
    const pupil = eye.querySelector('.pupil');
    const rect = eye.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx);

    const maxDistance = 15; // 눈동자가 움직일 최대 거리
    const x = Math.cos(angle) * maxDistance;
    const y = Math.sin(angle) * maxDistance;

    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });
});


window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});
window.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  window.history.scrollRestoration = 'manual';
});
