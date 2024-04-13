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
var video5 = document.getElementById('video5');
var video6 = document.getElementById('video6'); 
var video7 = document.getElementById('video7');  // 새 비디오 요소
var video8 = document.getElementById('video8'); 

video1.playbackRate = 2.0;
video2.playbackRate = 2.0;
video3.playbackRate = 1.6;
video4.playbackRate = 1.0; 
video5.playbackRate = 1.0; 
video6.playbackRate = 1.0; 
video7.playbackRate = 1.0; 
video8.playbackRate = 1.0; 

video1.loop = false;
video2.loop = false;
video3.loop = true;
video4.loop = true;
video5.loop = true; 
video6.loop = true; 
video7.loop = true;
video8.loop = false;


var hasStarted1 = false;
var hasStarted2 = false;
var hasStarted3 = false;
var hasStarted4 = false;
var hasStarted5 = false;
var hasStarted6 = false;
var hasStarted7 = false;
var hasStarted8 = false;

var firstPlayFinished5 = false;
var firstPlayFinished6 = false;
var firstPlayFinished7 = false; // 비디오5의 첫 재생 완료 여부 추적

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
    if (scrollPosition >= 2490) {
      // 스크롤 위치가 2490px 이상일 때
      if (video3.style.opacity != 1) {
          video3.style.opacity = 1;  // 투명도를 1로 설정
      }
      if (video3.paused) {
          video3.currentTime = 0;  // 비디오를 처음부터 재생
          video3.play();
      }
  } else {
      // 스크롤 위치가 2490px 미만일 때
      if (video3.style.opacity != 0) {
          video3.style.opacity = 0;  // 투명도를 0으로 설정
      }
      video3.pause();  // 비디오 재생 정지
      video3.currentTime = 0;  // 다음 재생을 위해 비디오 위치를 초기화
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

        // 비디오6 제어
        if (scrollPosition >= 4960 && !hasStarted6) {
          video6.style.opacity = 1;
          video6.currentTime = 0;
          video6.play();
          hasStarted6 = true;
      } else if (scrollPosition < 4960 && hasStarted6) {
          video6.style.opacity = 0;
          video6.pause();
          hasStarted6 = false;
      }


        // 비디오7 제어
        if (scrollPosition >= 5900 && !hasStarted7) {
          video7.style.opacity = 1;
          video7.currentTime = 0;
          video7.play();
          hasStarted7 = true;
      } else if (scrollPosition < 5900 && hasStarted7) {
          video7.style.opacity = 0;
          video7.pause();
          hasStarted7 = false;
      }

          // 비디오8 제어
    if (scrollPosition >= 6700 && !hasStarted8) {
      video8.style.opacity = 1;
      video8.currentTime = 0;
      video8.play();
      hasStarted8 = true;
  } else if (scrollPosition < 6700 && hasStarted8) {
      video8.style.opacity = 0;
      video8.pause();
      hasStarted8 = false;
  }
});





// 비디오 반복 재생 설정


function setupVideoRepeat(video, repeatStartTime, intervalCheck = 500) {
  video.addEventListener('play', function setupRepeat() {
      const checkInterval = setInterval(() => {
          // 비디오가 끝나갈 시점에 도달했는지 확인
          if (video.currentTime >= video.duration - 0.5) {
              video.currentTime = repeatStartTime;  // 지정된 시작 시간으로 점프
              video.play().catch(e => console.error(`Error replaying video ${video.id}:`, e));
          }
      }, intervalCheck);

      // 비디오가 중단되면 인터벌을 제거
      video.addEventListener('pause', () => clearInterval(checkInterval));
      video.addEventListener('ended', () => clearInterval(checkInterval));
  });
}

// 각 비디오에 대한 설정 적용
setupVideoRepeat(document.getElementById('video5'), 2);
setupVideoRepeat(document.getElementById('video6'), 3);
setupVideoRepeat(document.getElementById('video7'), 3); // video7 설정 추가
