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













const { Engine, Render, Runner, World, Bodies, Body, Events, Composite } = Matter;

let engine = Engine.create();
let { world } = engine;
let render = Render.create({
    element: document.body,
    engine: engine,
    canvas: document.getElementById("matter-canvas"),
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'white'
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 10, {
    isStatic: true,
    render: {
        visible: false
    }
});
World.add(world, ground);

const colors = ['red', 'blue', 'yellow'];
let timerId = setInterval(() => {
    for (let i = 0; i < 3; i++) {
        const x = Math.random() * window.innerWidth;
        const size = Math.random() * 6 + 5;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const shape = Bodies.circle(x, 0, size, {
            render: {
                fillStyle: randomColor,
                lineWidth: 0
            },
            restitution: 0.5
        });
        World.add(world, shape);
    }
}, 5);


setTimeout(() => {
    clearInterval(timerId);
}, 2600);

let magnetActive = false;
setTimeout(() => {
    magnetActive = true;
}, 3500);



let video;
let poseNet;
let poses = [];

function setup() {
    video = createCapture(VIDEO);
    video.id('video');
    video.size(window.innerWidth, window.innerHeight);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', function (results) {
        poses = results;
    });
}

function modelLoaded() {
    console.log('PoseNet Model Loaded');
}




const armKeyPoints = ['leftElbow', 'rightElbow', 'leftWrist', 'rightWrist'];
const bodyKeyPoints = ['leftShoulder', 'rightShoulder', 'leftHip', 'rightHip'];


let armPoints = [];
let bodyPoints = [];

Events.on(engine, 'afterUpdate', function () {
    if (!magnetActive || poses.length === 0) {
        return;
    }

    if (poses.length > 0) {

        armPoints = poses[0].pose.keypoints.filter(keypoint => armKeyPoints.includes(keypoint.part))
            .map(keypoint => {
                return { x: window.innerWidth - keypoint.position.x, y: keypoint.position.y };
            });


        bodyPoints = poses[0].pose.keypoints.filter(keypoint => bodyKeyPoints.includes(keypoint.part))
            .map(keypoint => {
                return { x: window.innerWidth - keypoint.position.x, y: keypoint.position.y };
            });
    }

    if (!magnetActive) {
        return;
    }


    const armBoundaryX = (armPoints[0].x + armPoints[1].x) / 2;


    if (bodyPoints.length > 0) {

        const shoulderCenterX = (bodyPoints[0].x + bodyPoints[1].x) / 2;
        const shoulderCenterY = (bodyPoints[0].y + bodyPoints[1].y) / 2;


        const shoulderDistance = Math.abs(bodyPoints[0].x - bodyPoints[1].x);

        const allBodies = Composite.allBodies(world);
        allBodies.forEach(function (body) {
            if (!body.isStatic) {
                const dx = shoulderCenterX - body.position.x;
                const dy = shoulderCenterY - body.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < shoulderDistance * 0.8) { 
                    const forceMagnitude = 6e-4;
                    const force = {
                        x: dx / distance * forceMagnitude,
                        y: dy / distance * forceMagnitude
                    };
                    Body.applyForce(body, body.position, force);
                }
            }
        });
    }


if (armPoints.length > 0) {
    const allBodies = Composite.allBodies(world);
    allBodies.forEach(function (body) {
        if (!body.isStatic) {
            armPoints.forEach(armPoint => {
                const dx = armPoint.x - body.position.x;
                const dy = armPoint.y - body.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) { 
                    const forceMagnitude = 10e-4; 
                    const force = {
                        x: dx / distance * forceMagnitude,
                        y: dy / distance * forceMagnitude
                    };
                    Body.applyForce(body, body.position, force);
                }
            });
        }
    });
}


});

window.addEventListener('resize', () => {
    Render.setPixelRatio(render, window.devicePixelRatio);
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: window.innerHeight }
    });
});

