// *  Remember to console log and check if your JS is connected properly

//variables

//selectors
const progressText = document.querySelector(".progressText");
const progress = document.querySelector(".progress");
const amountRemaining = document.querySelector(".amountNumber");
const allButtons = document.querySelectorAll(".button");
let amountProgress = 0;
let amountNeeded = 0;
const arrowText = document.querySelector("#arrowText");

//Function for progress bar and text to change according to amount donated
function updateProgressBar(progressBar, value) {
  progressBar.querySelector(".progressFill").style.width = `${value}%`;
  progressText.innerText = `£${value}`;
  const progressNum = parseInt(progressText.innerText.slice(1));
  arrowText.style.marginLeft = `${value}%`;
  if (progressNum > 100) {
    progressText.innerText = "£100";
    arrowText.style.marginLeft = `${100}%`;
  }
}

allButtons.forEach((button) =>
  button.addEventListener("click", function (event) {
    amountRemaining.innerText =
      parseInt(amountRemaining.innerText) -
      parseInt(event.target.innerText.slice(1));
    const remainingNumber = parseInt(amountRemaining.innerText);
    if (remainingNumber < 0) {
      amountRemaining.innerText = 0;
    }
  })
);

//function  for each button
allButtons.forEach((button) =>
  button.addEventListener("click", function (event) {
    const progressTex = progressText.innerText.slice(1);
    const progressNum = parseInt(progressText.innerText.slice(1));
    if (progressNum > 100) {
      progressTex = 100;
    }
    updateProgressBar(
      progress,
      progressNum + parseInt(event.target.innerText.slice(1))
    );
  })
);
