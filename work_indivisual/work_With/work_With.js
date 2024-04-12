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



//video 조정

var video1 = document.getElementById('video1');
var video2 = document.getElementById('video2');
var video3 = document.getElementById('video3');
var video4 = document.getElementById('video4');
var video5 = document.getElementById('video5');  // 새 비디오 요소

video1.playbackRate = 2.0;
video2.playbackRate = 2.0;
video3.playbackRate = 1.6;
video4.playbackRate = 1.0; // 필요에 따라 조정
video5.playbackRate = 1.0; // 필요에 따라 조정

video1.loop = false;
video2.loop = false;
video3.loop = true;
video4.loop = true;
video5.loop = true;  // 비디오5 루프 설정

var hasStarted1 = false;
var hasStarted2 = false;
var hasStarted3 = false;
var hasStarted4 = false;
var hasStarted5 = false;
var firstPlayFinished5 = false; // 비디오5의 첫 재생 완료 여부 추적

// 스크롤에 따라 비디오 재생 및 정지
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY || window.pageYOffset;

    // 비디오1 제어
    if (scrollPosition >= 700 && !hasStarted1) {
        video1.style.opacity = 1;
        video1.currentTime = 0;
        video1.play();
        hasStarted1 = true;
    } else if (scrollPosition < 700 && hasStarted1) {
        video1.style.opacity = 0;
        video1.pause();
        hasStarted1 = false;
    }

    // 비디오2 제어
    if (scrollPosition >= 1550 && !hasStarted2) {
        video2.style.opacity = 1;
        video2.currentTime = 0;
        video2.play();
        hasStarted2 = true;
    } else if (scrollPosition < 1550 && hasStarted2) {
        video2.style.opacity = 0;
        video2.pause();
        hasStarted2 = false;
    }

    // 비디오3 제어
    if (scrollPosition >= 2480 && !hasStarted3) {
        video3.style.opacity = 1;
        video3.currentTime = 0;
        video3.play();
        hasStarted3 = true;
    } else if (scrollPosition < 2480 && hasStarted3) {
        video3.style.opacity = 0;
        video3.pause();
        hasStarted3 = false;
    }

    // 비디오4 제어
    if (scrollPosition >= 3200 && !hasStarted4) {
        video4.style.opacity = 1;
        video4.currentTime = 0;
        video4.play();
        hasStarted4 = true;
    } else if (scrollPosition < 3200 && hasStarted4) {
        video4.style.opacity = 0;
        video4.pause();
        hasStarted4 = false;
    }

    // 비디오5 제어
    if (scrollPosition >= 4220 && !hasStarted5) {
        video5.style.opacity = 1;
        video5.currentTime = 0;
        video5.play();
        hasStarted5 = true;
    } else if (scrollPosition < 4220 && hasStarted5) {
        video5.style.opacity = 0;
        video5.pause();
        hasStarted5 = false;
    }
});

// 비디오5가 끝났을 때 이벤트 리스너
video5.addEventListener('ended', function() {
    if (!firstPlayFinished5) {
        video5.currentTime = 2;  // 비디오5가 처음으로 끝났을 때, 다음 재생은 2초 지점에서 시작
        firstPlayFinished5 = true;
    }
    video5.play();  // 비디오5 재생
});
