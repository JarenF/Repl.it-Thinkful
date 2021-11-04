// setting up early-bail
var failCount = 0

// spy on console.log function
let unspiedConsoleLog = spy(console, 'log')
// now, console.log will have an array of all its calls

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'the addLike function'
// addLike should be defined as a function
if(typeof addLike !== 'function') {
  failed(context, "You need to define a function addLike.")
} else {
  // addLike should return the person's city
  // console.log shouldn't be called in the function
  if(console.log.calls.length !== 0) {
    failed(context, "Don't call console.log. Return the result from your addLike function instead.")
  } else {
    let callWith = [
      [{ name: "Eliza", city: "Los Angeles", likes: ["pizza", "karaoke", "improv"] }, "hiking"],
      [{ name: "Shiela", city: "Denver", likes: ["photography", "painting", "movies"] }, "ramen"],
      [{ name: "Ben", city: "Los Angeles", likes: ["pizza", "karate", "sci-fi"] }, "movies"]
    ]
    for (let functionArgs of callWith) {
      if (failCount > 0) {
        // bail early
        break
      }
      let [person, topic] = functionArgs;
      let originalLikes = person.likes
      let correctAnswer = [...originalLikes, topic]
      addLike(...functionArgs)
      let actual = person.likes
      test(actual, correctAnswer, context, functionArgs)
    }
    if (failCount === 0) {
      passed(context, "Nice job.")
    }
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

function spy(obj, name, options={callThrough: false}) {
  let oldVersion = obj[name]
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