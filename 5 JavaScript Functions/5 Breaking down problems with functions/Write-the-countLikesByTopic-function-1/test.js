// setting up early-bail
var failCount = 0

// spy on console.log function
let unspiedConsoleLog = spy(console, 'log')
// now, console.log will have an array of all its calls

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'countLikesByTopic'
// countLikesByTopic should be defined as a function
if(typeof countLikesByTopic !== 'function') {
  failed(context, "You need to define a function countLikesByTopic.")
} else {
  // countLikesByTopic should return the number that are equal
  let people = [
  { name: "Eliza", city: "Los Angeles", likes: ["pizza", "karaoke", "improv"] },
  { name: "Shiela", city: "Denver", likes: ["photography", "painting", "movies"] },
  { name: "Ben", city: "Los Angeles", likes: ["pizza", "karate", "sci-fi"] },
  { name: "Mohammed", city: "Los Angeles", likes: ["sailing", "golf", "kayaking"] },
  { name: "Yukiko", city: "Tokyo", likes: ["ramen", "karaoke", "jazz"] },
  { name: "Chris", city: "Brooklyn", likes: ["pizza", "karaoke", "improv"] }
];
  let callWith = [[people, 'photography'],[people, 'karaoke'],[people,'pizza']]
  for (let functionArgs of callWith) {
    if (failCount > 0) {
      // bail early
      break
    }
    console.log.calls.length = 0 // dangerously clear call array
    let count = countLikesByTopic(...functionArgs)
    if(count === undefined) {
      failed(context, 'nothing returned from countLikesByTopic')
    } else if (typeof count !== 'number') {
        failed(context, `countLikesByTopic should return a number`)
      } else {
        let [peopleArr, topic] = functionArgs
        let correct = peopleArr.reduce((memo, p) => p.likes.some(l => l === topic) ? memo + 1 : memo,0)
        test(count, correct, context, functionArgs)
      }
  }
  if (failCount === 0) {
    passed(context, "Nice job.")
  }
}

function fail(message) {
  unspiedConsoleLog(`❌\t${message}`)
  failCount += 1
}

function failed(name, message) {
  unspiedConsoleLog(`❌\t Your code for ${name} didn't work as expected.`)
  unspiedConsoleLog(message)
  failCount += 1
}

// single example
function pass(message) {
  unspiedConsoleLog(`✅\t${message}`)
}

// overall
function passed(name, message) {
  unspiedConsoleLog(`✅\tYour code for ${name} worked!\n${message}`)
}

function test(actual, expected, testName, args) {
  if (failCount > 0) {
    // bail early
    return
  }
  if (actual === expected) {
    pass(`When called with\n${JSON.stringify(args)}\ncountLikesByTopic returned:\t${JSON.stringify(actual)}`)
  } else {
    fail(`When called with\n${JSON.stringify(args)}\nThe test expected:\t${JSON.stringify(expected)}\ncountLikesByTopic returned:\t${JSON.stringify(actual)}`)
  }
}

function spy(obj, name, options={callThrough: false}) {
  var oldVersion = obj[name]
  let calls = []
  function newfunc(...args) {
    if (options.callThrough) {
      oldVersion(...args) // keep the existing behavior
    }
    calls.push(args) // track the calls
  }
  newfunc.calls = calls
  // this monkey-patches obj. Beware!
  obj[name] = newfunc;
  return oldVersion;
}