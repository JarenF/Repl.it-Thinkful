// setting up early-bail
var failCount = 0

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'the addLikeToPerson function'
// addLikeToPerson should be defined as a function
if(typeof addLikeToPerson !== 'function') {
  failed(context, "You need to define a function addLikeToPerson.")
} else {
  // addLikeToPerson should add a like to a particular person
  let people = [
    { name: "Eliza", city: "Los Angeles", likes: ["pizza", "karaoke", "improv"] },
    { name: "Shiela", city: "Denver", likes: ["photography", "painting", "movies"] },
    { name: "Ben", city: "Los Angeles", likes: ["pizza", "karate", "sci-fi"] },
    { name: "Mohammed", city: "Los Angeles", likes: ["sailing", "golf", "kayaking"] },
    { name: "Yukiko", city: "Tokyo", likes: ["ramen", "karaoke", "jazz"] },
    { name: "Chris", city: "Brooklyn", likes: ["pizza", "karaoke", "improv"] }
  ];
  let callWith = [[people.slice(0,1), "Eliza", "hiking"],[people.slice(1,3), "Ben", "ramen"],[people.slice(3), "Yukiko", "movies"]]
  for (let functionArgs of callWith) {
    if (failCount > 0) {
      // bail early
      break
    }
    let [peopleArr, name, topic] = functionArgs;
    let originalLikes = peopleArr.find(p => p.name === name).likes
    let correctAnswer = [...originalLikes, topic]
    addLikeToPerson(...functionArgs)
    let actual = peopleArr.find(p => p.name === name).likes
    test(actual, correctAnswer, context, functionArgs)
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
    pass(`When called with\n\t${JSON.stringify(args)}\nThe likes were changed to:\n\t${JSON.stringify(actual)}`)
  } else {
    fail(`When called with\n\t${JSON.stringify(args)}\nexpected likes to change to:\n\t${JSON.stringify(expected)}\nbut likes were:\n\t${JSON.stringify(actual)}`)
  }
}