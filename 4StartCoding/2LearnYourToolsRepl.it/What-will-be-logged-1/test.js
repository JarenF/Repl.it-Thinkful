// setting up early-bail
var failCount = 0

// spy, so that students don't see weird double logs
let unspiedConsoleLog = spy(console, 'log')

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [guessOne, guessTwo, guessThree, x,y,z] = Function(trimmed + "; return [guessOne, guessTwo, guessThree, x,y,z];")();

// just check the guesses
test(guessOne, 24 , "guessOne", "let x = 21 + 3")
test(guessTwo, 5, "guessTwo", "let y = 2 * 6 / 3 + 1")
test(guessThree, "We use repls for drills, playgrounds, and prediction.", "guessThree", 'let z = "We use repls for " + "drills, playgrounds, and prediction."')

function fail(message) {
  unspiedConsoleLog(`❌\t${message}`)
}

// single example
function pass(message) {
  unspiedConsoleLog(`✅\t${message}`)
}

function test(actual, expected, name, context) {
  if (failCount > 0) {
    // bail early
    return
  } else if(!actual) { // HACK: 0 and "" are both falsy
    fail(`Enter your guess in '${name}' for '${context}''`)
    failCount += 1
  } else  if (actual === expected) {
    pass(`Yes! For ${name}, the result of '${context}', was ${JSON.stringify(expected)}`)
  } else {
    fail(`Nope!\nFor '${name}', you guessed ${JSON.stringify(actual)} for the result of '${context}'.\nThe actual result is ${JSON.stringify(expected)}`)
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