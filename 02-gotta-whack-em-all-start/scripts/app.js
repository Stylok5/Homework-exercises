//  * Whack-A-Mole

// * A #start button should start the game...

//  * When the game starts:
// * Every 1 seconds, a new Pikachu should appear in a random cell
// * If the player clicks the pikachu, the pikachu is removed, and the player gets 100 points.
// * After 10 Pikachus have been generated. the game ends
// * When the game ends, alert the final score.

function init() {
  //Variables and selectors
  const width = 10;
  const numberOfBoxes = width * width;
  const boxes = [];
  let currentPosition = 0;
  const score = document.querySelector("#score-display");
  const start = document.querySelector("#start");
  let timeInterval;

  // Funtion to create grid
  function createGrid() {
    for (let index = 0; index < numberOfBoxes; index++) {
      const box = document.createElement("div");
      box.innerText = index;
      document.querySelector(".grid").appendChild(box);
      boxes.push(box);
    }
  }
  createGrid();

  //Function to show and remove pika after a set time interval as well as end the game after 10 seconds have passed
  function showPika() {
    const timer = setTimeout(function () {
      alert("Nice try! That hand eye coordination is faster than ⚡ ");
      score.innerText = 0;
      clearInterval(timeInterval);
    }, 10000);
    timeInterval = setInterval(function () {
      currentPosition = boxes[Math.floor(Math.random() * boxes.length)];
      currentPosition.classList.add("pika");
      setTimeout(() => {
        currentPosition.classList.remove("pika");
      }, 900);
    }, 1000);
  }

  //Event listener for the start game button
  start.addEventListener("click", showPika);

  //Function to remove pika and add points to score text
  boxes.forEach((event) =>
    event.addEventListener("click", function () {
      if (event.classList.contains("pika")) {
        currentPosition.classList.remove("pika");
        score.innerText++;
      }
    })
  );
}
document.addEventListener("DOMContentLoaded", init);
