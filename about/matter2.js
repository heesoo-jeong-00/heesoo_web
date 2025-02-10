// entireMainPage 요소 안에 p5 스케치를 넣기 위한 인스턴스 모드 설정
var myp5 = new p5(function (sketch) {
  
  let currentColor; // 현재 선의 색상
  let lineWidth = 10; // 선의 굵기
  let linePoints = []; // 선의 중간 지점들과 투명도를 저장할 배열

  sketch.setup = function () {
    // entireMainPage 요소의 크기를 계산
    let container = sketch.select('#entireMainPage');
    let cnvWidth = container.width;
    let cnvHeight = container.height; // 동적으로 설정 가능

    // 캔버스 생성 및 entireMainPage 요소에 삽입
    var canvas = sketch.createCanvas(cnvWidth, cnvHeight);
    canvas.parent('entireMainPage'); // 캔버스를 entireMainPage 요소의 자식으로 설정
    sketch.background(255); // 배경색 설정
    currentColor = sketch.color(255, 214, 0); // 초기 선의 색상 설정
    sketch.noFill(); // 선의 채우기를 비활성화
  };

  sketch.draw = function () {
    sketch.background(255, 255, 255, 35); // 전체 화면을 약간 투명한 흰색으로 덮어서 이전 선들을 서서히 페이드아웃
  
    if (sketch.mouseIsPressed || sketch.dist(sketch.pmouseX, sketch.pmouseY, sketch.mouseX, sketch.mouseY) > 1) {
      let distance = sketch.dist(sketch.pmouseX, sketch.pmouseY, sketch.mouseX, sketch.mouseY);
      let segments = sketch.int(distance / 1);

      for (let i = 0; i < segments; i++) {
        let x = sketch.lerp(sketch.pmouseX, sketch.mouseX, i / segments);
        let y = sketch.lerp(sketch.pmouseY, sketch.mouseY, i / segments);
        linePoints.push({pos: sketch.createVector(x, y), alpha: 255}); // 위치와 최대 투명도로 선분을 배열에 추가
      }
    }

    for (let i = linePoints.length - 1; i >= 0; i--) {
      let p1 = linePoints[i];
      if (i > 0) {
        let p2 = linePoints[i - 1];
        sketch.stroke(currentColor.levels[0], currentColor.levels[1], currentColor.levels[2], p1.alpha);
        sketch.strokeWeight(lineWidth);
        sketch.line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
      }
      p1.alpha -= 10; // 투명도를 더 빠르게 감소시켜서 선이 빠르게 사라지게 함
      if (p1.alpha <= 0) {
        linePoints.splice(i, 1); // 투명도가 0 이하가 되면 선분을 배열에서 제거
      }
    }
  };

  sketch.mousePressed = function () {
    let colors = [
      sketch.color(255, 214, 0), // yellow
      // sketch.color(255, 61, 0),  // red
      // sketch.color(53, 134, 255) // blue
    ];
    currentColor = sketch.random(colors);
  };

  sketch.mouseDragged = function () {
    let distance = sketch.dist(sketch.pmouseX, sketch.pmouseY, sketch.mouseX, sketch.mouseY);
    let thickness = sketch.map(distance, 0, 100, 10, 2);
    lineWidth = thickness;
  };

  // 창 크기 변경 시 호출될 함수를 추가
  sketch.windowResized = function () {
    resetSketch(); // 스케치를 재설정하여 요소들을 처음부터 다시 로드
  };

  // 스케치 재설정 함수 정의
  function resetSketch() {
    let container = sketch.select('#entireMainPage');
    sketch.resizeCanvas(container.width, container.height);
    sketch.background(255); // 배경색을 다시 설정
  }

}, 'entireMainPage');
