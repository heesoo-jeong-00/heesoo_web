// entireMainPage 요소에 넣기 위한 인스턴스 모드에서의 p5 스케치
var myp5 = new p5(function (sketch) {
    let circles = [];
    const circleSize = 10; // 원의 크기
    let setColor = null; // 클릭 시 설정될 색상
    let prevSetColor = null; // 이전에 설정된 색상
    const randomOffsetRange = 15; // 랜덤 오프셋 범위

    // 캔버스와 원들을 설정하는 부분을 초기화하는 함수로 분리
    function setupCanvas() {
        let container = sketch.select('#entireMainPage');
        let cnvWidth = container.width;
        let cnvHeight = container.height;
        sketch.createCanvas(cnvWidth, cnvHeight).parent('entireMainPage');
        sketch.colorMode(sketch.RGB);
        circles = []; // 배열을 재설정
        for (let x = 0; x < sketch.width; x += circleSize) {
            for (let y = 0; y < sketch.height; y += circleSize) {
                circles.push(new Circle(x, y, sketch));
            }
        }
    }

    sketch.setup = function() {
        setupCanvas(); // 캔버스와 원들을 초기화
    };

    sketch.draw = function() {
        sketch.background(255);

        circles.forEach(circle => {
            circle.hover(sketch.mouseX, sketch.mouseY);
            circle.display();
        });
    };

    class Circle {
        constructor(x, y, p5) {
            this.x = x;
            this.y = y;
            this.sketch = p5;
            this.defaultColor = [255, 214, 0]; // 초기값: 노랑
            this.color = [255, 255, 255]; // 초기값: 흰색
            this.randomOffset = this.sketch.random(-randomOffsetRange / 2, randomOffsetRange / 2);
        }

        hover(mx, my) {
            let d = this.sketch.dist(mx, my, this.x, this.y) + this.randomOffset;
            if (d < circleSize * 5) {
                this.color = setColor ? setColor : this.defaultColor;
            } else {
                this.color = [255, 255, 255];
            }
        }

        display() {
            this.sketch.fill(this.color);
            this.sketch.noStroke();
            this.sketch.ellipse(this.x, this.y, circleSize);
        }
    }

    sketch.mouseClicked = function() {
        let colors = [
            [255, 214, 0], // yellow
            [255, 61, 0],  // red
            [53, 134, 255] // blue
        ];

        if (prevSetColor !== null) {
            colors = colors.filter(c => !(c[0] === prevSetColor[0] && c[1] === prevSetColor[1] && c[2] === prevSetColor[2]));
        }

        const newColor = sketch.random(colors);
        setColor = newColor;
        prevSetColor = newColor;
    };

    // 창 크기가 변경될 때 실행될 함수 추가
    sketch.windowResized = function() {
        setupCanvas(); // 캔버스와 원들을 다시 설정
    };
}, 'entireMainPage');
