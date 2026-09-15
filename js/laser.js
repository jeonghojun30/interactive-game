// Interactive Laser Pointer and Screen Drawing Pen
class LaserTool {
  constructor() {
    this.canvas = document.getElementById('drawingCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.laserDot = document.querySelector('.laser-dot');
    this.isLaserActive = false;
    this.isDrawing = false;
    this.mode = 'none'; // 'laser', 'pen', 'none'
    this.init();
  }

  init() {
    if (!this.canvas) return;
    this.resize();
    window.addEventListener('resize', () => this.resize());

    document.addEventListener('mousemove', (e) => {
      if (this.isLaserActive && this.laserDot) {
        this.laserDot.style.left = `${e.clientX}px`;
        this.laserDot.style.top = `${e.clientY}px`;
      }
      if (this.isDrawing && this.mode === 'pen') {
        this.draw(e.clientX, e.clientY);
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      if (this.mode === 'pen') {
        this.isDrawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDrawing = false;
    });
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  draw(x, y) {
    if (!this.ctx) return;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#00f2fe';
    this.ctx.shadowColor = '#00f2fe';
    this.ctx.shadowBlur = 8;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  clearCanvas() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  toggleLaser() {
    if (this.mode === 'laser') {
      this.mode = 'none';
      this.isLaserActive = false;
      document.body.classList.remove('laser-active');
    } else {
      this.mode = 'laser';
      this.isLaserActive = true;
      document.body.classList.add('laser-active');
      this.canvas.classList.remove('drawing-active');
    }
    return this.mode === 'laser';
  }

  togglePen() {
    if (this.mode === 'pen') {
      this.mode = 'none';
      this.canvas.classList.remove('drawing-active');
    } else {
      this.mode = 'pen';
      if (this.isLaserActive) this.toggleLaser();
      this.canvas.classList.add('drawing-active');
    }
    return this.mode === 'pen';
  }
}

window.laserTool = new LaserTool();
