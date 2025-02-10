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

    // case 's2c4Data':
    //   if (stage === 's2c4Data') return
    //   scale = 1;
    //   stage = 's2c4Data'
    //   console.log('s2c4Data')
    //   break


    case 'detail':
      if (stage === 'detail') return
      scale = 1;
      stage = 'detail'
      console.log('detaila')
      break


    case 'pro1':
      if (stage === 'pro1') return
      scale = 2;
      stage = 'pro1'
      console.log('pro1')
      break

    case 'pro2':
      if (stage === 'pro2') return
      scale = 2;
      stage = 'pro2'
      console.log('pro2')
      break

    case 'pro3':
      if (stage === 'pro3') return
      scale = 2;
      stage = 'pro3'
      console.log('pro3')
      break

    case 'pro4':
      if (stage === 'pro4') return
      scale = 2;
      stage = 'pro4'
      console.log('pro4')
      break


    // case 'footerData':
    //   if (stage === 'footerData') return
    //   scale = 1;
    //   stage = 'footerData'
    //   console.log('footerData')
    //   break

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



// 부모 요소인 #circleForS3에 대한 이벤트 리스너
document.getElementById('circleForS3').addEventListener('mouseover', function () {
  // 여기서 scale을 1로 재설정합니다.
  scale = 1;
});


// 자식 요소인 버튼에 대한 이벤트 리스너
document.getElementById('viewAllProjects').addEventListener('mouseover', function (event) {
  // 커서 scale을 변경하고, 이벤트 버블링을 막습니다.
  scale = 2;
  event.stopPropagation();
});



// const aboutBox = document.querySelector("#aboutBox");

// aboutBox.onclick = () => {
//   document.querySelector('#descBox').classList.toggle("go");
// };



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



  // # 위치에 따른 #circleForS3 표시 로직
  const circleForS3 = document.getElementById('circleForS3'); // SVG 요소 선택
  const windowHeight = window.innerHeight;
  const elementsToShow = document.querySelectorAll('#s3text, #viewAllProjects');

  if (window.scrollY > 1640) {

    circleForS3.style.opacity = '1';
    circleForS3.style.transform = 'translateX(-50%) translateY(0%)';
    elementsToShow.forEach(element => {
      element.style.opacity = '1'; // 투명도를 1로 변경하여 요소를 보이게 함
      element.style.transform = 'translate(-50%, 0)';
    });
  } else {

    circleForS3.style.opacity = '0';
    circleForS3.style.transform = 'translateX(-50%) translateY(100%)';
    elementsToShow.forEach(element => {
      element.style.opacity = '0'; // 투명도를 0으로 변경하여 요소를 숨김
      element.style.transform = 'translate(-50%, 30px)';
    });
  }

});


const s2c1 = document.querySelector('#s2.s2c1');
const circleForS2c1 = document.getElementById('circleForS2c1');
const recForS2c1 = document.getElementById('recForS2c1');
const linesForS2c1 = document.getElementById('linesForS2c1');

window.addEventListener('scroll', function () {
  // 스크롤 위치 확인
  if (window.scrollY > 250) {
    // 스크롤 위치가 400px 이상일 때, 투명도와 위치를 원래대로 복귀
    s2c1.style.opacity = '1';
    s2c1.style.transform = 'translate(-80%, 0)';

    circleForS2c1.style.opacity = '1';
    circleForS2c1.style.transform = 'translateX(0)';

    recForS2c1.style.opacity = '1';
    recForS2c1.style.transform = 'translateX(0)';

    linesForS2c1.style.opacity = '1';
    linesForS2c1.style.transform = 'translateX(0)';
  } else {
    // 스크롤 위치가 400px 미만일 때, 초기 설정으로 되돌림
    s2c1.style.opacity = '0';
    // 좌우 중앙 정렬을 유지하며 좌측으로 400px 이동시킴
    s2c1.style.transform = 'translate(-80%, 40px)'; // 초기 설정 위치로

    circleForS2c1.style.opacity = '0';
    circleForS2c1.style.transform = 'translateX(-640px)';

    recForS2c1.style.opacity = '0';
    recForS2c1.style.transform = 'translateX(-640px)';

    linesForS2c1.style.opacity = '0';
    linesForS2c1.style.transform = 'translateX(-640px)';
  }
});


const s2c2 = document.querySelector('#s2.s2c2');
const circleForS2c2 = document.getElementById('circleForS2c2');
const triForS2c2 = document.getElementById('triForS2c2');
const linesForS2c2 = document.getElementById('linesForS2c2');

window.addEventListener('scroll', function () {
  if (window.scrollY > 830) {
    // 스크롤 위치가 840px 이상일 때, 투명도와 위치를 원래대로 복귀
    s2c2.style.opacity = '1';
    s2c2.style.transform = 'translateX(-12%) translateY(0)'; // 좌우 정렬 유지하면서 위치 복귀


    circleForS2c2.style.opacity = '1';
    circleForS2c2.style.transform = 'translateX(0)';

    triForS2c2.style.opacity = '1';
    triForS2c2.style.transform = 'translateX(0)';

    linesForS2c2.style.opacity = '1';
    linesForS2c2.style.transform = 'translateX(0)';
  } else {
    // 스크롤 위치가 840px 미만일 때, 초기 설정으로 되돌림
    s2c2.style.opacity = '0';
    s2c2.style.transform = 'translateX(-12%) translateY(40px)'; // 초기 설정 위치로

    circleForS2c2.style.opacity = '0';
    circleForS2c2.style.transform = 'translateX(660px)';

    triForS2c2.style.opacity = '0';
    triForS2c2.style.transform = 'translateX(660px)';

    linesForS2c2.style.opacity = '0';
    linesForS2c2.style.transform = 'translateX(660px)';
  }
});

const s2c3 = document.querySelector('#s2.s2c3');
const recForS2c3 = document.getElementById('recForS2c3');
const circleForS2c3 = document.getElementById('circleForS2c3');
const linesForS2c3 = document.getElementById('linesForS2c3');

window.addEventListener('scroll', function () {
  if (window.scrollY > 1365) {
    // 스크롤 위치가 1365px 이상일 때, 투명도와 위치를 원래대로 복귀
    s2c3.style.opacity = '1';
    s2c3.style.transform = 'translateX(-80%) translateY(0)'; // 좌우 정렬 유지하면서 위치 복귀

    recForS2c3.style.opacity = '1';
    recForS2c3.style.transform = 'translateX(0)';

    circleForS2c3.style.opacity = '1';
    circleForS2c3.style.transform = 'translateX(0)';

    linesForS2c3.style.opacity = '1';
    linesForS2c3.style.transform = 'translateX(0)';
  } else {
    // 스크롤 위치가 1365px 미만일 때, 초기 설정으로 되돌림
    s2c3.style.opacity = '0';
    s2c3.style.transform = 'translateX(-80%) translateY(40px)'; // 초기 설정 위치로

    recForS2c3.style.opacity = '0';
    recForS2c3.style.transform = 'translateX(-600px)';

    circleForS2c3.style.opacity = '0';
    circleForS2c3.style.transform = 'translateX(-600px)';

    linesForS2c3.style.opacity = '0';
    linesForS2c3.style.transform = 'translateX(-600px)';
  }
});



// function adjustFontSize() {
//   const element = document.getElementById('s2text1');
//   if (window.innerWidth >= 1600) {
//     element.style.fontSize = '36px';
//   } else {
//     element.style.fontSize = '26px';
//   }
// }

// // 초기 로드 시 폰트 크기 조정
// adjustFontSize();

// // 창 크기 변경 시 폰트 크기 조정
// window.addEventListener('resize', adjustFontSize);

function removeBrOnMobile() {
  if (window.innerWidth <= 767) { // 👈 모바일 화면 너비 기준 (767px 이하)
    document.querySelectorAll('br').forEach(br => br.remove());
  }
}

// ✅ 페이지 로드 시 한 번 실행
window.addEventListener('DOMContentLoaded', removeBrOnMobile);

// ✅ 화면 크기 변경될 때 다시 확인 (예: 창 크기 조정)
window.addEventListener('resize', removeBrOnMobile);
