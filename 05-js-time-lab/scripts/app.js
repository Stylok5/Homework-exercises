const screen = document.querySelector("#watch-screen");
screen.classList.add("screen");
function time() {
  const currentTime = new Date().toLocaleTimeString();
  screen.innerText = currentTime;
}
setInterval(time, 1000);

const timerStart = document.querySelector("#start");
const timerReset = document.querySelector("#reset");
const timerScreen = document.querySelector("#timer-screen");
const timer = document.querySelector("#timer");
const pauseBtn = document.querySelector("#pause");
let count = 10;
let countButtonClicks = 0;
let timeInterval;

function startTimer() {
  count = 10;
  timeInterval = setInterval(() => {
    count--;
    timerScreen.innerText = count;
    /*Some general questions: I am not exactly sure why this equality is only working 
    this way and not the other way around like count = timerScreen.innerText. And also not sure why I have to put count = 10; 
    inside the function, even though I have a global variable let count = 10; 
    If I don't have it inside the function it continues counting to negative numbers like -1. Is it because it only runs through 
    only once if I just have the global variable?*/
    if (count === 0) {
      timer.classList.add("ringing");
      clearInterval(timeInterval);
    }
  }, 1000);
}

//Reset function
function resetTimer() {
  timer.classList.remove("ringing");
  timerScreen.innerText = 10;
}

/*Was thinking of creating a function that counts the times the start button is clicked, if their remainder is 0 or 
if they are clicked every second time etc it will clear the interval but even though it logs the number of
 times clicked the if statement isnt working*/
function countButtons() {
  countButtonClicks += 1;
  //console.log(countButtonClicks);
  //if (countButtonClicks % 2 === 0) {
  //clearInterval(timeInterval);
  //}
}

//Event listeners
timerStart.addEventListener("click", startTimer);
//timerStart.addEventListener("click", countButtons);
timerReset.addEventListener("click", resetTimer);

function pause() {
  clearInterval(timeInterval);
}
pauseBtn.addEventListener("click", pause);

let countdownRunning = false;
timerStart.addEventListener("click", pauseAndRestartCountdown);
