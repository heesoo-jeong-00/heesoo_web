// entireMainPage 요소 안에 p5 스케치를 넣기 위한 인스턴스 모드 설정
var myp5 = new p5(function (sketch) {
  let circles = [];
  const circleSize = 5; // 원의 크기를 더 작게 조정
  let setColor = null; // 클릭할 때 설정되는 색

  sketch.setup = function() {
    let container = sketch.select('#entireMainPage');
    let cnvWidth = container.width;
    let cnvHeight = container.height;

    sketch.createCanvas(cnvWidth, cnvHeight).parent('entireMainPage');

    // 캔버스 전체를 작은 하얀 원들로 채움
    for (let x = 0; x < sketch.width; x += circleSize) {
      for (let y = 0; y < sketch.height; y += circleSize) {
        circles.push(new Circle(x, y, sketch));
      }
    }
  };

  sketch.draw = function() {
    sketch.background(255);

    for (let circle of circles) {
      circle.hover(sketch.mouseX, sketch.mouseY);
      circle.display();
    }
  };

  sketch.mouseClicked = function() {
    // 클릭 시 하단의 색상 중 무작위로 선택
    let colors = [
      sketch.color(255, 214, 0), // yellow
      sketch.color(255, 61, 0),  // red
      sketch.color(53, 134, 255) // blue
    ];
    setColor = sketch.random(colors);
  };

  // 창 크기 변경 시 호출될 함수
  sketch.windowResized = function() {
    resetSketch(); // 스케치를 재설정하여 요소들을 처음부터 다시 로드
  };

  // 스케치 재설정 함수 정의
  function resetSketch() {
    let container = sketch.select('#entireMainPage');
    sketch.resizeCanvas(container.width, container.height);
    circles = []; // 원 배열 초기화
    for (let x = 0; x < sketch.width; x += circleSize) {
      for (let y = 0; y < sketch.height; y += circleSize) {
        circles.push(new Circle(x, y, sketch));
      }
    }
  }

  class Circle {
    constructor(x, y, p5) {
      this.x = x;
      this.y = y;
      this.sketch = p5;
      this.defaultColor = p5.color(255, 214, 0); // 초기값 yellow
      this.color = p5.color(255, 214, 0); // 초기값 yellow
    }

    hover(mx, my) {
      let d = this.sketch.dist(mx, my, this.x, this.y);
      let alpha = 255 - this.sketch.map(this.sketch.constrain(d, 0, circleSize * 20), 0, circleSize * 20, 0, 255);
      if (d < circleSize * 200) {
        this.color = setColor ? setColor : this.defaultColor;
        this.color.setAlpha(alpha);
      } else {
        this.color = this.sketch.color(255);
      }
    }

    display() {
      this.sketch.fill(this.color);
      this.sketch.noStroke();
      this.sketch.ellipse(this.x, this.y, circleSize);
    }
  }
}, 'entireMainPage');
