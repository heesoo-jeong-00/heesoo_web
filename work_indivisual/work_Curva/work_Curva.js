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
window.addEventListener('scroll', function () {
  console.log(window.scrollY); // 스크롤 위치 출력
  const headerBox = document.getElementById('headerBox');
  const topBoxes = document.getElementById('topBoxes');
  const topBox = document.querySelectorAll('.topBox');
  const logo = document.getElementById('logo');

  if (window.scrollY > 50) {
    headerBox.classList.add('scrolled');
    topBoxes.classList.add('scrolled');
    topBox.forEach(box => box.classList.add('scrolled'));

  } else {
    headerBox.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
  }
});




window.addEventListener('resize', adjustSectionHeight);
window.addEventListener('DOMContentLoaded', adjustSectionHeight);  // 페이지 로드 시에도 함수 호출

function adjustSectionHeight() {
  if (window.innerWidth > 767) {  // 화면 너비가 767px 초과일 경우에만 실행
    var headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
    var footerHeight = document.querySelector('footer') ? document.querySelector('footer').offsetHeight : 0;
    var availableHeight = window.innerHeight - 96;  // 96px 만큼 추가로 빼줍니다.
    document.getElementById('section1').style.height = availableHeight + 'px';
  } else {
    document.getElementById('section1').style.height = '70vw';  // 767px 이하에서는 높이를 'auto'로 설정
  }
}

adjustSectionHeight();  // 초기 높이를 설정합니다.
