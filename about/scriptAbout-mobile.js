const cursorParent = document.getElementById('mouse-cursor');
const cursorChild = cursorParent.children[0];
window.addEventListener('touchmove', touchmove);
window.addEventListener('touchstart', touchstart);
window.addEventListener('touchend', touchend);

let scale = 1;
let cursorX = 0, cursorY = 0;
let stage = '';

function touchmove(e) {
  const touch = e.touches[0];
  cursorX = touch.pageX - cursorParent.offsetWidth / 2;
  cursorY = touch.pageY - cursorParent.offsetHeight / 2;
  cursorParent.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

  const targetAttribute = e.target.getAttribute('data-cursor');
  switch (targetAttribute) {
    case 'topcontainer':
      if (stage === 'topcontainer') return;
      scale = 1;
      stage = 'topcontainer';
      break;

    case 'top1':
      if (stage === 'top1') return;
      scale = 2;
      stage = 'top1';
      break;
    case 'top2':
      if (stage === 'top2') return;
      scale = 2;
      stage = 'top2';
      break;
    case 'top3':
      if (stage === 'top3') return;
      scale = 2;
      stage = 'top3';
      break;

    case 'main1':
      if (stage === 'main1') return;
      scale = 1;
      stage = 'main1';
      break;

    case 'main2':
      if (stage === 'main2') return;
      scale = 1;
      stage = 'main2';
      break;

    case 'main3':
      if (stage === 'main3') return;
      scale = 1;
      stage = 'main3';
      break;

    case 'bottomItem1':
      if (stage === 'bottomItem1') return;
      scale = 2;
      stage = 'bottomItem1';
      break;

    case 'bottomItem2':
      if (stage === 'bottomItem2') return;
      scale = 2;
      stage = 'bottomItem2';
      break;

    case 'bottomItem3':
      if (stage === 'bottomItem3') return;
      scale = 2;
      stage = 'bottomItem3';
      break;
  }
  cursorChild.style.setProperty('--cursor-scale', scale);
}

function touchstart(e) {
  scale *= 0.75;
  cursorChild.style.setProperty('--cursor-scale', scale);
}

function touchend(e) {
  scale *= 1.25;
  cursorChild.style.setProperty('--cursor-scale', scale);
}

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

var textContents = document.getElementById('textContents');

function showTextContents() {
    textContents.classList.add('visible');
}

function hideTextContents() {
    textContents.classList.remove('visible');
}

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
