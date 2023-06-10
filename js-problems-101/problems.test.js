/* eslint-disable no-undef */

const fns = require("./problems");

describe("hello", () => {
  test('should return "Hello World!" if no argument is passed', () => {
    expect(fns.hello()).toEqual("Hello World!");
  });
  test('should return "Hello <argument>!" if one is passed', () => {
    expect(fns.hello("Mike")).toEqual("Hello Mike!");
  });
});

describe("areaOfCircle", () => {
  test("should find the area of a circle given a radius", () => {
    expect(fns.areaOfCircle(4)).toEqual(50.26548245743669);
    expect(fns.areaOfCircle(10)).toEqual(314.1592653589793);
    expect(fns.areaOfCircle(1)).toEqual(3.141592653589793);
  });
});

describe("yearsToDays", () => {
  test("should convert years to days", () => {
    expect(fns.yearsToDays(65)).toEqual(23725);
    expect(fns.yearsToDays(80)).toEqual(29200);
    expect(fns.yearsToDays(22)).toEqual(8030);
  });
});

describe("addUpNumber", () => {
  test("adding up all numbers till the given one", () => {
    expect(fns.addUpNumber(5)).toEqual(15);
    expect(fns.addUpNumber(344)).toEqual(59340);
    expect(fns.addUpNumber(121)).toEqual(7381);
  });
});

describe("numberReverse", () => {
  test("should reverse a number", () => {
    expect(fns.numberReverse(123)).toEqual(321);
    expect(fns.numberReverse(4001)).toEqual(1004);
  });
  test("should handle decimals", () => {
    expect(fns.numberReverse(78.567)).toEqual(765.87);
  });
});

describe("palindromeCheck", () => {
  test("should check if a word is a palindrome", () => {
    expect(fns.palindromeCheck("pop")).toBe(true);
    expect(fns.palindromeCheck("dog")).toBe(false);
  });
  test("should check if a phrase is a palindrome", () => {
    expect(fns.palindromeCheck("nurses run")).toBe(true);
    expect(fns.palindromeCheck("will not work")).toBe(false);
  });
});

describe("orderStringAlphabetically", () => {
  test("should order a word alphabetically", () => {
    expect(fns.orderStringAlphabetically("happy")).toEqual("ahppy");
  });
  test("should order a phrase alphabetically", () => {
    expect(fns.orderStringAlphabetically("javascript is cool")).toEqual(
      "aacciijlooprsstv"
    );
  });
  test("should be case insensive", () => {
    expect(fns.orderStringAlphabetically("Testing Rocks")).toEqual(
      "cegiknorsstt"
    );
  });
});

describe("frame", () => {
  test("should frame a string in asterisks", () => {
    expect(fns.frame("Rumplestiltskin")).toEqual(
      "*******************\n* Rumplestiltskin *\n*******************"
    );
    expect(fns.frame("Hello Kitty")).toEqual(
      "***************\n* Hello Kitty *\n***************"
    );
  });
});
