// Core Slide Deck Engine
class SlideDeck {
  constructor() {
    this.viewport = document.querySelector('.deck-viewport');
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.currentIndex = 0;
    this.isOverview = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.counterEl = document.getElementById('slideCounter');
    this.progressBar = document.getElementById('deckProgressBar');

    this.init();
  }

  init() {
    this.updateViewportScale();
    window.addEventListener('resize', () => this.updateViewportScale());

    // Initial slide from hash if available
    const hash = window.location.hash;
    const match = hash.match(/#slide-(\d+)/);
    if (match) {
      const idx = parseInt(match[1], 10) - 1;
      if (idx >= 0 && idx < this.slides.length) {
        this.currentIndex = idx;
      }
    }

    this.showSlide(this.currentIndex, false);
    this.setupEvents();
  }

  updateViewportScale() {
    if (this.isOverview) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const baseW = 1920;
    const baseH = 1080;
    const scale = Math.min(w / baseW, h / baseH);
    if (this.viewport) {
      this.viewport.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
  }

  showSlide(index, animate = true) {
    if (index < 0) index = 0;
    if (index >= this.slides.length) index = this.slides.length - 1;

    const prevIndex = this.currentIndex;
    this.currentIndex = index;

    this.slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'prev');
      if (idx === index) {
        slide.classList.add('active');
      } else if (idx < index) {
        slide.classList.add('prev');
      }
    });

    // Update Counter & Progress
    if (this.counterEl) {
      this.counterEl.textContent = `${this.currentIndex + 1} / ${this.slides.length}`;
    }
    if (this.progressBar) {
      const progress = ((this.currentIndex + 1) / this.slides.length) * 100;
      this.progressBar.style.width = `${progress}%`;
    }

    // Hash sync
    window.location.hash = `slide-${this.currentIndex + 1}`;

    // Presenter Notes
    const activeSlide = this.slides[this.currentIndex];
    const notes = activeSlide ? activeSlide.getAttribute('data-notes') : '';
    if (window.presenterHUD) {
      window.presenterHUD.updateNotes(notes);
    }

    // Audio SFX
    if (animate && window.soundFX && prevIndex !== this.currentIndex) {
      window.soundFX.playSwoosh();
    }
  }

  next() {
    if (this.currentIndex < this.slides.length - 1) {
      this.showSlide(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.showSlide(this.currentIndex - 1);
    }
  }

  toggleOverview() {
    this.isOverview = !this.isOverview;
    const body = document.body;
    const overviewBtn = document.getElementById('btnOverview');

    if (this.isOverview) {
      body.classList.add('overview-mode');
      if (overviewBtn) overviewBtn.classList.add('active');
      // Scroll current slide into view
      const activeSlide = this.slides[this.currentIndex];
      if (activeSlide) {
        setTimeout(() => activeSlide.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      }
    } else {
      body.classList.remove('overview-mode');
      if (overviewBtn) overviewBtn.classList.remove('active');
      this.updateViewportScale();
    }
    if (window.soundFX) window.soundFX.playClick();
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    if (window.soundFX) window.soundFX.playClick();
  }

  setupEvents() {
    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {
      // If typing in inputs, ignore
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
        case 'l':
          if (this.isOverview) return;
          this.next();
          break;
        case 'ArrowLeft':
        case 'Backspace':
        case 'PageUp':
        case 'h':
          if (this.isOverview) return;
          this.prev();
          break;
        case 'Home':
          this.showSlide(0);
          break;
        case 'End':
          this.showSlide(this.slides.length - 1);
          break;
        case 'Escape':
        case 'o':
        case 'O':
          this.toggleOverview();
          break;
        case 'f':
        case 'F':
          this.toggleFullscreen();
          break;
        case 's':
        case 'S':
          if (window.presenterHUD) {
            const isOpen = window.presenterHUD.toggle();
            const btn = document.getElementById('btnNotes');
            if (btn) btn.classList.toggle('active', isOpen);
          }
          break;
        case 'p':
        case 'P':
          if (window.laserTool) {
            const active = window.laserTool.toggleLaser();
            const btn = document.getElementById('btnLaser');
            if (btn) btn.classList.toggle('active', active);
          }
          break;
        case 'd':
        case 'D':
          if (window.laserTool) {
            const active = window.laserTool.togglePen();
            const btn = document.getElementById('btnPen');
            if (btn) btn.classList.toggle('active', active);
          }
          break;
        case 'c':
        case 'C':
          if (window.laserTool) {
            window.laserTool.clearCanvas();
          }
          break;
      }
    });

    // Overview slide selection click
    this.slides.forEach((slide, idx) => {
      slide.addEventListener('click', () => {
        if (this.isOverview) {
          this.isOverview = false;
          document.body.classList.remove('overview-mode');
          const btn = document.getElementById('btnOverview');
          if (btn) btn.classList.remove('active');
          this.updateViewportScale();
          this.showSlide(idx);
        }
      });
    });

    // Touch Swipe for mobile/tablet presentation
    window.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.next();
        else this.prev();
      }
    }, { passive: true });

    // Floating UI Buttons
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnOverview = document.getElementById('btnOverview');
    const btnNotes = document.getElementById('btnNotes');
    const btnLaser = document.getElementById('btnLaser');
    const btnPen = document.getElementById('btnPen');
    const btnSound = document.getElementById('btnSound');
    const btnFullscreen = document.getElementById('btnFullscreen');

    if (btnPrev) btnPrev.addEventListener('click', () => this.prev());
    if (btnNext) btnNext.addEventListener('click', () => this.next());
    if (btnOverview) btnOverview.addEventListener('click', () => this.toggleOverview());
    if (btnNotes) btnNotes.addEventListener('click', () => {
      if (window.presenterHUD) {
        const isOpen = window.presenterHUD.toggle();
        btnNotes.classList.toggle('active', isOpen);
      }
    });
    if (btnLaser) btnLaser.addEventListener('click', () => {
      if (window.laserTool) {
        const active = window.laserTool.toggleLaser();
        btnLaser.classList.toggle('active', active);
      }
    });
    if (btnPen) btnPen.addEventListener('click', () => {
      if (window.laserTool) {
        const active = window.laserTool.togglePen();
        btnPen.classList.toggle('active', active);
      }
    });
    if (btnSound) btnSound.addEventListener('click', () => {
      if (window.soundFX) {
        const enabled = window.soundFX.toggle();
        btnSound.classList.toggle('active', enabled);
        btnSound.title = enabled ? "사운드 효과 켜짐 (M)" : "사운드 효과 꺼짐 (M)";
      }
    });
    if (btnFullscreen) btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.slideDeck = new SlideDeck();
});
