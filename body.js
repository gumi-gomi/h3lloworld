(function() {
  function init() {
    // Elements for overlay/slide
    const overlays = [
      document.querySelector('.flower-image.overlay1'),
      document.querySelector('.flower-image.overlay2'),
      document.querySelector('.flower-image.overlay3'),
      document.querySelector('.flower-image.overlay4'),
      document.querySelector('.flower-image.overlay5')
    ];
    const base = document.querySelector('.flower-image.base');
    const overlay1 = document.querySelector('.flower-image.overlay1');
    const mainInner = document.querySelector('#main-section .main-inner');
    const body2 = document.querySelector('.body2');

    // Element for moving GIF
    const manGif = document.querySelector('.detail1');

    // Elements for product positioning
    const productEl = document.querySelector('.product');
    const body4El = document.querySelector('.body4');

    // Verify all required elements are present
    if (!base || !overlay1 || !mainInner || !body2 || !manGif || !productEl || !body4El) {
      console.warn('필수 요소가 누락되어 JS 실행 중단됨');
      return;
    }

    // Variables for horizontal slide animation
    let currentX = 0;
    let targetX = 0;
    const easing = 0.1;

    // Update overlay fade and base image fade
    function updateOverlays() {
      const scrollY = window.scrollY;
      overlays.forEach((el, index) => {
        if (!el) return;
        const start = 200 * (index + 1);
        const end = start + 200;
        if (scrollY < start) el.style.opacity = 0;
        else if (scrollY <= end) el.style.opacity = (scrollY - start) / 200;
        else el.style.opacity = 1;
      });

      if (scrollY < 500) base.style.opacity = 1;
      else if (scrollY <= 600) base.style.opacity = 1 - ((scrollY - 500) / 100);
      else {
        base.style.opacity = 0;
        overlay1.style.opacity = 0;
      }
    }

    // Calculate targetX for sliding mainInner
    function updateSlide() {
      const scrollY = window.scrollY;
      const body2Top = body2.offsetTop + 300;
      const sectionH = 1600;
      const mainInnerWidth = mainInner.scrollWidth;
      const body2Width = body2.clientWidth;
      const maxMoveX = mainInnerWidth - body2Width;
      let slideScrollY = scrollY - body2Top;
      slideScrollY = Math.min(Math.max(slideScrollY, 0), sectionH);
      targetX = (slideScrollY / sectionH) * maxMoveX;
    }

    // Horizontal animation loop
    function animate() {
      currentX += (targetX - currentX) * easing;
      mainInner.style.transform = `translateX(-${currentX}px)`;
      requestAnimationFrame(animate);
    }

    // Move manGif from left:100% to left:60% based on scroll within body2
    function updateManGif() {
      const scrollY = window.scrollY;
      const top = body2.offsetTop;
      const height = body2.clientHeight;
      const winH = window.innerHeight;
      const startY = top - winH;
      const endY = top + height;
      let t = (scrollY - startY) / (endY - startY);
      t = Math.min(Math.max(t, 0), 1);
      const leftPct = 100 + (60 - 100) * t;
      manGif.style.left = `${leftPct}%`;
    }

    // Change productEl.top when scrolling past 50% of body4
    function updateProductPosition() {
      const scrollY = window.scrollY;
      const body4Top = body4El.offsetTop;
      const body4Height = body4El.clientHeight;
      const triggerY = body4Top - body4Height * 0.5;
      productEl.style.top = scrollY >= triggerY ? '50px' : '-500px';
    }

    // Combined scroll handler
    function onScroll() {
      updateOverlays();
      updateSlide();
      updateManGif();
      updateProductPosition();
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);

    animate();      // start horizontal animation loop
    onScroll();     // initial positions updated
  }

  // Initialize after DOM content is loaded
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
/* document.addEventListener('wheel', e => {
  if (e.ctrlKey) {
    e.preventDefault(); // ctrl+휠 스크롤일 때 줌 막음
  }
}, { passive: false });

// Ctrl + '+' / '-' 단축키 막기
document.addEventListener('keydown', e => {
  if ((e.ctrlKey||e.metaKey) && ['=','-','+','_'].includes(e.key)) {
    e.preventDefault();
  }
}); 
window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.zoom = '100%';
}); */