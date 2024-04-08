// entireMainPage 요소 안에 p5 스케치를 넣기 위한 인스턴스 모드 설정
var myp5 = new p5(function (sketch) {

  sketch.setup = function () {
      setupCanvas(); // 캔버스 설정을 위한 함수 호출
  };

  // 캔버스 설정을 위한 함수 정의
  function setupCanvas() {
      let container = sketch.select('#entireMainPage');
      let cnvWidth = container.width;
      let cnvHeight = container.height;
      sketch.createCanvas(cnvWidth, cnvHeight).parent('entireMainPage');
      sketch.noStroke();
  }

  sketch.draw = function () {
      sketch.background(255); // 오타 수정: 배경색 설정 (256 -> 255)

      // 움직이는 원 그리기
      var x = sketch.width / 2 + sketch.cos(sketch.frameCount * 0.05) * 100;
      var y = sketch.height / 2 + sketch.sin(sketch.frameCount * 0.05) * 100;
      sketch.fill(255, 214, 0); // 채우기 색상 설정
      sketch.ellipse(x, y, 50, 50); // 원 그리기
  };

  // 창 크기가 변경될 때 호출될 함수
  sketch.windowResized = function () {
      setupCanvas(); // 캔버스 크기 재설정
  };

}, 'entireMainPage');
