// setting up early-bail
var failCount = 0

// spy, only so that students don't see weird double logs
let unspiedConsoleLog = spy(console, 'log')

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

// favoriteFood should be defined as a function
if(typeof favoriteFood !== 'function') {
  fail("Don't change the favoriteFood function")
} else {
  // test console.log in favoriteFood
  ["pizza", "pickles", "cotton candy"].forEach((item => {
    console.log.calls.length = 0; // truncate calls array
    favoriteFood(item);
    test(console.log.calls[0][0], `My favorite food is ${item}`, `${item}`)
  }))
}

function fail(message) {
  unspiedConsoleLog(`❌\t${message}`)
}

// single example
function pass(message) {
  unspiedConsoleLog(`✅\t${message}`)
}

function test(actual, expected, args) {
  if (failCount > 0) {
    // bail early
    return
  }
  if (actual === expected) {
    pass(`Passed. When called with ${JSON.stringify(args)}, favoriteFood logs ${JSON.stringify(expected)}`)
  } else {
    fail(`Nope! When called with ${JSON.stringify(args)}, favoriteFood logs ${JSON.stringify(expected)}, but it logged ${JSON.stringify(actual)}`)
    failCount += 1
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