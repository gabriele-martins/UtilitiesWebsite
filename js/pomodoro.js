const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");
const pomodoroButton = document.querySelector("#pomodoro-btn");
const shortBreakButton = document.querySelector("#short-break");
const longBreakButton = document.querySelector("#long-break");
const cicleText = document.querySelector("#cicle");
const pomodoroScreen = document.querySelector("#pomodoro-screen");
const pageTitle = document.querySelector("title");
const favicon = document.querySelector("#favicon");
let minute = 25;
let second = 0;
let counterCicle = 1;
let pomodoroClock;

function changeTitle() {
  let word = "Rest!";
  if (pomodoroButton.hasAttribute("disabled")) {
    word = "Focus!";
  }

  pageTitle.innerText =
    returnData(minute) + ":" + returnData(second) + " - " + word;
}

function start() {
  pause();
  pomodoroClock = setInterval(() => {
    timer();
    cicle();
  }, 1000);
}

function pause() {
  clearInterval(pomodoroClock);
}

function reset() {
  if (pomodoroButton.hasAttribute("disabled")) {
    minute = 25;
    document.getElementById("minute").innerText = "25:";
  } else if (shortBreakButton.hasAttribute("disabled")) {
    minute = 5;
    document.getElementById("minute").innerText = "05:";
  } else {
    minute = 10;
    document.getElementById("minute").innerText = "10:";
  }
  second = 0;
  document.getElementById("second").innerText = "00";
}

function timer() {
  if (second == 00) {
    second = 60;
    minute--;
  }
  second--;

  document.getElementById("minute").innerText = returnData(minute) + ":";
  document.getElementById("second").innerText = returnData(second);

  changeTitle();
}

function returnData(input) {
  return input > 9 ? input : `0${input}`;
}

function pomodoro() {
  pomodoroScreen.style.backgroundColor = "#ff6153";
  favicon.href = "../assets/red-pomodoro.svg";
  minute = 25;
  second = 0;
  document.getElementById("minute").innerText = "25:";
  document.getElementById("second").innerText = "00";
  pomodoroButton.setAttribute("disabled", "");
  shortBreakButton.removeAttribute("disabled");
  longBreakButton.removeAttribute("disabled");
}

function shortBreak() {
  pomodoroScreen.style.backgroundColor = "#258c9a";
  favicon.href = "../assets/short-pomodoro.svg";
  minute = 5;
  second = 0;
  document.getElementById("minute").innerText = "05:";
  document.getElementById("second").innerText = "00";
  pomodoroButton.removeAttribute("disabled");
  shortBreakButton.setAttribute("disabled", "");
  longBreakButton.removeAttribute("disabled");
}

function longBreak() {
  pomodoroScreen.style.backgroundColor = "#4081ea";
  favicon.href = "../assets/long-pomodoro.svg";
  minute = 10;
  second = 0;
  document.getElementById("minute").innerText = "10:";
  document.getElementById("second").innerText = "00";
  pomodoroButton.removeAttribute("disabled");
  shortBreakButton.removeAttribute("disabled");
  longBreakButton.setAttribute("disabled", "");
}

function cicle() {
  if (minute === 0 && second === 0) {
    if (pomodoroButton.hasAttribute("disabled")) {
      if (counterCicle % 4 != 0) {
        shortBreakButton.click();
        start();
      } else {
        longBreakButton.click();
        start();
      }
    } else {
      pomodoroButton.click();
      counterCicle++;
      cicleText.innerText = `Cicle #${counterCicle}`;
      start();
    }
  }
}

pomodoroButton.addEventListener("click", () => {
  pomodoro();
});

shortBreakButton.addEventListener("click", () => {
  shortBreak();
});

longBreakButton.addEventListener("click", () => {
  longBreak();
});

startButton.addEventListener("click", () => {
  start();
});

pauseButton.addEventListener("click", () => {
  pause();
});

resetButton.addEventListener("click", () => {
  reset();
});
