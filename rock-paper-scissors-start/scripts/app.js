// * Remember to run "go live" below to see your changes on save.

// * write all your code INSIDE the function below

function init() {
  //Variables
  const buttonRestart = document.querySelector("#buttonRestart");
  let computerChoice;
  const choices = ["rock", "paper", "scissors"];
  let p = document.createElement("p");

  //Selectors
  const footer = document.querySelector("footer");
  let playerScoreValue = document.querySelector("#yourScore");
  let computerScoreValue = document.querySelector("#computerScore");
  const allButtons = document.querySelectorAll(".buttonsPressed");

  //Function for computer to randomly choose between the different array choices
  function random() {
    computerChoice = choices[Math.floor(Math.random() * choices.length)];
  }

  //Function that removes previous tect when a new one is created
  function removeText() {
    if (p && p.parentNode) {
      p.parentNode.removeChild(p);
    }
  }

  //Event Listener and conditions
  allButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      winGame();
      removeText();
      random();
      if (event.target.value === computerChoice) {
        p.innerText = `Its a tie!`;
        footer.appendChild(p);
      } else if (
        event.target.value === "rock" &&
        computerChoice === choices[1]
      ) {
        p.innerText = `Computer wins! Computer chose ${computerChoice} and you chose ${event.target.value}`;
        footer.appendChild(p);
        computerScoreValue.innerText++;
      } else if (
        event.target.value === "rock" &&
        computerChoice === choices[2]
      ) {
        p.innerText = `You win! Computer chose ${computerChoice} and you chose ${event.target.value}`;
        footer.appendChild(p);
        playerScoreValue.innerText++;
      } else if (
        event.target.value === "paper" &&
        computerChoice === choices[0]
      ) {
        p.innerText = `You win! Computer chose ${computerChoice} and you chose ${event.target.value}`;
        footer.appendChild(p);
        playerScoreValue.innerText++;
      } else if (
        event.target.value === "paper" &&
        computerChoice === choices[2]
      ) {
        p.innerText = `Computer wins! Computer chose ${computerChoice} and you chose ${event.target.value}`;
        footer.appendChild(p);
        computerScoreValue.innerText++;
      } else if (
        event.target.value === "scissors" &&
        computerChoice === choices[0]
      ) {
        p.innerText = `Computer wins! Computer chose ${computerChoice} and you chose ${event.target.value}`;
        footer.appendChild(p);
        computerScoreValue.innerText++;
      } else if (
        event.target.value === "scissors" &&
        computerChoice === choices[1]
      ) {
        p.innerText = `You win! Computer chose ${computerChoice} and you chose ${event.target.value}`;
        footer.appendChild(p);
        playerScoreValue.innerText++;
      }
    });
  });

  //Function that resets score and reenables buttons
  function gameReset() {
    playerScoreValue.innerText = 0;
    computerScoreValue.innerText = 0;
    allButtons.forEach((button) => {
      button.disabled = false;
    });
    p.remove();
  }
  buttonRestart.addEventListener("click", gameReset);

  //Function that anounces the winner and disables the buttons
  function winGame() {
    if (playerScoreValue.innerText == 10) {
      alert("You win!");
      allButtons.forEach((button) => {
        button.disabled = true;
      });
      return;
    } else if (computerScoreValue.innerText == 10) {
      alert("Computer wins! Better luck next time.");
      allButtons.forEach((button) => {
        button.disabled = true;
      });
      return;
    }
  }
}
// ! do not touch below here
window.addEventListener("DOMContentLoaded", init);
