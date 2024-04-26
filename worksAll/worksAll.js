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


document.addEventListener('DOMContentLoaded', function() {
  var box5 = document.getElementById('box5');
  var blackBox5 = document.getElementById('blackbox5');

  if (window.innerWidth > 1024) { 
    if (blackBox5) {
      blackBox5.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_TheNewArchitecture/work_TheNewArchitecture.html';
      });
    }
  } else { 
    if (box5) {
      box5.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_TheNewArchitecture/work_TheNewArchitecture.html';
      });
    }
  }
});



document.addEventListener('DOMContentLoaded', function() {
  var box6 = document.getElementById('box6');
  var blackBox6 = document.getElementById('blackbox6');

  if (window.innerWidth > 1024) { 
    if (blackBox6) {
      blackBox6.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_AisleAndLens/work_AisleAndLens.html';
      });
    }
  } else { 
    if (box6) {
      box6.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_AisleAndLens/work_AisleAndLens.html';
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var box7 = document.getElementById('box7');
  var blackBox7 = document.getElementById('blackbox7');

  if (window.innerWidth > 1024) { 
    if (blackBox7) {
      blackBox7.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Beam/work_Beam.html';
      });
    }
  } else { 
    if (box7) {
      box7.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Beam/work_Beam.html';
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var box8 = document.getElementById('box8');
  var blackBox8 = document.getElementById('blackbox8');

  if (window.innerWidth > 1024) { 
    if (blackBox8) {
      blackBox8.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Kaleidoscope/work_Kaleidoscope.html';
      });
    }
  } else { 
    if (box8) {
      box8.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Kaleidoscope/work_Kaleidoscope.html';
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var box9 = document.getElementById('box9');
  var blackBox9 = document.getElementById('blackbox9');

  if (window.innerWidth > 1024) { 
    if (blackBox9) {
      blackBox9.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_HangItAll/work_HangItAll.html';
      });
    }
  } else { 
    if (box9) {
      box9.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_HangItAll/work_HangItAll.html';
      });
    }
  }
});
 

document.addEventListener('DOMContentLoaded', function() {
  var box10 = document.getElementById('box10');
  var blackBox10 = document.getElementById('blackbox10');

  if (window.innerWidth > 1024) { 
    if (blackBox10) {
      blackBox10.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Bodega/work_Bodega.html';
      });
    }
  } else { 
    if (box10) {
      box10.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Bodega/work_Bodega.html';
      });
    }
  }
});


document.addEventListener('DOMContentLoaded', function() {
  var box11 = document.getElementById('box11');
  var blackBox11 = document.getElementById('blackbox11');

  if (window.innerWidth > 1024) { 
    if (blackBox11) {
      blackBox11.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_TypePlay/work_TypePlay.html';
      });
    }
  } else { 
    if (box11) {
      box11.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_TypePlay/work_TypePlay.html';
      });
    }
  }
})


document.addEventListener('DOMContentLoaded', function() {
  var box12 = document.getElementById('box12');
  var blackBox12 = document.getElementById('blackbox12');

  if (window.innerWidth > 1024) { 
    if (blackBox12) {
      blackBox12.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_AltiAir/work_AltiAir.html';
      });
    }
  } else { 
    if (box12) {
      box12.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_AltiAir/work_AltiAir.html';
      });
    }
  }
})


document.addEventListener('DOMContentLoaded', function() {
  var box13 = document.getElementById('box13');
  var blackBox13 = document.getElementById('blackbox13');

  if (window.innerWidth > 1024) { 
    if (blackBox13) {
      blackBox13.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Heesoo/work_Heesoo.html';
      });
    }
  } else { 
    if (box13) {
      box13.addEventListener('click', function() {
        window.location.href = '../work_indivisual/work_Heesoo/work_Heesoo.html';
      });
    }
  }
})