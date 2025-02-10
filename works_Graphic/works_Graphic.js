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


//페이지 로드 시 main(section) 투명도 조절

document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelectorAll('.section');
  section.forEach(el => {
    el.style.opacity = 1;
  });
});



//모바일 image 클릭시 인터렉션

document.addEventListener("DOMContentLoaded", function () {
  // 각 ID에 따른 HTML 파일 경로 매핑
  var paths = {
    's1img': '../works/work_Curva/work_Curva.html',
    's2img': '../works/work_Morse/work_Morse.html',
    's3img': '../works/work_TheNewArchitecture/work_TheNewArchitecture.html',
    's3-1img': '../works/work_Bodega/work_Bodega.html',
    's4img': '../works/work_AisleAndLens/work_AisleAndLens.html',
    's5img': '../works/work_Beam/work_Beam.html',
    's6img': '../works/work_HangItAll/work_HangItAll.html',
    's7img': '../works/work_AltiAir/work_AltiAir.html'
  };

  function redirectToPage(event) {
    var targetId = event.currentTarget.id;
    if (paths[targetId]) {
      window.location.href = paths[targetId]; // 매핑된 HTML 경로로 리다이렉트
    }
  }

  function addEventListeners() {
    var imgDivs = document.querySelectorAll('#s1img, #s2img, #s3img, #s3-1img, #s4img, #s5img, #s6img, #s7img'); // 모든 대상 이미지 선택
    imgDivs.forEach(function (div) {
      div.addEventListener('click', redirectToPage);
    });
  }

  function removeEventListeners() {
    var imgDivs = document.querySelectorAll('#s1img, #s2img, #s3img, #s3-1img, #s4img, #s5img, #s6img, #s7img');
    imgDivs.forEach(function (div) {
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

  function removeBrOnMobile() {
    if (window.innerWidth <= 767) { // 👈 모바일 화면 너비 기준 (767px 이하)
      document.querySelectorAll('br').forEach(br => br.remove());
    }
  }

  // ✅ 페이지 로드 시 한 번 실행
  window.addEventListener('DOMContentLoaded', removeBrOnMobile);

  // ✅ 화면 크기 변경될 때 다시 확인 (예: 창 크기 조정)
  window.addEventListener('resize', removeBrOnMobile);


  // 화면 크기가 변경될 때마다 이벤트 리스너를 조정
  window.addEventListener('resize', checkWidth);
  // 초기 로드 시에도 실행
  checkWidth();
});



// document.addEventListener('DOMContentLoaded', function() {
//   var img1 = document.getElementsByID('#s1img');

//   if (window.innerWidth < 768) { 
//     if (img1) {
//       img1.addEventListener('click', function() {
//         window.location.href = '../work_Curva/work_Curva.html';
//       });
//     }
//   }
// });
