// ------- 기존 유지: 커서 관련 --------
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
    case 'top1':
    case 'top2':
    case 'top3':
    case 'main1':
    case 'main2':
    case 'main3':
    case 'main4':
    case 'bottomItem1':
    case 'bottomItem2':
    case 'bottomItem3':
      if (stage === e.target.getAttribute('data-cursor')) return;
      stage = e.target.getAttribute('data-cursor');
      scale = (['top1', 'top2', 'top3', 'main4', 'bottomItem1', 'bottomItem2', 'bottomItem3'].includes(stage)) ? 2 : 1;
      break;
  }
  cursorChild.style.setProperty('--cursor-scale', scale);
}

function mousedown(e) {
  scale *= 0.75;
  cursorChild.style.setProperty('--cursor-scale', scale);
}
function mouseup(e) {
  scale *= 1.25;
  cursorChild.style.setProperty('--cursor-scale', scale);
}

// ------- 기존 유지: 스크롤 시 headerBox 축소 --------
const headerBox = document.getElementById('headerBox');
const topBoxes = document.getElementById('topBoxes');
const topBox = document.querySelectorAll('.topBox');
const logo = document.getElementById('logo');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    if (!headerBox.dataset.isExpanded) {
      headerBox.classList.add('scrolled');
      topBoxes.classList.add('scrolled');
      topBox.forEach(box => box.classList.add('scrolled'));
      logo.style.pointerEvents = 'none';
    }
  } else {
    headerBox.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
    logo.style.pointerEvents = 'auto';
    headerBox.dataset.isExpanded = 'true';
  }
});

headerBox.addEventListener('click', function () {
  if (this.classList.contains('scrolled')) {
    this.classList.remove('scrolled');
    topBoxes.classList.remove('scrolled');
    topBox.forEach(box => box.classList.remove('scrolled'));
    logo.style.pointerEvents = 'auto';
    headerBox.dataset.isExpanded = 'true';
  }
});

window.addEventListener('scroll', function () {
  if (window.scrollY > 50 && headerBox.dataset.isExpanded === 'true') {
    headerBox.classList.add('scrolled');
    topBoxes.classList.add('scrolled');
    topBox.forEach(box => box.classList.add('scrolled'));
    logo.style.pointerEvents = 'none';
    headerBox.dataset.isExpanded = 'false';
  }
});

// ------- 기존 유지: 페이지 로드 시 boxes 투명도 조정 --------
document.addEventListener('DOMContentLoaded', function () {
  const boxes = document.querySelectorAll('.boxes');
  boxes.forEach(el => {
    el.style.opacity = 1;
  });
});

// ------- 기존 유지: <br> 태그 모바일에서 삭제 --------
let storedBrs = [];

function removeBrOnMobile() {
  if (window.innerWidth <= 767) {
    document.querySelectorAll('br').forEach((br, index) => {
      storedBrs.push({ parent: br.parentNode, nextSibling: br.nextSibling });
      br.remove();
    });
  } else {
    restoreBrOnDesktop();
  }
}

function restoreBrOnDesktop() {
  if (storedBrs.length > 0) {
    storedBrs.forEach(({ parent, nextSibling }) => {
      if (parent) {
        const newBr = document.createElement('br');
        if (nextSibling) {
          parent.insertBefore(newBr, nextSibling);
        } else {
          parent.appendChild(newBr);
        }
      }
    });
    storedBrs = [];
  }
}

window.addEventListener('DOMContentLoaded', removeBrOnMobile);
window.addEventListener('resize', removeBrOnMobile);

//

document.addEventListener('DOMContentLoaded', () => {
  const mainPreviewWrapper = document.getElementById('mainPreviewWrapper');
  const scrollContainer = document.getElementById('workPreviewScroll');

  function setupThumbnailClicks() {
    const thumbnails = document.querySelectorAll('.workThumbnail');
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const type = thumb.getAttribute('data-type');
        const src = thumb.getAttribute('data-src');
        const link = thumb.getAttribute('data-link');
        const title = thumb.getAttribute('data-title');
        const subtitle = thumb.getAttribute('data-subtitle');

        // 기존 메인 삭제
        mainPreviewWrapper.innerHTML = '';

        // 새로운 링크 생성
        const newLink = document.createElement('a');
        newLink.id = 'mainImageLink';
        newLink.href = link;
        newLink.target = '_blank';

        const newPreview = document.createElement('div');
        newPreview.id = 'mainPreview';

        if (type === 'video') {
          const video = document.createElement('video');
          video.id = 'mainVideo';
          video.setAttribute('autoplay', '');
          video.setAttribute('loop', '');
          video.setAttribute('muted', '');
          video.setAttribute('playsinline', '');
          video.innerHTML = `<source src="${src}" type="video/mp4">`;
          video.className = 'mainMedia';
          newPreview.appendChild(video);
        } else {
          const img = document.createElement('img');
          img.src = src;
          img.id = 'mainImage';
          img.alt = title;
          img.className = 'mainMedia';
          newPreview.appendChild(img);
        }

        const blackbox = document.createElement('div');
        blackbox.className = 'blackboxes';
        blackbox.id = 'mainBlackbox';
        blackbox.innerHTML = `
          <p class="title" id="mainTitle">${title}</p>
          <p class="subtitle" id="mainSubtitle">${subtitle}</p>
        `;

        newPreview.appendChild(blackbox);
        newLink.appendChild(newPreview);
        mainPreviewWrapper.appendChild(newLink);

        newPreview.addEventListener('mouseenter', () => {
          blackbox.classList.add('visible');
        });
        newPreview.addEventListener('mouseleave', () => {
          blackbox.classList.remove('visible');
        });

        blackbox.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(link, '_blank');
        });
      });
    });
  }

  setupThumbnailClicks();

  // ✅ 무한 스크롤을 더 자연스럽게
  const scrollSpeed = 0.25;

  // 스크롤 복제 여러번
  const cloneCount = 5; // ★★★ 필요하면 더 늘릴 수도 있어
  const originalContent = scrollContainer.innerHTML;
  for (let i = 0; i < cloneCount; i++) {
    scrollContainer.innerHTML += originalContent;
  }

  function autoScroll() {
    scrollContainer.scrollLeft += scrollSpeed;

    // ★★★ 자연스러운 무한스크롤
    if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
      scrollContainer.scrollLeft = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  // 복제한 썸네일까지 클릭이벤트 다시 걸어주기
  setTimeout(() => {
    setupThumbnailClicks();
  }, 500);
});


document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video[data-src]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        if (!video.querySelector('source')) {
          const source = document.createElement('source');
          source.src = video.dataset.src;
          source.type = 'video/mp4';
          video.appendChild(source);
          video.load();
        }
      }
    });
  }, {
    root: null,
    threshold: 0.2
  });

  videos.forEach(video => {
    observer.observe(video);
  });
});
