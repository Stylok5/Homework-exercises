
// * A BIT MORE ON OBJECTS...


// ? OBJECTS AND ARRAYS

const zoo = {
  hasTigers: false,
  hasElephants: true,
  hasDragons: false,
  zooKeeper: 'Nick',
}

// ? Getting an array of values from an object:
// zoo -> [false, true, false]
const zooValues = Object.values(zoo)
// console.log(zooValues)

// ? Getting an array of keys from an object:
// zoo -> ['hasTigers', 'hasElephants', 'hasDragons']
const zooKeys = Object.keys(zoo)
// console.log(zooKeys)

// ? Getting an array of key/value pairs from our object
// zoo -> [['hasTigers', false], ['hasElephants', true], ['hasDragons', false]]
const zooKeyValues = Object.entries(zoo)
// console.log(zooKeyValues)



// * COMPARING OBJECTS

const num = 10
const num2 = 10

// console.log(num === num2)



const person1 = { name: 'Nicholas' }
const person2 = { name: 'Nicholas' }

// console.log(person1 === person2)
// console.log(person1 === person1)

// ! OBJECTS ARE COMPARED BY REFERENCE NOT BY VALUE.
const person3 = { name: 'Nicholas', role: 'instructor' }
// console.log(person3)
// delete person3.name
// console.log(person3)

const person4 = person3
person4.newThing = 'Thing'
console.log(person4 === person3)

// console.log(person3)
// console.log(person4)

console.log(person1.name === person2.name)

// console.log('nick' === 'nick')
// console.log({ name: 'nick' } === { name: 'nick' })





// ? COPY OF OF AN OBJECTS PROPERTIES/METHODS TO ANOTHER OBJET.
const obj = { name: 'Nick', role: 'instructor' }
const newObj = { ...obj }
console.log(newObj)
console.log(obj === newObj) // this is false



// * FUNCTIONS, AND ARRAYS OF OBJECTS..

const books = [
  {
    name: 'The Martian',
    author: 'Andy Weir',
  },
  {
    name: 'Godel, Escher, Bach',
    author: 'Douglas Hofdstader',
  },
  {
    name: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K.Rowling',
  }
]

const booksWithPages = books.map((book) => {
  const newBook = {
    name: book.name,
    author: book.author,
    hasRead: true,
  }
  return newBook
})

console.log(booksWithPages)


// const readArray = [true, false, true]

// const booksWithPages = books.map((book, index) => {
//   const newBook = {
//     name: book.name,
//     author: book.author,
//     hasRead: readArray[index],
//   }
//   return newBook
// })

// console.log(booksWithPages)
