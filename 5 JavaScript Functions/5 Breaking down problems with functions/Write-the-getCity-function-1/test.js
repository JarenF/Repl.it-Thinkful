// setting up early-bail
var failCount = 0

// spy on console.log function
let unspiedConsoleLog = spy(console, 'log')
// now, console.log will have an array of all its calls

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'the getCity function'
// getCity should be defined as a function
if(typeof getCity !== 'function') {
  failed(context, "You need to define a function getCity.")
} else {
  // getCity should return the person's city
  // console.log shouldn't be called in the function
  if(console.log.calls.length !== 0) {
    failed(context, "Don't call console.log. Return the result from your getCity function instead.")
  } else {
    let callWith = [
      { name: "Eliza", city: "Los Angeles", likes: ["pizza", "karaoke", "improv"] },
      { name: "Shiela", city: "Denver", likes: ["photography", "painting", "movies"] },
      { name: "Ben", city: "Los Angeles", likes: ["pizza", "karate", "sci-fi"] },
      { name: "Mohammed", city: "Los Angeles", likes: ["sailing", "golf", "kayaking"] },
      { name: "Yukiko", city: "Tokyo", likes: ["ramen", "karaoke", "jazz"] },
      { name: "Chris", city: "Brooklyn", likes: ["pizza", "karaoke", "improv"] }
    ]
    for (let functionArg of callWith) {
      if (failCount > 0) {
        // bail early
        break
      }
      
      let actual = getCity(functionArg)
      if(console.log.calls.length !== 0) {
        failed(context, "Don't call console.log from your getCity function. Return the result instead.")
      } else if (actual === undefined) {
        failed(context, "You didn't return anything from getCity. You have to return a value.")
      } else {
        let person = functionArg
        let correctAnswer = person.city
        test(actual, correctAnswer, context, functionArg)
      }
    }
    if (failCount === 0) {
      passed(context, "Nice job returning the value.")
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

function test(actual, expected, testName, args) {
  if (failCount > 0) {
    // bail early
    return
  }
  if (actual === expected) {
    pass(`When called with\n\t${JSON.stringify(args)}\nYour function returned:\n\t${JSON.stringify(actual)}`)
  } else {
    fail(`When called with\n\t${JSON.stringify(args)}\nThe test expected you to return:\n\t${JSON.stringify(expected)}\nbut your function returned:\n\t${JSON.stringify(actual)}`)
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