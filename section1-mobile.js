let fullText = `Hi :) I'm Heesoo,
a product designer based in Bay Area.
    
I'm passionate about
connecting with diverse users
through equitable design.`;
let lines; // 전체 텍스트를 줄별로 분리한 배열
let index = 0; // 현재까지 출력된 문자의 인덱스
let maxFrameCount = 50; // 각 글자 사이의 밀리초 간격
let finishedTyping = false; // 타이핑 효과 완료 여부
let highlightInfo = []; // 하이라이트 정보를 저장하는 배열
let startTime; // 타이핑 시작 시간

// creative의 시작을 늦추기 위한 변수
let creativeDelay = 4;

function setup() {
  resetSketch();
}

function resetSketch() {
  // 창 너비에 따른 fullText 값 설정
  if (windowWidth <= 370) {
    fullText = `Hi :) I'm Heesoo,
a product designer
based in Bay Area.

I'm passionate about
connecting with
diverse users through
equitable design.`;
  } else {
    fullText = `Hi :) I'm Heesoo, a product
designer based in Bay Area.
    
I'm passionate about
connecting with diverse users
through equitable design.`;
  }

  // header의 높이를 얻음
  let headerHeight = document.querySelector('#header').offsetHeight;

  // windowHeight에서 header의 높이를 빼서 새로운 canvas 높이를 설정
  let canvasHeight = windowHeight - headerHeight;
  let section1Height = canvasHeight - headerHeight;

  let canvas = createCanvas(windowWidth, section1Height, P2D);
  canvas.parent('section1');

  textFont('Jura');
  textSize(23.5);
  textAlign(CENTER, CENTER);
  lines = fullText.split('\n');
  index = 0; // 인덱스를 다시 0으로 초기화
  finishedTyping = false; // 타이핑 효과를 다시 시작하기 위해 false로 설정
  highlightInfo = []; // 하이라이트 정보를 초기화
  highlightInfo.push({ word: "Heesoo", color: [255, 214, 0], lineIndex: 1, startFrame: null, currentWidth: 0 });
  highlightInfo.push({ word: "creative", color: [114, 175, 255], lineIndex: 2, startFrame: null, currentWidth: 0 });

  startTime = millis(); // 타이핑 시작 시간 초기화
}

function draw() {
  background(255);

  // 현재 시간과 타이핑 시작 시간의 차이를 계산하여 인덱스를 업데이트
  let elapsedTime = millis() - startTime;
  index = min(floor(elapsedTime / maxFrameCount), fullText.length);

  fill(0); // 텍스트 색상을 검정으로 설정
  let tempText = fullText.substring(0, index);
  let tempLines = tempText.split('\n');
  for (let i = 0; i < tempLines.length; i++) {
    text(tempLines[i], width / 2, getLineY(i, tempLines.length));
  }
}

function drawHighlight(info, idx) {
  let line = lines[info.lineIndex];
  let startIdx = line.indexOf(info.word);
  if (startIdx !== -1 && frameCount >= info.startFrame) {
    let preTextWidth = textWidth(line.substring(0, startIdx));
    let wordWidth = textWidth(info.word);
    let x = (width / 2) - (textWidth(line) / 2) + preTextWidth;
    let y = getLineY(info.lineIndex, lines.length);

    let progress = frameCount - info.startFrame;
    info.currentWidth = min(wordWidth, info.currentWidth + progress * 0.5); // 너비를 점차 증가

    noStroke();
    rectMode(CORNER);
    push();
    translate(x, y - textAscent() / 5);
    rotate(radians(-4)); // 사각형을 살짝 기울임
    blendMode(DARKEST); // 블렌딩 모드 설정
    fill(info.color);
    rect(0, 0, info.currentWidth, textAscent() * 3 / 4 / 2, 1);
    blendMode(BLEND); // 기본 블렌딩 모드로 복원
    pop();

    if (info.currentWidth >= wordWidth && frameCount > info.startFrame + 100) {
      // 하이라이트 완성 후 정보 제거하지 않고 사라지지 않도록 수정
      info.currentWidth = wordWidth; // 최종 크기로 설정하여 유지
    }
  }
}

function getLineY(lineIndex, totalLines) {
  let lineHeight = textAscent() + textDescent() + 4;
  return (height / 2) - (lineHeight * (totalLines - 1) / 2) + (lineHeight * lineIndex);
}

let previousWidth = window.innerWidth;  // 초기 너비를 저장하는 변수

function windowResized() {
  let currentWidth = window.innerWidth;  // 현재 너비를 얻음
  if (currentWidth !== previousWidth) {  // 이전 너비와 현재 너비가 다른 경우에만 리셋
    resetSketch();
    previousWidth = currentWidth;  // 현재 너비를 이전 너비로 업데이트
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

