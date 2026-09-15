// Presenter Mode HUD & Elapsed Timer
class PresenterHUD {
  constructor() {
    this.hudElement = document.getElementById('presenterHUD');
    this.timerElement = document.getElementById('hudTimer');
    this.notesElement = document.getElementById('hudNotes');
    this.startTime = null;
    this.timerInterval = null;
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.hudElement.classList.add('open');
      if (!this.startTime) {
        this.startTimer();
      }
    } else {
      this.hudElement.classList.remove('open');
    }
    return this.isOpen;
  }

  startTimer() {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const seconds = String(elapsed % 60).padStart(2, '0');
      if (this.timerElement) {
        this.timerElement.textContent = `${minutes}:${seconds}`;
      }
    }, 1000);
  }

  resetTimer() {
    this.startTime = Date.now();
    if (this.timerElement) {
      this.timerElement.textContent = '00:00';
    }
  }

  updateNotes(notesHtml) {
    if (this.notesElement) {
      this.notesElement.innerHTML = notesHtml || '<em>작성된 발표자 노트가 없습니다.</em>';
    }
  }
}

window.presenterHUD = new PresenterHUD();
