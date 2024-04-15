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


      case 'main4':
        if (stage === 'main4') return
        scale = 2;
        stage = 'main4'
        console.log('main4')
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

//페이지 로드 시 main 투명도 조절
document.addEventListener('DOMContentLoaded', function() {
  // "boxes" 클래스를 가진 모든 요소를 선택합니다.
  const boxes = document.querySelectorAll('.boxes'); // 클래스 선택자를 사용합니다.
  boxes.forEach(el => {
    el.style.opacity = 1;
  });
});



//블랙박스 클릭시 다른 페이지로 이동

// document.addEventListener('DOMContentLoaded', function() {
//   var blackBox1 = document.getElementById('blackbox1'); // blackbox1의 ID를 가져옵니다.

//   blackBox1.addEventListener('click', function() {
//     window.location.href = '../work_indivisual/work_Curva/work_Curva.html'; // 클릭 시 지정된 URL로 이동합니다.
//   });
// });





document.addEventListener('DOMContentLoaded', function() {
  var box1 = document.getElementById('box1');
  var blackBox1 = document.getElementById('blackbox1');

  if (window.innerWidth > 1024) { // 데스크톱 환경에서만 blackBox1에 이벤트 리스너를 추가
    if (blackBox1) {
      blackBox1.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Curva/work_Curva.html';
      });
    }
  } else { // 모바일 환경에서는 box1에 이벤트 리스너를 추가
    if (box1) {
      box1.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Curva/work_Curva.html';
      });
    }
  }
});


document.addEventListener('DOMContentLoaded', function() {
  var box2 = document.getElementById('box2');
  var blackBox2 = document.getElementById('blackbox2');

  if (window.innerWidth > 1024) { 
    if (blackBox2) {
      blackBox2.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_With/work_With.html';
      });
    }
  } else { 
    if (box2) {
      box2.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_With/work_With.html';
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var box3 = document.getElementById('box3');
  var blackBox3 = document.getElementById('blackbox3');

  if (window.innerWidth > 1024) { 
    if (blackBox3) {
      blackBox3.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Nebula/work_Nebula.html';
      });
    }
  } else { 
    if (box3) {
      box3.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Nebula/work_Nebula.html';
      });
    }
  }
});


document.addEventListener('DOMContentLoaded', function() {
  var box4 = document.getElementById('box4');
  var blackBox4 = document.getElementById('blackbox4');

  if (window.innerWidth > 1024) { 
    if (blackBox4) {
      blackBox4.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Morse/work_Morse.html';
      });
    }
  } else { 
    if (box4) {
      box4.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Morse/work_Morse.html';
      });
    }
  }
});


