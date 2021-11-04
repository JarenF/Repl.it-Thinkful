// setting up early-bail
var failCount = 0

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'the findPerson function'
// findPerson should be defined as a function
if(typeof findPerson !== 'function') {
  failed(context, "You need to define a function findPerson.")
} else {
  // findPerson should return the person who matches a particular name
  let people = [
      { name: "Eliza", city: "Los Angeles", likes: ["pizza", "karaoke", "improv"] },
      { name: "Shiela", city: "Denver", likes: ["photography", "painting", "movies"] },
      { name: "Ben", city: "Los Angeles", likes: ["pizza", "karate", "sci-fi"] },
      { name: "Mohammed", city: "Los Angeles", likes: ["sailing", "golf", "kayaking"] },
      { name: "Yukiko", city: "Tokyo", likes: ["ramen", "karaoke", "jazz"] },
      { name: "Chris", city: "Brooklyn", likes: ["pizza", "karaoke", "improv"] }
    ];

  let callWith = [[people, "Eliza"],[people, "Shiela"],[people.slice(0,3), "Ben"]]
  for (let functionArgs of callWith) {
    if (failCount > 0) {
      // bail early
      break
    }
    let actual = findPerson(...functionArgs)
    if (actual === undefined) {
      failed(context, "You didn't return anything from findPerson. You have to return a value.")
    } else {
      let [peopleArr, name] = functionArgs
      let correctAnswer = peopleArr.find(p => p.name == name)
      test(actual, correctAnswer, context, functionArgs)
    }
  }
  if (failCount === 0) {
    passed(context, "Nice job.")
  }
}

function fail(message) {
  console.log(`❌\t${message}`)
  failCount += 1
}

function failed(name, message) {
  console.log(`❌\t Your code for ${name} didn't work as expected.`)
  console.log(message)
  failCount += 1
}

// single example
function pass(message) {
  console.log(`✅\t${message}`)
}

// overall
function passed(name, message) {
  console.log(`✅\tYour code for ${name} worked!\n${message}`)
}

function arrayEqual(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length
    && a.every((n,i) => 
      Array.isArray(n) ? arrayEqual(n, b[i]) : n == b[i]
    )
}

function check(a,b) {
  if (Array.isArray(a)) {
    return arrayEqual(a,b)
  } else {
    return a === b
  }
}

function test(actual, expected, testName, args) {
  if (failCount > 0) {
    // bail early
    return
  }
  if (check(actual, expected)) {
    pass(`When called with\n\t${JSON.stringify(args)}\nYour function returned:\n\t${JSON.stringify(actual)}`)
  } else {
    fail(`When called with\n\t${JSON.stringify(args)}\nThe test expected you to return:\n\t${JSON.stringify(expected)}\nbut your function returned:\n\t${JSON.stringify(actual)}`)
  }
}