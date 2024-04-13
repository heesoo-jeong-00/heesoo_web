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
    case 'topcontainer':
      if (stage === 'topcontainer') return;
      scale = 1;
      stage = 'topcontainer';
      console.log('topcontainer');
      break;

    case 'top1':
    case 'top2':
    case 'top3':
      scale = 2;
      stage = e.target.getAttribute('data-cursor');
      console.log(stage);
      break;

    case 'main1':
    case 'main2':
    case 'main3':
      scale = 1;
      stage = e.target.getAttribute('data-cursor');
      console.log(stage);
      break;

    case 'bottomItem1':
    case 'bottomItem2':
    case 'bottomItem3':
      scale = 2;
      stage = e.target.getAttribute('data-cursor');
      console.log(stage);
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

// 애니메이션 추가
// HTML 요소에 대한 참조 변수를 설정
const headerBox = document.getElementById('headerBox');
const topBoxes = document.getElementById('topBoxes');
const topBox = document.querySelectorAll('.topBox');
const logo = document.getElementById('logo');




// 비디오 요소들을 배열에 담음
const videos = [
  document.getElementById('video1'),
  document.getElementById('video2'),
  document.getElementById('video3'),
  document.getElementById('video4'),
  document.getElementById('video5'),
  document.getElementById('video6'),
  document.getElementById('video7'),
  document.getElementById('video8')
];

// 각 비디오에 대한 초기 설정 및 특정 비디오에 loop 설정
videos.forEach(video => {
  video.style.opacity = 0; // 초기 투명도를 0으로 설정
  const videoId = video.getAttribute('id');
  if (videoId === 'video3' || videoId === 'video4' || videoId === 'video5' || videoId === 'video6' || videoId === 'video7') {
    video.loop = true;  // loop 속성 추가
  }
});

// 비디오 반복 재생 설정 함수
function setupVideoRepeat(video, repeatStartTime, intervalCheck = 500) {
  video.addEventListener('play', function setupRepeat() {
    const checkInterval = setInterval(() => {
      if (video.currentTime >= video.duration - 0.5) {
        video.currentTime = repeatStartTime;
        video.play().catch(e => console.error(`Error replaying video ${video.id}:`, e));
      }
    }, intervalCheck);
    video.addEventListener('pause', () => clearInterval(checkInterval));
    video.addEventListener('ended', () => clearInterval(checkInterval));
  });
}

// 비디오 5, 6, 7에 대한 반복 재생 설정 적용
setupVideoRepeat(document.getElementById('video5'), 2);
setupVideoRepeat(document.getElementById('video6'), 3);
setupVideoRepeat(document.getElementById('video7'), 1.78);

let lastScrollTop = 0; // 마지막 스크롤 위치 저장
let lastDirection = ''; // 마지막 스크롤 방향 저장

// Intersection Observer 생성
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;
    const isScrollingDown = lastDirection === 'down';

    if (entry.isIntersecting) { // 비디오가 화면에 보이는 경우
      video.style.opacity = 1; // 투명도를 1로 설정
      if (isScrollingDown) {
        video.currentTime = 0;
      }
      video.play();
    } else { // 비디오가 화면에서 벗어날 때
      if (!isScrollingDown) { // 스크롤 업일 때만 투명도를 0으로 설정
        video.style.opacity = 0;
        video.pause();
      }
    }
  });
}, { threshold: 0.5 });

// 각 비디오 요소를 관찰 대상으로 추가
videos.forEach(video => {
  observer.observe(video);
});

// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', function () {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScrollTop) {
    lastDirection = 'down';
  } else {
    lastDirection = 'up';
  }
  lastScrollTop = currentScroll;
});

// 배속 조정 설정
videos.forEach(video => {
  video.playbackRate = 1.5; // 모든 비디오의 재생 속도를 1.5배로 설정
});
