

//애니메이션 추가

// HTML 요소에 대한 참조 변수를 설정
const headerBox = document.getElementById('headerBox');
const topBoxes = document.getElementById('topBoxes');
const topBox = document.querySelectorAll('.topBox');
const topBox3 = document.getElementById('topBox3');       // ✅ 추가: topBox3 참조
const logo = document.getElementById('logo');

// ✅ 추가: 축소 상태에서 네비게이션 링크 클릭 막기/허용 함수
const topLinks = document.querySelectorAll('#topBoxes a');
function setNavClickable(enabled) {
  topLinks.forEach(a => (a.style.pointerEvents = enabled ? 'auto' : 'none'));
}

// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', function () {
  // 스크롤 위치가 50px 이상이고, headerBox가 확대된 상태가 아닐 경우
  if (window.scrollY > 50) {
    // 확대된 상태가 아니면 축소 스타일 적용
    if (!headerBox.dataset.isExpanded) {
      headerBox.classList.add('scrolled');
      topBoxes.classList.add('scrolled');
      topBox.forEach(box => box.classList.add('scrolled'));
      // ✅ Creative만 다시 보이게
      topBox3?.classList.remove('scrolled');
      // ✅ 로고 숨김 + 네비 클릭 막기
      logo.style.display = 'none';
      logo.style.pointerEvents = 'none';
      setNavClickable(false); // ← 중요: 링크 비활성화(첫 탭은 헤더가 받도록)
    }
  } else {
    // 스크롤 위치가 50px 이하인 경우, 모든 스타일을 제거하고, 확대 상태로 설정
    headerBox.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
    // ✅ 로고/네비 다시 활성화
    logo.style.display = '';
    logo.style.pointerEvents = 'auto';
    setNavClickable(true); // ← 링크 다시 활성화
    headerBox.dataset.isExpanded = 'true';
  }
});

// 클릭 이벤트 리스너 추가
headerBox.addEventListener('click', function (e) {
  // headerBox가 이미 축소된 상태인 경우: 먼저 펼치기(링크 이동 금지)
  if (this.classList.contains('scrolled')) {
    e.preventDefault();
    this.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
    // ✅ 로고/네비 다시 활성화
    logo.style.display = '';
    logo.style.pointerEvents = 'auto';
    setNavClickable(true); // ← 링크 다시 활성화
    headerBox.dataset.isExpanded = 'true';
  }
});

// 스크롤 이벤트에서 확대된 상태를 해제하고 다시 축소되도록 처리
window.addEventListener('scroll', function () {
  if (window.scrollY > 50 && headerBox.dataset.isExpanded === 'true') {
    headerBox.classList.add('scrolled');
    topBoxes.classList.add('scrolled');
    topBox.forEach(box => box.classList.add('scrolled'));
    // ✅ Creative만 다시 보이게
    topBox3?.classList.remove('scrolled');
    // ✅ 로고 숨김 + 네비 클릭 막기
    logo.style.display = 'none';
    logo.style.pointerEvents = 'none';
    setNavClickable(false); // ← 링크 비활성화
    headerBox.dataset.isExpanded = 'false';
  }
});


// window.addEventListener('resize', adjustSectionHeight);
// window.addEventListener('DOMContentLoaded', adjustSectionHeight);  // 페이지 로드 시에도 함수 호출

// function adjustSectionHeight() {
//   if (window.innerWidth > 767) {  // 화면 너비가 767px 초과일 경우에만 실행
//     var headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
//     var footerHeight = document.querySelector('footer') ? document.querySelector('footer').offsetHeight : 0;
//     var availableHeight = window.innerHeight - 96;  // 96px 만큼 추가로 빼줍니다.
//     document.getElementById('section1').style.height = availableHeight + 'px';
//   } else {
//     document.getElementById('section1').style.height = '70vw';  // 767px 이하에서는 높이를 'auto'로 설정
//   }
// }

// adjustSectionHeight();  // 초기 높이를 설정합니다.



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





function adjustTitleLineHeight() {
  const title = document.getElementById("title");

  if (title) {
    // 현재 줄 개수 확인
    const lineHeight = parseFloat(window.getComputedStyle(title).lineHeight);
    const height = title.clientHeight;
    const lines = Math.round(height / lineHeight);

    if (lines >= 2) {
      title.style.lineHeight = "34px"; // 두 줄 이상이면 적용
    } else {
      title.style.lineHeight = ""; // 한 줄이면 기본값 유지
    }
  }
}

// ✅ 페이지 로드 시 실행
window.addEventListener("DOMContentLoaded", adjustTitleLineHeight);

// ✅ 창 크기 변경 시 다시 체크
window.addEventListener("resize", adjustTitleLineHeight);
ㄹ