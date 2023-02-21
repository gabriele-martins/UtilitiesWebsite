const pageTitle = document.querySelector("title");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");
let hour = 0;
let minute = 0;
let second = 0;
let stopwatch;

function start() {
  pause();
  stopwatch = setInterval(() => {
    timer();
  }, 1000);
}

function pause() {
  clearInterval(stopwatch);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  document.getElementById("hour").innerText = "00:";
  document.getElementById("minute").innerText = "00:";
  document.getElementById("second").innerText = "00";
}

function timer() {
  second++;
  if (second == 60) {
    second = 00;
    minute++;
  }
  if (minute == 60) {
    minute = 00;
    hour++;
  }
  document.getElementById("hour").innerText = returnData(hour) + ":";
  document.getElementById("minute").innerText = returnData(minute) + ":";
  document.getElementById("second").innerText = returnData(second);

  pageTitle.innerText =
    returnData(hour) + ":" + returnData(minute) + ":" + returnData(second);
}

function returnData(input) {
  return input > 9 ? input : `0${input}`;
}

startButton.addEventListener("click", () => {
  start();
});

pauseButton.addEventListener("click", () => {
  pause();
});

resetButton.addEventListener("click", () => {
  reset();
});
