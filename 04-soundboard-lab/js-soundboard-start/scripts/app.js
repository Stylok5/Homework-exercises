function init() {
  //Function and variables to create grid
  const width = 4;
  const numberOfBoxes = width * width;
  const boxes = [];

  function createGrid() {
    for (let index = 0; index < numberOfBoxes; index++) {
      const box = document.createElement("div");
      document.querySelector(".grid").appendChild(box);
      boxes.push(box);
    }
  }
  createGrid();

  //Selectors for all divs and audio creation
  var sound = document.createElement("audio");
  const btn1 = document.querySelector(".grid div");
  const btn2 = document.querySelector("div:nth-child(2)");
  const btn3 = document.querySelector("div:nth-child(3)");
  const btn4 = document.querySelector("div:nth-child(4)");
  const btn5 = document.querySelector("div:nth-child(5)");
  const btn6 = document.querySelector("div:nth-child(6)");
  const btn7 = document.querySelector("div:nth-child(7)");
  const btn8 = document.querySelector("div:nth-child(8)");
  const btn9 = document.querySelector("div:nth-child(9)");
  const btn10 = document.querySelector("div:nth-child(10)");
  const btn11 = document.querySelector("div:nth-child(11)");
  const btn12 = document.querySelector("div:nth-child(12)");
  const btn13 = document.querySelector("div:nth-child(13)");
  const btn14 = document.querySelector("div:nth-child(14)");
  const btn15 = document.querySelector("div:nth-child(15)");
  const btn16 = document.querySelector("div:nth-child(16)");

  //Divs inner texts
  btn1.innerText = "Work It";
  btn2.innerText = "Harder";
  btn3.innerText = "Make It";
  btn4.innerText = "Better";
  btn5.innerText = "Do It";
  btn6.innerText = "Faster";
  btn7.innerText = "Makes Us";
  btn8.innerText = "Stronger";
  btn9.innerText = "More Than";
  btn10.innerText = "Ever";
  btn11.innerText = "Hour";
  btn12.innerText = "After";
  btn13.innerText = "Our";
  btn14.innerText = "Work Is";
  btn15.innerText = "Never";
  btn16.innerText = "Over";

  //Event listeners for sound
  btn1.addEventListener("mouseenter", function () {
    sound.src = "./scripts/work_it.wav";
    sound.play();
  });

  btn2.addEventListener("mouseenter", function () {
    sound.src = "./scripts/harder.wav";
    sound.play();
  });

  btn3.addEventListener("mouseenter", function () {
    sound.src = "./scripts/make_it.wav";
    sound.play();
  });

  btn4.addEventListener("mouseenter", function () {
    sound.src = "./scripts/better.wav";
    sound.play();
  });

  btn5.addEventListener("mouseenter", function () {
    sound.src = "./scripts/do_it.wav";
    sound.play();
  });

  btn6.addEventListener("mouseenter", function () {
    sound.src = "./scripts/faster.wav";
    sound.play();
  });

  btn7.addEventListener("mouseenter", function () {
    sound.src = "./scripts/makes_us.wav";
    sound.play();
  });

  btn8.addEventListener("mouseenter", function () {
    sound.src = "./scripts/stronger.wav";
    sound.play();
  });

  btn9.addEventListener("mouseenter", function () {
    sound.src = "./scripts/more_than.wav";
    sound.play();
  });

  btn10.addEventListener("mouseenter", function () {
    sound.src = "./scripts/ever.wav";
    sound.play();
  });

  btn11.addEventListener("mouseenter", function () {
    sound.src = "./scripts/hour.wav";
    sound.play();
  });

  btn12.addEventListener("mouseenter", function () {
    sound.src = "./scripts/after.wav";
    sound.play();
  });

  btn13.addEventListener("mouseenter", function () {
    sound.src = "./scripts/our.wav";
    sound.play();
  });

  btn14.addEventListener("mouseenter", function () {
    sound.src = "./scripts/work_is.wav";
    sound.play();
  });

  btn15.addEventListener("mouseenter", function () {
    sound.src = "./scripts/never.wav";
    sound.play();
  });

  btn16.addEventListener("mouseenter", function () {
    sound.src = "./scripts/over.wav";
    sound.play();
  });

  boxes.forEach((event) =>
    event.addEventListener("mouseleave", function () {
      sound.src = "";
    })
  );
}

window.addEventListener("DOMContentLoaded", init);
