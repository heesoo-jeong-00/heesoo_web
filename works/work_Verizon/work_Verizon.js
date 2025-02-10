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




// 비디오와 텍스트 요소를 배열에 저장
const videos = [
  document.getElementById('video1'),
  document.getElementById('video2'),
  document.getElementById('video3'),
  document.getElementById('video4'),
  document.getElementById('video5')
];

const texts = document.querySelectorAll('.content2'); // 👈 모든 <p class="content2"> 요소 선택


// 각 비디오에 대한 초기 설정 및 특정 비디오에 loop 설정
videos.forEach(video => {
  video.style.opacity = 0; // 초기 투명도를 0으로 설정
  const videoId = video.getAttribute('id');
  if (videoId === 'video1' ||videoId === 'video4' ) {
    video.loop = true;  // loop 속성 추가
  }
});



// // 비디오 반복 재생 설정 함수 수정

function setupVideoRepeat(video, repeatStartTime) {
  let initialSetupDone = false; // 초기 설정 완료 여부 플래그

  // 비디오 메타데이터가 로드되었을 때 초기 설정 실행
  video.onloadedmetadata = function () {
    if (!initialSetupDone) {
      video.currentTime = repeatStartTime;  // 최초 로딩 시, 반복 시작 지점으로 이동
      initialSetupDone = true;
    }
  };

  // 비디오가 지정된 시간을 넘어서면 지정된 시작 지점으로 돌아가도록 설정
  video.addEventListener('timeupdate', function () {
    if (video.currentTime >= video.duration - 0.5) {
      video.currentTime = repeatStartTime;
      video.play().catch(e => console.error(`Error replaying video ${video.id}:`, e));
    }
  });
}

// 비디오 요소에 대한 반복 설정 코드
setupVideoRepeat(document.getElementById('video1'), 2.8);
// setupVideoRepeat(document.getElementById('video2'),2.0);
// setupVideoRepeat(document.getElementById('video6'), 4.3);
// setupVideoRepeat(document.getElementById('video7'), 4.7);





let lastScrollTop = 0; // 마지막 스크롤 위치 저장
let lastDirection = ''; // 마지막 스크롤 방향 저장

// 요소 확인을 위한 로그 출력
console.log("Videos:", videos);
console.log("Texts:", texts);

// 🎥 비디오 감지 (threshold: 0.2)
const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { 
      entry.target.style.opacity = 1;
      entry.target.currentTime = 0;
      entry.target.play();
    } else { 
      entry.target.style.opacity = 0;
      entry.target.pause();
    }
  });
}, { threshold: 0.2 }); // 👈 비디오 감지 기준 20%

// 📝 텍스트 감지 (threshold: 1.0)
const textObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { 
      entry.target.style.opacity = 1;
    } else { 
      entry.target.style.opacity = 0;
    }
  });
}, { threshold: 1.0 }); // 👈 텍스트 감지 기준 100%

// ✅ 각 비디오 요소에 비디오 감지 적용
videos.forEach(video => {
  video.style.opacity = 0; // 초기 투명도 설정
  videoObserver.observe(video);
});

// ✅ 각 텍스트 요소에 텍스트 감지 적용
texts.forEach(text => {
  text.style.opacity = 0; // 초기 투명도 설정
  text.style.transition = 'opacity 0.5s ease-in-out'; // 부드러운 효과 추가
  textObserver.observe(text);
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

const video1 = document.getElementById('video1');

video1.addEventListener('timeupdate', function () {
  if (video1.currentTime >= 0 && video1.currentTime < 0.5) {
    video1.playbackRate = 5.0; // 0~1초: 3배 속도
  } else if (video1.currentTime >= 0.5 && video1.currentTime < 2) {
    video1.playbackRate = 1.2; // 1~1.5초: 1배 속도
  } else if (video1.currentTime >= 2 && video1.currentTime < 2.7) {
    video1.playbackRate = 5.0; // 1.5~3초: 3배 속도
  } else {
    video1.playbackRate = 1.2; // 이후: 1배 속도
  }
});



// 배속 조정 설정
videos.forEach(video => {
  if (video.getAttribute('id') === 'video1') {
    video.playbackRate = 1.26;
  } else if (video.getAttribute('id') === 'video2') {
    video.playbackRate = 0.6;
  } else if (video.getAttribute('id') === 'video6') {
    video.playbackRate = 1.8;
  } else if (video.getAttribute('id') === 'video7') {
    video.playbackRate = 1.75;
  }
  else if (video.getAttribute('id') === 'video4') {
    video.playbackRate = 1.2;
  }

  else {
    video.playbackRate = 1.5;
  }
});




window.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('detail');
  const v2 = document.getElementById('v2');
  const v3 = document.getElementById('v3');

  function moveButtonForMobile() {
    if (window.innerWidth <= 767) {
      // 현재 위치에서 버튼을 제거하고 v2의 자식으로 추가
      v2.appendChild(button);
    } else {
      // v3의 첫 번째 자식으로 버튼을 추가 (맨 앞에 추가)
      v3.insertBefore(button, v3.firstChild);
    }
  }

  // 페이지 로드시 한 번 호출
  moveButtonForMobile();

  // 윈도우 사이즈가 변경될 때마다 호출
  window.addEventListener('resize', moveButtonForMobile);
});


// 원래 <br> 태그의 위치를 저장하는 배열
let storedBrs = [];

function removeBrOnMobile() {
  if (window.innerWidth <= 767) {
    document.querySelectorAll('br').forEach((br, index) => {
      // <br>의 부모와 다음 요소를 저장
      storedBrs.push({ parent: br.parentNode, nextSibling: br.nextSibling });
      br.remove();
    });
  } else {
    restoreBrOnDesktop();
  }
}

function restoreBrOnDesktop() {
  if (storedBrs.length > 0) {
    storedBrs.forEach(({ parent, nextSibling }) => {
      if (parent) {
        const newBr = document.createElement('br');
        if (nextSibling) {
          parent.insertBefore(newBr, nextSibling);
        } else {
          parent.appendChild(newBr);
        }
      }
    });
    // 저장된 배열 초기화 (중복 추가 방지)
    storedBrs = [];
  }
}

// ✅ 페이지 로드 시 한 번 실행
window.addEventListener('DOMContentLoaded', removeBrOnMobile);

// ✅ 화면 크기 변경될 때 다시 확인
window.addEventListener('resize', removeBrOnMobile);




