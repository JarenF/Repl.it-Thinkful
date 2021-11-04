// setting up early-bail
var failCount = 0

// spy on console.log function
let unspiedConsoleLog = spy(console, 'log')
// now, console.log will have an array of all its calls

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'printInstructions'
let sum = (a) => a.reduce((memo, i) => i + memo, 0)
// printInstructions should be defined as a function
if(typeof printInstructions !== 'function') {
  failed(context, "You need to define a function printInstructions.")
} else {
  // printInstructions should log each step with the "Step N - " appended
  let callWith = [["Remove the plastic wrapper", "Microwave 45 seconds", "Let cool", "Enjoy!"], ["Mix yeast and water to activate yeast", "Stir in flour and salt", "Knead for 10 minutes", "Cover and allow to rise 2 hours", "Bake 30 min at 425 degrees F"]]
  for (let functionArgs of callWith) {
    if (failCount > 0) {
      // bail early
      break
    }
    console.log.calls.length = 0 // dangerously clear call array
    printInstructions(functionArgs)
    if(console.log.calls.length === 0) {
        failed(context, "You didn't call console.log from printInstructions.")
    } else if (console.log.calls.length !== functionArgs.length) {
        failed(context, `printInstructions should call console.log once for each item in the array, so ${functionArgs.length} times for the array ${JSON.stringify(functionArgs)}`)
      } else {
        let correctLog = functionArgs.map((s,i) => [`Step ${i + 1} - ${s}`])
        test(console.log.calls, correctLog, context, functionArgs)
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

function arrayEqual(a, b) {
  return Array.isArray(a) && Array.isArray(b)
    && a.every((n,i) => 
      Array.isArray(n) ? arrayEqual(n, b[i]) : n === b[i]
    )
}

function test(actual, expected, testName, args) {
  if (failCount > 0) {
    // bail early
    return
  }
  if (arrayEqual(actual, expected)) {
    pass(`When called with\n\t${JSON.stringify(args)}\n printInstructions logged:\n${actual.join("\n")}`)
  } else {
    fail(`When called with\n\t${JSON.stringify(args)}\nThe test expected to log:\n${expected.join("\n")}\nbut printInstructions logged:\n${actual.join("\n")}`)
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