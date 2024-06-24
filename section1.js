let fullText = `Hi :) I'm Heesoo, an interaction
and visual designer based in NYC.
    
I'm passionate about connecting
with diverse users through equitable design.`;

let lines; // 전체 텍스트를 줄별로 분리한 배열
let index = 0; // 현재까지 출력된 문자의 인덱스
let maxFrameCount = 3; // 각 글자 사이의 프레임 간격
let finishedTyping = false; // 타이핑 효과 완료 여부
let highlightInfo = []; // 하이라이트 정보를 저장하는 배열

// creative의 시작을 늦추기 위한 변수
let creativeDelay = 4;

let Lineal; // 폰트를 저장할 변수

function setup() {
  resetSketch();
}

function resetSketch() {

  // header의 높이를 얻음
  let headerHeight = document.querySelector('#header').offsetHeight;

  // windowHeight에서 header의 높이를 빼서 새로운 canvas 높이를 설정
  let canvasHeight = windowHeight - headerHeight;
  let section1Height = canvasHeight - headerHeight;

  let canvas = createCanvas(windowWidth, section1Height, P2D);
  canvas.parent('section1');

  textFont('Jura');
  adjustTextSize(); // 텍스트 크기 조정
  textAlign(CENTER, CENTER);
  // textStyle(BOLD);

  lines = fullText.split('\n');
  index = 0; // 인덱스를 다시 0으로 초기화
  finishedTyping = false; // 타이핑 효과를 다시 시작하기 위해 false로 설정
  highlightInfo = [];
  highlightInfo.push({ word: "Heesoo", color: [255, 214, 0], lineIndex: 1, startFrame: null, currentWidth: 0 });
  highlightInfo.push({ word: "multidisciplinary", color: [114, 175, 255], lineIndex: 2, startFrame: null, currentWidth: 0 });
}

function draw() {
  background(255);

  if (index < fullText.length) {
    if (frameCount % maxFrameCount === 0) {
      index++;
    }
  } else {
    finishedTyping = true;
  }

  fill(0); // 텍스트 색상을 검정으로 설정
  let tempText = fullText.substring(0, index);
  let tempLines = tempText.split('\n');
  for (let i = 0; i < tempLines.length; i++) {
    text(tempLines[i], width / 2, getLineY(i, tempLines.length));
  }

  // // 하이라이트 그리기
  // if (finishedTyping) {
  //   highlightInfo.forEach((info, idx) => {
  //     if (info.startFrame === null) {
  //       info.startFrame = frameCount + (info.word === "creative" ? creativeDelay : 0);
  //     }
  //     drawHighlight(info, idx);
  //   });
  // }
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
    translate(x, y - textAscent() / 3);
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
  let lineHeight = textAscent() + textDescent() + 6;
  return (height / 2) - (lineHeight * (totalLines - 1) / 2) + (lineHeight * lineIndex);
}

function adjustTextSize() {
  if (windowWidth >= 1600) {
    textSize(46);
  } else if (windowWidth >= 1024) {
    textSize(36);
  } else {
    textSize(28);
  }
}

let previousWidth = window.innerWidth;  // 초기 너비를 저장하는 변수

function windowResized() {
  let currentWidth = window.innerWidth;  // 현재 너비를 얻음
  if (currentWidth !== previousWidth) {  // 이전 너비와 현재 너비가 다른 경우에만 리셋
    adjustTextSize(); // 텍스트 크기 조정
    resetSketch();
    previousWidth = currentWidth;  // 현재 너비를 이전 너비로 업데이트
  }
}
