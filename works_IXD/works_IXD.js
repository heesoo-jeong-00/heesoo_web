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


      case 'pro0':
        if (stage === 'pro0') return
        scale = 1;
        stage = 'pro0'
        console.log('pro0')
        break

    case 'pro1':
      if (stage === 'pro1') return
      scale = 2;
      stage = 'pro1'
      console.log('pro1')
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


//페이지 로드 시 main(section) 투명도 조절

document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelectorAll('.section');
  section.forEach(el => {
    el.style.opacity = 1;
  });
});




//모바일 image 클릭시 인터렉션

document.addEventListener("DOMContentLoaded", function() {
  // 각 ID에 따른 HTML 파일 경로 매핑
  var paths = {
      's1img': '../work_indivisual/work_With/work_With.html',
      's2img': '../work_indivisual/work_Nebula/work_Nebula.html',
      's3img': '../work_indivisual/',
      's4img': '../work_indivisual/',
      's5img': '../work_indivisual/',
      's6img': '../work_indivisual/'
  };

  function redirectToPage(event) {
      var targetId = event.currentTarget.id;
      if (paths[targetId]) {
          window.location.href = paths[targetId]; // 매핑된 HTML 경로로 리다이렉트
      }
  }

  function addEventListeners() {
      var imgDivs = document.querySelectorAll('#s1img, #s2img, #s3img, #s4img, #s5img, #s6img'); // 모든 대상 이미지 선택
      imgDivs.forEach(function(div) {
          div.addEventListener('click', redirectToPage);
      });
  }

  function removeEventListeners() {
      var imgDivs = document.querySelectorAll('#s1img, #s2img, #s3img, #s4img, #s5img, #s6img');
      imgDivs.forEach(function(div) {
          div.removeEventListener('click', redirectToPage);
      });
  }

  function checkWidth() {
      if (window.innerWidth <= 767) {
          addEventListeners();
      } else {
          removeEventListeners();
      }
  }

  // 화면 크기가 변경될 때마다 이벤트 리스너를 조정
  window.addEventListener('resize', checkWidth);
  // 초기 로드 시에도 실행
  checkWidth();
});
