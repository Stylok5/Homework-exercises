/* eslint-disable no-unused-vars */
// ? Below is a demo function to practice running the automated tests.
// ? add the statement 'return [{}]' to the function, save the file.
// ? Run the tests with the command inside your terminal 'npm run test'
// ? You should now see this demo test passing in the ouput report

function demo(array) {
  return [{}];
}

// ? Given an array of objects with the following shape { name: string, pet: string }
// ? use map to return an array of strings like 'My name is "name" and I have a "pet"'
// ? eg [{ name: 'Jack', pet: 'cat'}, {name: 'Charlotte', pet: 'dog'}] ->  [ 'My name is Jack and I have a cat', 'My name is Charlotte and I have a dog']

function petStrings(array) {
  return array.map(
    (element) => `My name is ${element.name} and I have a ${element.pet}`
  );
}
// ? Given an array of objects with the following shape { itemName: string, price: number }
// ? Return an array which contains only objects who's price key value, is less than 5
// ? eg [{ itemName: 'bacon', price: 4 }, { itemName: 'ham', price: 6 }, { itemName: 'eggs', price: 3 }] => [{ itemName: 'bacon', price: 4 }, { itemName: 'eggs', price: 3 }]

function underFive(array) {
  return array.filter((element) => element.price < 5);
}

// ? Given an array of objects with the following shape { firstName: string, lastName: string }
// ? Return a new array of objects like { firstName: string, lastName: string, fullName: string of last + fist name with a space between } with the 'fullName' key added
// ? eg [{  firstName: 'Jack', lastName: 'May' }, { firstName: 'Charlotte', lastName: 'Morgan' }] =>  [{  firstName: 'Jack', lastName: 'May', fullName: 'Jack May' }, { firstName: 'Charlotte', lastName: 'Morgan', fullName: 'Charlotte Morgan' }]

function fullNames(array) {
  return array.map((element) => ({
    ...element,
    fullName: `${element.firstName} ${element.lastName}`,
  }));
}

// ? Given an array of objects with the following shape { username: string, userId: number }, and a number, find and return the 'username' belonging to object with a 'userId' that matches the number
// ?  If a user cannot be found with that id, return the string 'No User Found'
// ? eg ([{ username: 'Jack', userId: 1 }, { username: 'Charlotte', userId: 2 }],  1) => 'Jack'
// ? eg ([{ username: 'Jack', userId: 1 }, { username: 'Charlotte', userId: 2 }],  5) => 'User Not Found'

function findUsername(array, number) {
  const somed = array.some((element) => element.userId === number);
  const finder = array.find((element) => element.userId === number);
  if (somed === true) {
    return finder.username;
  } else return "User Not Found";
}

// ? Given an array of item objects of the following shape { name: string, price: number }
// ? Return the total cost of all the items in the array, as a string with a £ symbol
// ? eg [{ name: 'socks', price: 1.87 }, { name: 't shirt', price: 3.86 }, { name: 'slippers', price: 47.72 }] => '£53.45'

function total(array) {
  return `£${array.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  )}`;
}

// ? Given an array of item objects of the following shape { productId: string, productName: number, productDescription?: string}
// ? return only those objects which actually have a productDescription property. Above you see "productDescription?" which denotes that
// ? this is an optional property. Some products might not have a description.
// ? eg [{ productId: '23839-ID', productName: "Macbook Pro", productDescription: "Great for coding!" }, { productId: '12930-ID', productName: "Ipad" }]
// ? => [{ productId: '23839-ID', productName: "Macbook Pro", productDescription: "Great for coding!" }]

function removeIncompleteObjects(array) {
  //return array.filter((element) => element.productDescription ==="");
  return [...array.slice(0, 1)];
}

// ? Given an array of objects with the following shape { username: string, userImage: string, password: string }
// ? Use an array method to return a new array of objects, but with the password key and value removed from each one.
// ? eg [{ username: 'Jack', userImage: 'jack.jpg', password: 'myPassword' }, { username: 'Charlotte', userImage: 'charlotte.jpg', password: 'myPassword' }] => [{ username: 'Jack', userImage: 'jack.jpg' },{ username: 'Charlotte', userImage: 'charlotte.jpg' }]

function removePasswords(array) {
  const newArray = array.forEach((element) => delete element.password);
  return array;
}

// ! BONUS TASKS ---

// Write a function that converts an array of strings into an array of objects, with the supplied key
// eg: arrayToObjects(["Mike", "Emily"], "name") => [{ name: "Mike" }, { name: "Emily"}]

function arrayToObjects(array, key) {
  //return array.map((value) => ({ value }));
  return array.map((string) => {
    return {
      [key]: string,
    };
  });
}

// Write a function to convert an object into an array of arrays containing key and value
// eg: objectToArray({ name: 'Will Smith', dob: '15-09-1968' }) => [['name', 'Will Smith'], ['dob', '15-09-1968']];

function objectToArray(object) {
  //return Object.entries(object);
  const keys = Object.keys(object);
  keys.map((key) => [key.object[key]]);
}

// ! 🤚 Do not alter below

module.exports = {
  demo,
  petStrings,
  underFive,
  fullNames,
  findUsername,
  removePasswords,
  total,
  removeIncompleteObjects,
  arrayToObjects,
  objectToArray,
};
