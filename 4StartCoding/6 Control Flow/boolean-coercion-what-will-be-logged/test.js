// setting up early-bail
var failCount = 0

// spy, only so that students don't see weird double logs
let unspiedConsoleLog = spy(console, 'log')

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [weatherGuess, temperatureGuess, nothingToSayGuess, freezingGuess] = Function(trimmed + "; return [weatherGuess, temperatureGuess, nothingToSayGuess, freezingGuess];")();

let context = 'guesses for boolean coercion'
// just check the guesses
test(weatherGuess, true, "sunny")
test(temperatureGuess, true, 31)
test(nothingToSayGuess, false, '""')
test(freezingGuess, false, 0)

function fail(message) {
  unspiedConsoleLog(`❌\t${message}`)
}

// single example
function pass(message) {
  unspiedConsoleLog(`✅\t${message}`)
}

function test(actual, expected, value) {
  if (failCount > 0) {
    // bail early
    return
  }
  if (actual === expected) {
    pass(`Yes! ${value} was coerced to ${JSON.stringify(expected)}`)
  } else if (actual === undefined) {
    fail(`Enter a guess for what ${value} will be coerced to`)
  } else {
    fail(`Nope! ${value} was coerced to ${JSON.stringify(expected)}. You guessed ${JSON.stringify(actual)}`)
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