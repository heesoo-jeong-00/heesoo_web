let sound, fft;
let angleOffset = 0;
let numSegments = 10;
let rotationSpeed = 0.3;
let complexity = 1;
let maxWaveSize = 150;
let lineThickness = 0.2;
let repeatFactor = 1;
let minWaveSize = 10;
let audioContextStarted = false;

function preload() {
  sound = loadSound("assets/sound1.mp3"); // 사운드 파일 미리 로드
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  fft = new p5.FFT();
  noFill();
  angleMode(DEGREES);
  colorMode(HSL);

  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("Click anywhere to start", width / 2, height / 2);
}

function draw() {
  if (audioContextStarted) { // 오디오 컨텍스트가 시작되었는지 확인
    background(0);
    translate(width / 2, height / 2);
  
    let waveform = fft.waveform();
    strokeWeight(lineThickness);
  
    for (let j = 0; j < numSegments * repeatFactor; j++) {
      drawSegment(j, waveform);
    }
    angleOffset += rotationSpeed;
  }
}

function drawSegment(index, waveform) {
  push();
  rotate(angleOffset + (360 / (numSegments * repeatFactor)) * index);
  
  let waveformValue = waveform[index * Math.floor(waveform.length / numSegments)];
  waveformValue = max(waveformValue, minWaveSize / maxWaveSize);
  
  let h = map((mouseX + waveformValue * width) / 2, 0, width, 0, 360);
  let s = map((mouseY + abs(waveformValue) * height) / 2, 0, height, 50, 100);
  
  stroke(color(h, s, 50));
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let angle = map(i, 0, waveform.length - 1, 0, 360);
    let wave = pow(waveform[i], complexity) * maxWaveSize + 150;
    wave = max(wave, minWaveSize);
  
    let scale = map(mouseX, 0, width, 0.5, 2);
    scale = max(scale, 0.5);
  
    let x = cos(angle) * wave * scale;
    let y = sin(angle) * wave * scale;
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  if (!audioContextStarted) {
    userStartAudio();
    audioContextStarted = true;
    if (sound.isLoaded()) {
      sound.loop();
    }
  } else if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play();
  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      rotationSpeed += 0.1;
      break;
    case DOWN_ARROW:
      rotationSpeed = max(0, rotationSpeed - 0.1);
      break;
    case LEFT_ARROW:
      complexity = max(1, complexity - 0.1);
      break;
    case RIGHT_ARROW:
      complexity = min(5, complexity + 0.1);
      break;
    case 87: // 'W' key increases wave size
      maxWaveSize = min(800, maxWaveSize + 75);
      break;
    case 83: // 'S' key decreases wave size
      maxWaveSize = max(10, maxWaveSize - 75);
      break;
    case 68: // 'D' key increases line thickness
      lineThickness = min(5, lineThickness + 0.3);
      break;
    case 65: // 'A' key decreases line thickness
      lineThickness = max(0.2, lineThickness - 0.3);
      break;
    case 69: // 'E' key increases number of segments
      numSegments = constrain(numSegments + 3, 1, 60);
      break;
    case 81: // 'Q' key decreases number of segments
      numSegments = constrain(numSegments - 3, 1, 60);
      break;
  }
}
