/* eslint-disable no-undef */
const fns = require("./problems");

describe("demo", () => {
  test("should return an array with an empty object inside", () => {
    expect(fns.demo([{}])).toEqual([{}]);
  });
});

describe("petStrings", () => {
  test('should return strings like the following, "My name is "name" and I have a "pet"', () => {
    expect(
      fns.petStrings([
        { name: "Jack", pet: "cat" },
        { name: "Charlotte", pet: "dog" },
      ])
    ).toEqual([
      "My name is Jack and I have a cat",
      "My name is Charlotte and I have a dog",
    ]);
  });
});

describe("underFive", () => {
  test("should return an array only containing objects that have a price less than 5", () => {
    expect(
      fns.underFive([
        { itemName: "bacon", price: 4 },
        { itemName: "ham", price: 6 },
        { itemName: "eggs", price: 3 },
      ])
    ).toEqual([
      { itemName: "bacon", price: 4 },
      { itemName: "eggs", price: 3 },
    ]);
  });
});

describe("fullnames", () => {
  test("should return objects with a fullName key added", () => {
    expect(
      fns.fullNames([
        { firstName: "Jack", lastName: "May" },
        { firstName: "Charlotte", lastName: "Morgan" },
        { firstName: "Noa", lastName: "Filosof" },
        { firstName: "Jos", lastName: "Bogan" },
      ])
    ).toEqual([
      { firstName: "Jack", lastName: "May", fullName: "Jack May" },
      {
        firstName: "Charlotte",
        lastName: "Morgan",
        fullName: "Charlotte Morgan",
      },
      { firstName: "Noa", lastName: "Filosof", fullName: "Noa Filosof" },
      { firstName: "Jos", lastName: "Bogan", fullName: "Jos Bogan" },
    ]);
  });
});

describe("findUsername", () => {
  test("Should return the username with the matching userId", () => {
    expect(
      fns.findUsername(
        [
          { username: "Jack", userId: 1 },
          { username: "Charlotte", userId: 2 },
        ],
        1
      )
    ).toEqual("Jack");
  });
  test('Should return the string "User Not Found" if no user exists with a matching userId', () => {
    expect(
      fns.findUsername(
        [
          { username: "Jack", userId: 1 },
          { username: "Charlotte", userId: 2 },
        ],
        5
      )
    ).toEqual("User Not Found");
  });
});

describe("removePasswords", () => {
  test("Should remove the password key and value from the objects inside the array", () => {
    expect(
      fns.removePasswords([
        { username: "Jack", userImage: "jack.jpg", password: "myPassword" },
        {
          username: "Charlotte",
          userImage: "charlotte.jpg",
          password: "myPassword",
        },
      ])
    ).toEqual([
      { username: "Jack", userImage: "jack.jpg" },
      { username: "Charlotte", userImage: "charlotte.jpg" },
    ]);
  });
});

describe("total", () => {
  test("Should sum the total of the items in the array and return it as a string with a £ symbol", () => {
    expect(
      fns.total([
        { name: "socks", price: 1.87 },
        { name: "t shirt", price: 3.86 },
        { name: "slippers", price: 47.72 },
      ])
    ).toEqual("£53.45");
  });
});

describe("removeIncompleteObjects", () => {
  test("Should remove all objects in an array that do not have the productDescription property", () => {
    expect(
      fns.removeIncompleteObjects([
        {
          productId: "23839-ID",
          productName: "Macbook Pro",
          productDescription: "Great for coding!",
        },
        { productId: "12930-ID", productName: "Ipad" },
      ]).length
    ).toEqual(1);
  });
});

describe("arrayToObjects", () => {
  test("should convert an array of strings to an array of objects", () => {
    expect(typeof fns.arrayToObjects(["Paris", "New York"], "city")[0]).toBe(
      "object"
    );
  });
  test("should have one object for each string in the original array", () => {
    expect(fns.arrayToObjects(["Paris", "New York"], "city").length).toEqual(2);
  });
  test("each object should have the supplied key, and the value of the original array", () => {
    expect(fns.arrayToObjects(["Paris", "New York"], "city")[0].city).toEqual(
      "Paris"
    );
    expect(fns.arrayToObjects(["Paris", "New York"], "city")[1].city).toEqual(
      "New York"
    );
  });
});

describe("objectToArray", () => {
  test("should convert an object into an array", () => {
    expect(
      typeof fns.objectToArray({ name: "Will Smith", dob: "15-09-1968" })
    ).toBe("object");
  });
  test("should have one array element for each key/value pair", () => {
    expect(
      fns.objectToArray({ name: "Will Smith", dob: "15-09-1968" }).length
    ).toEqual(2);
  });
  test("each element should be an array of two elements", () => {
    expect(
      fns.objectToArray({ name: "Will Smith", dob: "15-09-1968" })[0].length
    ).toEqual(2);
    expect(
      fns.objectToArray({ name: "Will Smith", dob: "15-09-1968" })[1].length
    ).toEqual(2);
  });
  test("should contain the data in the correct format", () => {
    expect(
      fns.objectToArray({ name: "Will Smith", dob: "15-09-1968" })[0]
    ).toEqual(["name", "Will Smith"]);
    expect(
      fns.objectToArray({ name: "Will Smith", dob: "15-09-1968" })[1]
    ).toEqual(["dob", "15-09-1968"]);
  });
});
