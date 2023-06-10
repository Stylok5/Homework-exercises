/* eslint-disable no-unused-vars */

// ? write a function that returns "Hello World!" if no argument is given, or "Hello <argument>!" otherwise
// ? eg: hello() => "Hello World!"; hello("Mike") => "Hello Mike!"
function hello(string) {
  if (string === undefined) {
    return "Hello World!";
  } else {
    return `Hello ${string}!`;
  }
}

// ? write a function that will calculate the area of a circle, given the radius
function areaOfCircle(radius) {
  const π = 3.141592653589793;
  return π * radius ** 2;
}

// ? write a function to convert an age into days
// exampe: yearsToDays(65) ➞ 23725
function yearsToDays(age) {
  return age * 365;
}

// ? write a function that takes a number as an argument. Add up all the numbers from 1 to the number you passed to the function.
// For example, if the input is 5 then your function should return 15 because 1 + 2 + 3 + 4 + 5 = 15
function addUpNumber(number) {
  let sum = 0;
  for (let i = 0; i <= number; i++) {
    sum += i;
  }
  return sum;
}

// ? write a function that will reverse a number (eg. 456733 become 337654)
function numberReverse(number) {
  let string = number.toString();
  return parseFloat(string.split("").reverse().join(""));
}

// ? write a function to check if a word or phrase is a palindrome returning a boolean
// ? eg. palindromeCheck('dad') => true, palindrome('nonsense') => false
function palindromeCheck(string) {
  let stringReverse = string.split("").reverse().join("").replaceAll(" ", "");
  if (stringReverse === string.replaceAll(" ", "")) {
    return true;
  } else {
    return false;
  }
}

// ? write a function that returns the letters of a word or phrase in alphabetical order case insensitive
// ? eg. orderStringAlphabetically('javascript is cool') => 'aacciijlooprsstv'
function orderStringAlphabetically(string) {
  return string.toLowerCase().replaceAll(" ", "").split("").sort().join("");
}

// ? write a function that frames a string in asterisks (*)
// ?                            ***************
// ? eg: frame('Hello Kitty') => * Hello Kitty *
//  ?                           ***************
function frame(string) {
  let border = "*".repeat(string.length + 4);
  return `${border}\n* ${string} *\n${border}`;
}

// ! Do not alter any of the code below

module.exports = {
  hello,
  areaOfCircle,
  yearsToDays,
  addUpNumber,
  numberReverse,
  palindromeCheck,
  orderStringAlphabetically,
  //titleCase,
  frame,
};
