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



// 비디오 요소들을 배열에 담음
const videos = [
  document.getElementById('video1'),
  document.getElementById('video2'),
  document.getElementById('video3'),
  document.getElementById('video4'),
  document.getElementById('video5'),
  document.getElementById('video6'),
  document.getElementById('video7'),
  document.getElementById('video8'),
  document.getElementById('detail')
];

// 각 비디오에 대한 초기 설정 및 특정 비디오에 loop 설정
videos.forEach(video => {
  video.style.opacity = 0; // 초기 투명도를 0으로 설정
  const videoId = video.getAttribute('id');
  if (videoId === 'video3' || videoId === 'video4' || videoId === 'video5' || videoId === 'video6' || videoId === 'video7') {
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
setupVideoRepeat(document.getElementById('video5'), 2.3);
setupVideoRepeat(document.getElementById('video6'), 4.3);
setupVideoRepeat(document.getElementById('video7'), 4.7);





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
      video.pause();
      if (!isScrollingDown) { // 스크롤 업일 때만 투명도를 0으로 설정
        video.style.opacity = 0;
        // video.pause();
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
  if (video.getAttribute('id') === 'video1') {
    video.playbackRate = 2.1;
  } else if (video.getAttribute('id') === 'video2') {
    video.playbackRate = 2.3;
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
