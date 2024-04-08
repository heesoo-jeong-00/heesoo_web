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


// #textContents 요소를 선택합니다.
var textContents = document.getElementById('textContents');

// 해당 요소를 보여주는 함수
function showTextContents() {
    textContents.classList.add('visible');
}

// 해당 요소를 숨기는 함수
function hideTextContents() {
    textContents.classList.remove('visible');
}

// 예시로, 페이지가 로드되면 자동으로 텍스트를 보여주는 기능을 활성화할 수 있습니다.
window.onload = function() {
    showTextContents();
};



window.addEventListener('resize', adjustHeight);

function adjustHeight() {
  var headerHeight = document.querySelector('header').offsetHeight;
  var footerHeight = document.querySelector('footer').offsetHeight;
  var availableHeight = window.innerHeight - headerHeight - footerHeight;
  document.getElementById('aboutContainer').style.height = availableHeight + 'px';
}

adjustHeight();  // 페이지 로드 시에 함수를 호출하여 초기 높이를 조정합니다.
