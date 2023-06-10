// ! 💻 Remember when working in the browser, be sure to save the changes in this file, and refresh the browser window to run the code again.

// ! 👨‍🏫 Read the readme carefully, and practice using "window.prompt()" to gather user input

// * Write your code below!
const operator = prompt("Choose your input: +, -, /,*,** and √");
const num1 = parseFloat(prompt("Enter the first number:"));
const num2 = parseFloat(prompt("Enter the second number:"));
let keepRunning = true;

while (keepRunning) {
  if (operator === "+") {
    let result = num1 + num2;
    alert(result);
  } else if (operator === "-") {
    result = num1 - num2;
    alert(result);
  } else if (operator === "*") {
    result = num1 * num2;
    alert(result);
  } else if (operator === "/") {
    result = num1 / num2;
    alert(result);
  } else if (operator === "**") {
    result = Math.power(num1, num2);
    alert(result);
  } else if (operator === "√") {
    result = Math.sqrt(num1);
    alert(result);
  }

  const nextRun = window.confirm(" Go again");
  keepRunning = nextRun;
}
