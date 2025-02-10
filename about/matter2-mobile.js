// entireMainPage 요소 안에 p5 스케치를 넣기 위한 인스턴스 모드 설정
var myp5 = new p5(function (sketch) {
  
  let currentColor; // 현재 선의 색상
  let lineWidth = 10; // 선의 굵기
  let linePoints = []; // 선의 중간 지점들과 투명도를 저장할 배열

  sketch.setup = function () {
    // entireMainPage 요소의 크기를 계산하여 캔버스 설정
    setupCanvas();
  };

  function setupCanvas() {
    let container = sketch.select('#entireMainPage');
    let cnvWidth = container.width;
    let cnvHeight = container.height;
    var canvas = sketch.createCanvas(cnvWidth, cnvHeight);
    canvas.parent('entireMainPage');
    sketch.background(255);
    currentColor = sketch.color(255, 214, 0);
    sketch.noFill();
  }

  sketch.draw = function () {
    sketch.background(255, 255, 255, 35);
  
    if (sketch.mouseIsPressed || sketch.dist(sketch.pmouseX, sketch.pmouseY, sketch.mouseX, sketch.mouseY) > 1) {
      let distance = sketch.dist(sketch.pmouseX, sketch.pmouseY, sketch.mouseX, sketch.mouseY);
      let segments = sketch.int(distance / 1);

      for (let i = 0; i < segments; i++) {
        let x = sketch.lerp(sketch.pmouseX, sketch.mouseX, i / segments);
        let y = sketch.lerp(sketch.pmouseY, sketch.mouseY, i / segments);
        linePoints.push({pos: sketch.createVector(x, y), alpha: 255});
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
      p1.alpha -= 10;
      if (p1.alpha <= 0) {
        linePoints.splice(i, 1);
      }
    }
  };

  sketch.mousePressed = function () {
    let colors = [
      sketch.color(255, 214, 0),
    ];
    currentColor = sketch.random(colors);
  };

  sketch.mouseDragged = function () {
    let distance = sketch.dist(sketch.pmouseX, sketch.pmouseY, sketch.mouseX, sketch.mouseY);
    let thickness = sketch.map(distance, 0, 100, 10, 2);
    lineWidth = thickness;
  };
  
  // 창 크기가 변경될 때 실행될 함수
  sketch.windowResized = function () {
    setupCanvas(); // 캔버스 크기 재설정
  };
  
}, 'entireMainPage');
