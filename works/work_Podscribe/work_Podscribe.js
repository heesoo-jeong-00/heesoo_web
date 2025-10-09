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




function updateVideoSource() {
  const videoElement = document.getElementById('video0');
  const sourceElement = videoElement.querySelector('source');
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const isTabletPortrait = window.matchMedia(
    "(min-device-width: 768px) and (max-device-width: 1200px) and (orientation: portrait)"
  ).matches;

  let newSrc;

  if (isMobile) {
    newSrc = "../../files/podscribe/podscribe_1_mobile.mp4";
  } else if (isTabletPortrait) {
    newSrc = "../../files/podscribe/podscribe_1_mobile.mp4";
  } else {
    newSrc = "../../files/podscribe/podscribe_1.mp4";
  }

  // 기존 src 값과 비교 후, 다를 경우에만 변경
  if (sourceElement.getAttribute("src") !== newSrc) {
    const currentTime = videoElement.currentTime; // 현재 재생 시간 저장
    const isPlaying = !videoElement.paused && !videoElement.ended; // 재생 여부 확인

    sourceElement.setAttribute("src", newSrc);

    // `video.load()`를 최소화하고, 원래 재생 상태를 유지
    videoElement.oncanplaythrough = () => {
      videoElement.currentTime = currentTime; // 기존 재생 시간 유지
      if (isPlaying) {
        videoElement.play(); // 기존 상태가 재생 중이면 다시 재생
      }
    };

    videoElement.load(); // 실제로 비디오 소스를 변경하는 최소한의 호출
  }
}

// 초기 로딩 시 한 번 실행
updateVideoSource();

// resize 이벤트에 debounce 적용하여 불필요한 호출 방지
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateVideoSource, 300);
});


// 비디오와 텍스트 요소를 배열에 저장
const videos = [
  document.getElementById('video0'),
  document.getElementById('video1'),
  document.getElementById('video2'),
  document.getElementById('video3'),
  document.getElementById('video4'),
  document.getElementById('video5'),
  document.getElementById('video6'),
  document.getElementById('video7'),
  document.getElementById('video8')
];


const texts = document.querySelectorAll('.content2'); // 👈 모든 <p class="content2"> 요소 선택


// 각 비디오에 대한 초기 설정 및 특정 비디오에 loop 설정
videos.forEach(video => {
  video.style.opacity = 0; // 초기 투명도를 0으로 설정
  const videoId = video.getAttribute('id');
  if (videoId === 'video0') {
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

// setupVideoRepeat(document.getElementById('video6'), 5.5);
// setupVideoRepeat(document.getElementById('video7'), 1.8);




let lastScrollTop = 0; // 마지막 스크롤 위치 저장
let lastDirection = ''; // 마지막 스크롤 방향 저장

// 요소 확인을 위한 로그 출력
console.log("Videos:", videos);
console.log("Texts:", texts);

const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.play();
      entry.target.style.opacity = 1; // 모든 비디오에 대해 opacity 조절 적용
    } else {
      entry.target.pause();
      entry.target.style.opacity = 0; // 모든 비디오에 대해 opacity 조절 적용

      // 위로 스크롤하면서 화면에서 사라질 때만 특정 비디오를 0초로 리셋
      if (lastDirection === 'up') {
        entry.target.currentTime = 0;
      }
    }
  });
}, { threshold: 0.2 }); // 👈 비디오 감지 기준 20%

// 모든 비디오를 IntersectionObserver에 등록
videos.forEach(video => {
  if (video) {
    videoObserver.observe(video);
  }
});


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

// ✅ 각 텍스트 요소에 텍스트 감지 적용
texts.forEach(text => {
  text.style.opacity = 0; // 초기 투명도 설정
  text.style.transition = 'opacity 0.5s ease-in-out'; // 부드러운 효과 추가
  textObserver.observe(text);
});

// 📜 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', function () {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop) {
    lastDirection = 'down'; // 스크롤 내릴 때
  } else {
    lastDirection = 'up'; // 스크롤 올릴 때
  }

  lastScrollTop = currentScroll;
});


document.getElementById("video7").addEventListener("click", function () {
  window.location.href = "https://www.figma.com/design/3NP6lgVhmpupwQFukCcaJE/Podscribe_Dashboard-Design?node-id=0-1&t=qBlNq4dI05sAcLWc-1";
});



// 배속 조정 설정
// videos.forEach(video => {
//   if (video.getAttribute('id') === 'video1') {
//     video.playbackRate = 1.26;
//   } else if (video.getAttribute('id') === 'video3') {
//     video.playbackRate = 1.1;
//   } else if (video.getAttribute('id') === 'video5') {
//     video.playbackRate = 1.1;
//   } else if (video.getAttribute('id') === 'video6') {
//     video.playbackRate = 1.3;
//   } else if (video.getAttribute('id') === 'video7') {
//     video.playbackRate = 1.2;
//   } else if (video.getAttribute('id') === 'video0') {
//     video.playbackRate = 1.35;
//   }

//   else {
//     video.playbackRate = 1.0;
//   }
// });






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




