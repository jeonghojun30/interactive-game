/**
 * Interactive Video Engine (Black Mirror Bandersnatch Style)
 * 분기 시나리오 제어 및 시네마틱 UI/UX 엔진
 */

// 1. 스토리 분기 데이터 정의
const STORY_GRAPH = {
  1: {
    id: 1,
    title: "1번 영상: 운명의 시작",
    desc: "모든 이야기가 시작되는 첫 번째 분기점입니다.",
    videoSrc: "videos/1.mp4",
    choices: [
      { text: "2번 영상으로 진행", target: 2, subtext: "새로운 선택지로 나아갑니다", key: "1" },
      { text: "3번 영상으로 진행", target: 3, subtext: "또 다른 갈림길로 진입합니다", key: "2" }
    ]
  },
  2: {
    id: 2,
    title: "2번 영상: 첫 번째 갈림길 A",
    desc: "2번 영상이 재생되고 다음 행동을 결정해야 합니다.",
    videoSrc: "videos/2.mp4",
    choices: [
      { text: "1번 영상으로 되돌아가기", target: 1, subtext: "이전 영상으로 회귀합니다", isBack: true, key: "1" },
      { text: "4번 영상으로 진행", target: 4, subtext: "루트 A 심화", key: "2" },
      { text: "5번 영상으로 진행", target: 5, subtext: "루트 B 진입", key: "3" }
    ]
  },
  3: {
    id: 3,
    title: "3번 영상: 첫 번째 갈림길 B",
    desc: "3번 영상이 재생되고 다음 행동을 결정해야 합니다.",
    videoSrc: "videos/3.mp4",
    choices: [
      { text: "1번 영상으로 되돌아가기", target: 1, subtext: "이전 영상으로 회귀합니다", isBack: true, key: "1" },
      { text: "6번 영상으로 진행", target: 6, subtext: "루트 C 진입", key: "2" },
      { text: "7번 영상으로 진행", target: 7, subtext: "루트 D 진입", key: "3" }
    ]
  },
  4: {
    id: 4,
    title: "4번 영상: 깊어지는 전개 A-1",
    desc: "4번 영상이 재생 중입니다. 결말로 향하고 있습니다.",
    videoSrc: "videos/4.mp4",
    choices: [
      { text: "2번 영상으로 되돌아가기", target: 2, subtext: "이전 영상으로 회귀합니다", isBack: true, key: "1" },
      { text: "8번 영상으로 진행 (결말)", target: 8, subtext: "최종 스토리 라인으로 이동", key: "2" }
    ]
  },
  5: {
    id: 5,
    title: "5번 영상: 깊어지는 전개 A-2",
    desc: "5번 영상이 재생 중입니다. 결말로 향하고 있습니다.",
    videoSrc: "videos/5.mp4",
    choices: [
      { text: "2번 영상으로 되돌아가기", target: 2, subtext: "이전 영상으로 회귀합니다", isBack: true, key: "1" },
      { text: "9번 영상으로 진행 (결말)", target: 9, subtext: "최종 스토리 라인으로 이동", key: "2" }
    ]
  },
  6: {
    id: 6,
    title: "6번 영상: 깊어지는 전개 B-1",
    desc: "6번 영상이 재생 중입니다. 결말로 향하고 있습니다.",
    videoSrc: "videos/6.mp4",
    choices: [
      { text: "3번 영상으로 되돌아가기", target: 3, subtext: "이전 영상으로 회귀합니다", isBack: true, key: "1" },
      { text: "10번 영상으로 진행 (결말)", target: 10, subtext: "최종 스토리 라인으로 이동", key: "2" }
    ]
  },
  7: {
    id: 7,
    title: "7번 영상: 깊어지는 전개 B-2",
    desc: "7번 영상이 재생 중입니다. 결말로 향하고 있습니다.",
    videoSrc: "videos/7.mp4",
    choices: [
      { text: "3번 영상으로 되돌아가기", target: 3, subtext: "이전 영상으로 회귀합니다", isBack: true, key: "1" },
      { text: "11번 영상으로 진행 (결말)", target: 11, subtext: "최종 스토리 라인으로 이동", key: "2" }
    ]
  },
  8: {
    id: 8,
    title: "8번 영상: 결말 라인 1",
    desc: "4번 영상에서 이어진 첫 번째 최종 결말입니다.",
    videoSrc: "videos/8.mp4",
    choices: [
      { text: "4번 영상으로 되돌아가기", target: 4, subtext: "이전 선택지로 회귀", isBack: true, key: "1" },
      { text: "처음부터 다시 시작 (1번 영상)", target: 1, subtext: "새로운 운명을 개척합니다", key: "2" }
    ]
  },
  9: {
    id: 9,
    title: "9번 영상: 결말 라인 2",
    desc: "5번 영상에서 이어진 두 번째 최종 결말입니다.",
    videoSrc: "videos/9.mp4",
    choices: [
      { text: "5번 영상으로 되돌아가기", target: 5, subtext: "이전 선택지로 회귀", isBack: true, key: "1" },
      { text: "처음부터 다시 시작 (1번 영상)", target: 1, subtext: "새로운 운명을 개척합니다", key: "2" }
    ]
  },
  10: {
    id: 10,
    title: "10번 영상: 결말 라인 3",
    desc: "6번 영상에서 이어진 세 번째 최종 결말입니다.",
    videoSrc: "videos/10.mp4",
    choices: [
      { text: "6번 영상으로 되돌아가기", target: 6, subtext: "이전 선택지로 회귀", isBack: true, key: "1" },
      { text: "처음부터 다시 시작 (1번 영상)", target: 1, subtext: "새로운 운명을 개척합니다", key: "2" }
    ]
  },
  11: {
    id: 11,
    title: "11번 영상: 결말 라인 4",
    desc: "7번 영상에서 이어진 네 번째 최종 결말입니다.",
    videoSrc: "videos/11.mp4",
    choices: [
      { text: "7번 영상으로 되돌아가기", target: 7, subtext: "이전 선택지로 회귀", isBack: true, key: "1" },
      { text: "처음부터 다시 시작 (1번 영상)", target: 1, subtext: "새로운 운명을 개척합니다", key: "2" }
    ]
  }
};

// 2. 엔진 상태 관리 객체
class InteractivePlayer {
  constructor() {
    this.currentSceneId = 1;
    this.visitedHistory = [1];
    this.useSimulator = false; // 실제 비디오 로드 실패 시 또는 사용자 선택 시 true
    this.decisionTimerEnabled = false;
    this.timerDuration = 12; // 초
    this.timerCountdownInterval = null;
    this.audioContext = null;

    // DOM 캐싱
    this.videoA = document.getElementById("videoA");
    this.videoB = document.getElementById("videoB");
    this.currentVideoElem = this.videoA;
    this.nextVideoElem = this.videoB;

    this.simCanvas = document.getElementById("simulatorCanvas");
    this.simCtx = this.simCanvas ? this.simCanvas.getContext("2d") : null;
    this.simAnimationId = null;
    this.simStartTime = 0;
    this.simDuration = 5000; // 시뮬레이터 영상 재생 시간 (5초)

    this.choicesOverlay = document.getElementById("choicesOverlay");
    this.choiceDimmer = document.getElementById("choiceDimmer");
    this.choicesGrid = document.getElementById("choicesGrid");
    this.choicePromptTitle = document.getElementById("choicePromptTitle");
    this.decisionTimerBar = document.getElementById("decisionTimerBar");
    this.decisionTimerFill = document.getElementById("decisionTimerFill");

    this.sceneIndicatorText = document.getElementById("sceneIndicatorText");
    this.videoProgressFill = document.getElementById("videoProgressFill");
    this.mapModal = document.getElementById("mapModal");
    this.toastElem = document.getElementById("toastMsg");

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.buildMapModal();
  }

  // Web Audio 효과음 (선택지 표시 사운드, 클릭 비프 사운드)
  playAudioBeep(type = "click") {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      const ctx = this.audioContext;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "choiceAppear") {
        // 서스펜스 저음 붐
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.6);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === "click") {
        // 미래지향적 선택 클릭음
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "back") {
        // 되돌아가기 리와인드 톤
        osc.type = "triangle";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      // 오디오 미지원 환경 예외 무시
    }
  }

  showToast(msg) {
    if (!this.toastElem) return;
    this.toastElem.textContent = msg;
    this.toastElem.classList.add("show");
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastElem.classList.remove("show");
    }, 2800);
  }

  setupEventListeners() {
    // 시작 버튼
    const startBtn = document.getElementById("startExperienceBtn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        document.getElementById("introOverlay").classList.add("hide");
        this.playAudioBeep("click");
        this.loadScene(1);
      });
    }

    // 비디오 이벤트 (videoA, videoB)
    [this.videoA, this.videoB].forEach(video => {
      // 영상 재생 진행률
      video.addEventListener("timeupdate", () => {
        if (video === this.currentVideoElem && video.duration) {
          const pct = (video.currentTime / video.duration) * 100;
          this.videoProgressFill.style.width = `${pct}%`;
        }
      });

      // 영상 종료 시점: 화면 꺼짐 방지 & 마지막 프레임 고정 + 선택지 표시
      video.addEventListener("ended", () => {
        if (video === this.currentVideoElem) {
          video.pause(); // 마지막 장면에 일시정지 고정!
          this.onVideoFinished();
        }
      });

      // 영상 로드 실패 시 (사용자가 실제 비디오 파일을 아직 안 넣었을 때 자동 데모 모드 작동)
      video.addEventListener("error", (e) => {
        if (video === this.currentVideoElem && !this.useSimulator) {
          console.warn(`[영상 로드 실패: ${video.src}] -> 자동 가상 시뮬레이션 데모 모드로 전환합니다.`);
          this.useSimulator = true;
          this.showToast("실제 영상 파일이 없어 '시네마틱 데모 모드'로 자동 전환되었습니다.");
          const modeTag = document.getElementById("videoModeStatus");
          if (modeTag) modeTag.textContent = "🎬 시네마틱 가상 데모 모드 동작 중";
          this.startCanvasSimulator(this.currentSceneId);
        }
      });
    });

    // 키보드 단축키
    window.addEventListener("keydown", (e) => {
      if (e.key === "1" || e.key === "2" || e.key === "3") {
        const btn = document.querySelector(`.choice-card[data-key="${e.key}"]`);
        if (btn && this.choicesOverlay.classList.contains("show")) {
          btn.click();
        }
      } else if (e.key === "m" || e.key === "M") {
        this.toggleMapModal();
      } else if (e.key === "f" || e.key === "F") {
        this.toggleFullscreen();
      } else if (e.key === " ") {
        e.preventDefault();
        this.togglePlayPause();
      }
    });

    // HUD 버튼들
    document.getElementById("mapBtn")?.addEventListener("click", () => this.toggleMapModal());
    document.getElementById("closeMapBtn")?.addEventListener("click", () => this.toggleMapModal());
    document.getElementById("fullscreenBtn")?.addEventListener("click", () => this.toggleFullscreen());
    
    // 타이머 모드 토글
    const timerToggleBtn = document.getElementById("timerToggleBtn");
    if (timerToggleBtn) {
      timerToggleBtn.addEventListener("click", () => {
        this.decisionTimerEnabled = !this.decisionTimerEnabled;
        timerToggleBtn.classList.toggle("active", this.decisionTimerEnabled);
        this.showToast(this.decisionTimerEnabled ? "⏳ 선택 타이머 모드: 켜짐" : "⏳ 무제한 선택 모드: 켜짐");
      });
    }

    // 모드 수동 전환 (실제 비디오 vs 데모 모드)
    const modeToggleBtn = document.getElementById("modeToggleBtn");
    if (modeToggleBtn) {
      modeToggleBtn.addEventListener("click", () => {
        this.useSimulator = !this.useSimulator;
        modeToggleBtn.classList.toggle("active", this.useSimulator);
        this.showToast(this.useSimulator ? "모드 변경: 가상 캔버스 데모" : "모드 변경: 로컬 영상 파일 (videos/)");
        this.loadScene(this.currentSceneId);
      });
    }

    // 모달 배경 클릭 시 닫기
    this.mapModal?.addEventListener("click", (e) => {
      if (e.target === this.mapModal) this.toggleMapModal();
    });

    // 윈도우 리사이즈 대응
    window.addEventListener("resize", () => {
      if (this.simCanvas) {
        this.simCanvas.width = window.innerWidth;
        this.simCanvas.height = window.innerHeight;
      }
    });
  }

  // 씬 로드 및 재생
  loadScene(sceneId) {
    const sceneData = STORY_GRAPH[sceneId];
    if (!sceneData) return;

    this.currentSceneId = sceneId;
    if (!this.visitedHistory.includes(sceneId)) {
      this.visitedHistory.push(sceneId);
    }

    // UI 갱신
    this.hideChoices();
    this.updateHUD(sceneData);
    this.updateMapHighlights();

    if (this.useSimulator) {
      this.startCanvasSimulator(sceneId);
    } else {
      this.playRealVideo(sceneData.videoSrc);
    }
  }

  // 실제 비디오 교차 페이드 재생
  playRealVideo(src) {
    if (this.simAnimationId) {
      cancelAnimationFrame(this.simAnimationId);
      this.simAnimationId = null;
    }
    this.simCanvas.classList.remove("active");

    const activeVideo = this.currentVideoElem;
    const incomingVideo = this.nextVideoElem;

    incomingVideo.src = src;
    incomingVideo.load();
    incomingVideo.currentTime = 0;

    const playPromise = incomingVideo.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // 크로스페이드 트랜지션
          incomingVideo.classList.add("active");
          activeVideo.classList.remove("active");

          // 스왑
          this.currentVideoElem = incomingVideo;
          this.nextVideoElem = activeVideo;
          this.nextVideoElem.pause();
        })
        .catch(err => {
          console.warn("비디오 재생 실패 또는 파일 없음 -> 캔버스 시뮬레이터로 대체합니다:", err);
          this.useSimulator = true;
          this.startCanvasSimulator(this.currentSceneId);
        });
    }
  }

  // 영상 종료 시점 핸들러
  onVideoFinished() {
    this.playAudioBeep("choiceAppear");
    this.showChoices();
  }

  // 선택지 표시
  showChoices() {
    const sceneData = STORY_GRAPH[this.currentSceneId];
    if (!sceneData || !sceneData.choices) return;

    this.choicePromptTitle.textContent = `${sceneData.title} - 다음 행동을 선택하십시오`;
    this.choicesGrid.innerHTML = "";

    sceneData.choices.forEach((choice, index) => {
      const card = document.createElement("div");
      card.className = `choice-card ${choice.isBack ? "back-choice" : ""}`;
      card.dataset.key = choice.key || (index + 1);

      const icon = choice.isBack ? "↺" : "➔";
      card.innerHTML = `
        <span class="key-hint">${choice.key || (index + 1)}</span>
        <div class="choice-icon">${icon}</div>
        <div class="choice-title">${choice.text}</div>
        <div class="choice-subtext">${choice.subtext || ""}</div>
      `;

      card.addEventListener("click", () => {
        this.selectChoice(choice);
      });

      this.choicesGrid.appendChild(card);
    });

    this.choiceDimmer.classList.add("visible");
    this.choicesOverlay.classList.add("show");

    // 결정 타이머 활성화된 경우
    if (this.decisionTimerEnabled) {
      this.startDecisionTimer();
    } else {
      this.decisionTimerBar.classList.remove("active");
    }
  }

  // 선택지 숨기기
  hideChoices() {
    this.choicesOverlay.classList.remove("show");
    this.choiceDimmer.classList.remove("visible");
    if (this.timerCountdownInterval) {
      clearInterval(this.timerCountdownInterval);
      this.timerCountdownInterval = null;
    }
    this.decisionTimerBar.classList.remove("active");
    this.videoProgressFill.style.width = "0%";
  }

  // 선택지 클릭 처리
  selectChoice(choice) {
    this.playAudioBeep(choice.isBack ? "back" : "click");
    this.hideChoices();
    this.loadScene(choice.target);
  }

  // 결정 카운트다운 타이머
  startDecisionTimer() {
    if (this.timerCountdownInterval) clearInterval(this.timerCountdownInterval);
    this.decisionTimerBar.classList.add("active");
    this.decisionTimerFill.style.width = "100%";

    const totalMs = this.timerDuration * 1000;
    const startTime = Date.now();

    this.timerCountdownInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, totalMs - elapsed);
      const pct = (remaining / totalMs) * 100;
      this.decisionTimerFill.style.width = `${pct}%`;

      if (remaining <= 0) {
        clearInterval(this.timerCountdownInterval);
        // 타이머 만료 시 기본 첫 번째 선택지 자동 진행
        const sceneData = STORY_GRAPH[this.currentSceneId];
        if (sceneData && sceneData.choices && sceneData.choices.length > 0) {
          this.selectChoice(sceneData.choices[0]);
        }
      }
    }, 50);
  }

  // HUD 텍스트 갱신
  updateHUD(sceneData) {
    if (this.sceneIndicatorText) {
      this.sceneIndicatorText.textContent = sceneData.title;
    }
  }

  // ==========================================
  // 3. 고화질 캔버스 시뮬레이터 (데모 / Fallback)
  // ==========================================
  startCanvasSimulator(sceneId) {
    if (this.simAnimationId) {
      cancelAnimationFrame(this.simAnimationId);
    }
    this.currentVideoElem.classList.remove("active");
    this.nextVideoElem.classList.remove("active");
    this.simCanvas.classList.add("active");

    this.simCanvas.width = window.innerWidth;
    this.simCanvas.height = window.innerHeight;

    const sceneData = STORY_GRAPH[sceneId];
    this.simStartTime = performance.now();
    let hasTriggeredEnd = false;

    // 비주얼 색상 테마 생성
    const hue = (sceneId * 38) % 360;

    const render = (time) => {
      const elapsed = time - this.simStartTime;
      const progress = Math.min(1, elapsed / this.simDuration);
      this.videoProgressFill.style.width = `${progress * 100}%`;

      const ctx = this.simCtx;
      const w = this.simCanvas.width;
      const h = this.simCanvas.height;

      // 배경 그라디언트 렌더링
      const bgGrad = ctx.createRadialGradient(w/2, h/2, 50, w/2, h/2, Math.max(w, h));
      bgGrad.addColorStop(0, `hsl(${hue}, 40%, 15%)`);
      bgGrad.addColorStop(0.6, `hsl(${hue + 20}, 50%, 6%)`);
      bgGrad.addColorStop(1, '#050508');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 시네마틱 입자 및 그리드 효과
      ctx.strokeStyle = `hsla(${hue}, 70%, 50%, 0.15)`;
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 펄스 링 (Pulse Rings)
      const pulseCount = 3;
      for (let i = 0; i < pulseCount; i++) {
        const pPhase = ((elapsed * 0.001 + i * 0.33) % 1);
        const radius = pPhase * Math.min(w, h) * 0.45;
        ctx.beginPath();
        ctx.arc(w/2, h/2, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${1 - pPhase})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 중앙 시네마틱 텍스트 및 프레임
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 씬 뱃지
      ctx.fillStyle = `hsl(${hue}, 90%, 60%)`;
      ctx.font = "bold 16px var(--font-sans)";
      ctx.fillText(`[ V I D E O  S C E N E  # ${sceneId} ]`, w/2, h/2 - 70);

      // 메인 타이틀
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px var(--font-sans)";
      ctx.fillText(sceneData.title, w/2, h/2 - 20);

      // 설명 문구
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = "16px var(--font-sans)";
      ctx.fillText(sceneData.desc, w/2, h/2 + 25);

      // 시네마틱 타임코드
      const curSec = (Math.min(elapsed, this.simDuration) / 1000).toFixed(2);
      const totalSec = (this.simDuration / 1000).toFixed(2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "13px monospace";
      ctx.fillText(`TC: 00:00:0${curSec} / 00:00:0${totalSec} [SIMULATION STREAM]`, w/2, h/2 + 65);

      ctx.restore();

      if (progress < 1) {
        this.simAnimationId = requestAnimationFrame(render);
      } else {
        // 영상 종료 -> 마지막 프레임 정지 유지 & 선택지 호출!
        if (!hasTriggeredEnd) {
          hasTriggeredEnd = true;
          this.onVideoFinished();
        }
      }
    };

    this.simAnimationId = requestAnimationFrame(render);
  }

  // ==========================================
  // 4. 스토리 맵 (인터랙티브 플로우차트)
  // ==========================================
  buildMapModal() {
    const container = document.getElementById("flowDiagramArea");
    if (!container) return;

    container.innerHTML = `
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px; text-align: center;">
        원하는 노드를 클릭하면 해당 영상 시점으로 즉시 이동할 수 있습니다.
      </div>
      <div class="flow-diagram-container">
        <!-- Level 1 -->
        <div class="tree-level">
          <div class="node-chip" data-node="1" onclick="playerInstance.jumpToScene(1)">
            <span class="chip-dot"></span> 1번 영상 (시작)
          </div>
        </div>

        <div style="text-align:center; color:rgba(255,255,255,0.2);">▼</div>

        <!-- Level 2 -->
        <div class="tree-level">
          <div class="node-chip" data-node="2" onclick="playerInstance.jumpToScene(2)">
            <span class="chip-dot"></span> 2번 영상 (A 분기)
          </div>
          <div class="node-chip" data-node="3" onclick="playerInstance.jumpToScene(3)">
            <span class="chip-dot"></span> 3번 영상 (B 분기)
          </div>
        </div>

        <div style="text-align:center; color:rgba(255,255,255,0.2);">▼</div>

        <!-- Level 3 -->
        <div class="tree-level">
          <div class="node-chip" data-node="4" onclick="playerInstance.jumpToScene(4)">4번 영상</div>
          <div class="node-chip" data-node="5" onclick="playerInstance.jumpToScene(5)">5번 영상</div>
          <div class="node-chip" data-node="6" onclick="playerInstance.jumpToScene(6)">6번 영상</div>
          <div class="node-chip" data-node="7" onclick="playerInstance.jumpToScene(7)">7번 영상</div>
        </div>

        <div style="text-align:center; color:rgba(255,255,255,0.2);">▼</div>

        <!-- Level 4 (Endings) -->
        <div class="tree-level">
          <div class="node-chip" data-node="8" onclick="playerInstance.jumpToScene(8)">8번 (결말 1)</div>
          <div class="node-chip" data-node="9" onclick="playerInstance.jumpToScene(9)">9번 (결말 2)</div>
          <div class="node-chip" data-node="10" onclick="playerInstance.jumpToScene(10)">10번 (결말 3)</div>
          <div class="node-chip" data-node="11" onclick="playerInstance.jumpToScene(11)">11번 (결말 4)</div>
        </div>
      </div>
    `;
    this.updateMapHighlights();
  }

  updateMapHighlights() {
    document.querySelectorAll(".node-chip").forEach(chip => {
      const nodeNum = parseInt(chip.dataset.node, 10);
      chip.classList.toggle("current", nodeNum === this.currentSceneId);
      chip.classList.toggle("visited", this.visitedHistory.includes(nodeNum) && nodeNum !== this.currentSceneId);
    });
  }

  toggleMapModal() {
    if (!this.mapModal) return;
    const isOpen = this.mapModal.classList.contains("open");
    if (isOpen) {
      this.mapModal.classList.remove("open");
    } else {
      this.updateMapHighlights();
      this.mapModal.classList.add("open");
    }
  }

  jumpToScene(sceneId) {
    this.toggleMapModal();
    this.loadScene(sceneId);
    this.showToast(`${sceneId}번 영상으로 이동했습니다.`);
  }

  togglePlayPause() {
    if (this.useSimulator) {
      this.showToast("데모 시뮬레이터 동작 중입니다.");
      return;
    }
    if (this.currentVideoElem.paused) {
      this.currentVideoElem.play();
      this.showToast("재생");
    } else {
      this.currentVideoElem.pause();
      this.showToast("일시정지");
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }
}

// 싱글톤 인스턴스 초기화
let playerInstance = null;
window.addEventListener("DOMContentLoaded", () => {
  playerInstance = new InteractivePlayer();
});
