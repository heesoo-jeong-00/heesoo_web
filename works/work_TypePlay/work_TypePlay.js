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





// var played = false; // 비디오 재생 여부를 추적하는 변수

// window.addEventListener('scroll', function() {
//   var video = document.getElementById('video1');
//   var videoHeight = video.clientHeight;
//   var videoPosition = video.getBoundingClientRect().top + window.scrollY;
//   var screenPosition = window.innerHeight + window.scrollY;

//   // 비디오 중간이 화면에 보일 때만 재생
//   if (screenPosition > videoPosition + videoHeight / 2) {
//     if (!played) { // 비디오가 아직 재생되지 않았다면
//       video.play();
//       played = true; // 비디오를 재생했다고 표시
//     }
//   }
// });


// 비디오 요소들을 배열에 담음
const videos = [
  document.getElementById('video1')
];

// 각 비디오에 대한 초기 설정 및 특정 비디오에 loop 설정
videos.forEach(video => {
  video.style.opacity = 0; // 초기 투명도를 0으로 설정
  const videoId = video.getAttribute('id');
  if (videoId === 'video1') {
    video.loop = true;  // loop 속성 추가
  }
});



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
        video.style.opacity = 1;
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






window.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('mainbutton');
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




