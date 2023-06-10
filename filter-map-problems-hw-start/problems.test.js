/* eslint-disable no-undef */
const fns = require("./problems");

describe("This is our demo test function, return an empty array to pass", () => {
  test("should return an empty array", () => {
    expect(fns.demo([])).toEqual([]);
  });
});

describe("stringsOnly", () => {
  test("should return only the strings of an array", () => {
    expect(fns.stringsOnly([10, "Mike", "23", NaN, "elephant"])).toEqual([
      "Mike",
      "23",
      "elephant",
    ]);
    expect(fns.stringsOnly([{}, [], 99, false])).toEqual([]);
    expect(fns.stringsOnly(["I", "am", "the", "eggman"])).toEqual([
      "I",
      "am",
      "the",
      "eggman",
    ]);
  });
});

describe("convertTemps", () => {
  test("should convert farenheit to celcius for all temperatures in the array", () => {
    expect(fns.convertTemps([23, 140, 212, 41])).toEqual([-5, 60, 100, 5]);
    expect(fns.convertTemps([-58, -22, -4, 14])).toEqual([-50, -30, -20, -10]);
    expect(fns.convertTemps([104, 122, 158, 176])).toEqual([40, 50, 70, 80]);
  });
});

describe("characterCount", () => {
  test("should sum the total number of characters per item in the array", () => {
    expect(fns.characterCount(["Stay", "hungry", "stay", "foolish"])).toEqual([
      4, 6, 4, 7,
    ]);
    expect(fns.characterCount(["Where", "is", "the", "stone"])).toEqual([
      5, 2, 3, 5,
    ]);
    expect(
      fns.characterCount([
        "Pack",
        "it",
        "up",
        "pack",
        "it",
        "in",
        "let",
        "me",
        "begin",
      ])
    ).toEqual([4, 2, 2, 4, 2, 2, 3, 2, 5]);
  });
});

describe("containsFalsey", () => {
  test("should return an array with only falsey values", () => {
    expect(fns.containsFalsey([100, {}, [], "Mike"])).toEqual([]);
    expect(fns.containsFalsey([100, {}, NaN, "Mike", "", null])).toEqual([
      NaN,
      "",
      null,
    ]);
    expect(fns.containsFalsey(["What's", "up", "doc"])).toEqual([]);
  });
});

describe("wordsOfLength", () => {
  test("should return the strings that have the given number of characters or longer", () => {
    expect(fns.wordsOfLength(["emu", "caterpiller", "rooster"], 4)).toEqual([
      "caterpiller",
      "rooster",
    ]);
    expect(fns.wordsOfLength(["John", "Daenerys", "Cersei"], 6)).toEqual([
      "Daenerys",
      "Cersei",
    ]);
  });
});

describe("measurementToNumber", () => {
  test("should convert the measurements to numbers", () => {
    expect(fns.measurementToNumber(["10cm", "4.2cm", "205cm"])).toEqual([
      10, 4.2, 205,
    ]);
    expect(fns.measurementToNumber(["100mm", "42mm", "2.05mm"])).toEqual([
      100, 42, 2.05,
    ]);
  });
});

describe("numberOfVowels", () => {
  test("should find the total number of vowels in the string", () => {
    expect(fns.numberOfVowels("Stay classy San Diego")).toEqual(6);
    expect(fns.numberOfVowels("I love lamp")).toEqual(4);
    expect(fns.numberOfVowels("Whammy!")).toEqual(1);
  });
});

describe("titleCase", () => {
  test("should capitalise the first letter of each word", () => {
    expect(fns.titleCase("The lord of the rings")).toEqual(
      "The Lord Of The Rings"
    );
    expect(fns.titleCase("The red hot chili peppers")).toEqual(
      "The Red Hot Chili Peppers"
    );
  });
});
