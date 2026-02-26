var Mode = /*#__PURE__*/ function(Mode) {
    Mode["Focus"] = "FOCUS";
    Mode["ShortBreak"] = "SHORT BREAK";
    Mode["LongBreak"] = "LONG BREAK";
    return Mode;
}(Mode || {});
const config = {
    focus: 1500,
    shortBreak: 300,
    longBreak: 900
};
// DOM Elements
const timeElem = document.getElementById("time");
const modeElem = document.querySelector(".mode");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const sessionElem = document.getElementById("sessions");
const themeToggle = document.getElementById("themeToggle");
let mode = "FOCUS";
let timeLeft = config.focus;
let timer = null;
let sessions = Number(localStorage.getItem("sessions")) || 0;
sessionElem.innerText = String(sessions);
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}
function updateUI() {
    timeElem.innerText = formatTime(timeLeft);
    modeElem.innerText = mode;
}
function switchMode() {
    if (mode === "FOCUS") {
        sessions++;
        localStorage.setItem("sessions", String(sessions));
        sessionElem.innerText = String(sessions);
        if (sessions % 4 === 0) {
            mode = "LONG BREAK";
            timeLeft = config.longBreak;
        } else {
            mode = "SHORT BREAK";
            timeLeft = config.shortBreak;
        }
    } else {
        mode = "FOCUS";
        timeLeft = config.focus;
    }
}
function startTimer() {
    if (timer !== null) return;
    timer = window.setInterval(()=>{
        timeLeft--;
        updateUI();
        if (timeLeft <= 0) {
            clearInterval(timer);
            timer = null;
            switchMode();
            updateUI();
            startTimer();
        }
    }, 1000);
}
function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}
function resetTimer() {
    pauseTimer();
    mode = "FOCUS";
    timeLeft = config.focus;
    updateUI();
}
// Theme
themeToggle.addEventListener("click", ()=>{
    document.body.classList.toggle("light");
});
// Events
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
// Init
updateUI();

//# sourceMappingURL=parcel_ts.377278e2.js.map
