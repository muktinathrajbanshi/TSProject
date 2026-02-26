enum Mode {
  Focus = "FOCUS",
  ShortBreak = "SHORT BREAK",
  LongBreak = "LONG BREAK"
}

interface TimerConfig {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

const config: TimerConfig = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

// DOM Elements
const timeElem = document.getElementById("time") as HTMLElement;
const modeElem = document.querySelector(".mode") as HTMLElement;
const startBtn = document.getElementById("start") as HTMLButtonElement;
const pauseBtn = document.getElementById("pause") as HTMLButtonElement;
const resetBtn = document.getElementById("reset") as HTMLButtonElement;
const sessionElem = document.getElementById("sessions") as HTMLElement;
const themeToggle = document.getElementById("themeToggle") as HTMLButtonElement;

let mode: Mode = Mode.Focus;
let timeLeft: number = config.focus;
let timer: number | null = null;
let sessions: number = Number(localStorage.getItem("sessions")) || 0;

sessionElem.innerText = String(sessions);

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
}

function updateUI(): void {
  timeElem.innerText = formatTime(timeLeft);
  modeElem.innerText = mode;
}

function switchMode(): void {
  if(mode === Mode.Focus){
    sessions++;
    localStorage.setItem("sessions", String(sessions));
    sessionElem.innerText = String(sessions);

    if(sessions % 4 === 0){
      mode = Mode.LongBreak;
      timeLeft = config.longBreak;
    } else {
      mode = Mode.ShortBreak;
      timeLeft = config.shortBreak;
    }
  } else {
    mode = Mode.Focus;
    timeLeft = config.focus;
  }
}

function startTimer(): void {
  if(timer !== null) return;

  timer = window.setInterval(() => {
    timeLeft--;
    updateUI();

    if(timeLeft <= 0){
      clearInterval(timer!);
      timer = null;
      switchMode();
      updateUI();
      startTimer();
    }
  }, 1000);
}

function pauseTimer(): void {
  if(timer){
    clearInterval(timer);
    timer = null;
  }
}

function resetTimer(): void {
  pauseTimer();
  mode = Mode.Focus;
  timeLeft = config.focus;
  updateUI();
}

// Theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Events
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Init
updateUI();