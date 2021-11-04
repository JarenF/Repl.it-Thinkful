// setting up early-bail
var failCount = 0

// spy on console.log function
let unspiedConsoleLog = spy(console, 'log')
// now, console.log will have an array of all its calls

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'countdown'
// countdown should be defined as a function
if(typeof countdown !== 'function') {
  failed(context, "You need to define a function countdown.")
} else {
  // countdown should log numbers descending from the arg, then 'Blast off!'
  let callWith = [3, 5, 10]
  for (let functionArg of callWith) {
    if (failCount > 0) {
      // bail early
      break
    }
    console.log.calls.length = 0 // dangerously clear call array
    countdown(functionArg)
    if(console.log.calls.length === 0) {
      failed(context, 'nothing logged from countdown')
    } else if (console.log.calls.length !== (functionArg + 1)) {
        failed(context, `countdown should call console.log ${JSON.stringify(functionArg)} plus one time for the "Blast off!" message. Called ${console.log.calls.length} times instead.`)
      }
    let correctLog = Array(functionArg).fill(functionArg).map((n,i) => n - i).map(i => i.toString()).concat('Blast off!').map(s => [s])
        test(console.log.calls, correctLog, context, functionArg)
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
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length
    && a.every((n,i) => 
      Array.isArray(n) ? arrayEqual(n, b[i]) : n == b[i]
    )
}

function test(actual, expected, testName, args) {
  if (arrayEqual(actual, expected)) {
    pass(`When called with\n${JSON.stringify(args)}\ncountdown logged:\n${actual.join('\n')}`)
  } else {
    fail(`When called with\n${JSON.stringify(args)}\nThe test expected:\n${expected.join('\n')}\ncountdown logged:\n${actual.join('\n')}`)
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