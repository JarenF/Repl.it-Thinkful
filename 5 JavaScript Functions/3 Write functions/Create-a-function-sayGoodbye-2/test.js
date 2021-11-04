// setting up early-bail
var failCount = 0

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [sayGoodbye] = Function(trimmed + "; return [sayGoodbye];")();

// spy on console.log function
let unspiedConsoleLog = spy(console, 'log')
// now, console.log will have an array of all its calls

let context = 'the sayGoodbye function'
// sayGoodbye should be defined as a function
if(typeof sayGoodbye !== 'function') {
  failed(context, "You need to define a function sayGoodbye")
} else {
  // sayGoodbye should log "Goodbye for now"
  // console.log shouldn't be called before we call sayGoodbye
  if(console.log.calls.length !== 0) {
    failed(context, "Only call console.log inside the body of the sayGoodbye function. Right now, you're calling it outside of sayGoodbye.")
  } else {
    // after we call sayGoodbye, console.log should be called with the right args, the right number of times
    sayGoodbye()
    if(console.log.calls.length === 0) {
      failed(context, "You need to call console.log in your sayGoodbye function.")
    } else if (console.log.calls.length > 1) {
      failed(context, "You called console.log more than once from inside the sayGoodbye function. The test expects that you call it exactly once.")
    } else {
      let args = console.log.calls[0];
      if(args.length === 0) {
        failed(context, "You didn't pass anything into console.log")
      } else if(args.length > 1) {
        failed(context, `You passed in more than one argument to console.log. The tests want you to pass "Goodbye for now!". You passed: ${JSON.stringify(args)}`)
      } else {
        let string = args[0]
        test(string, "Goodbye for now!", context)
      } 
    }
  }
}

function failed(name, message) {
  unspiedConsoleLog(`❌\t Your code for ${name} didn't work as expected.`)
  unspiedConsoleLog(message)
}

function passed(name, message) {
  unspiedConsoleLog(`✅\tYour code for ${name} worked! ${message}`)
}

function test(actual, expected, testName) {
  if (failCount > 0) {
    // bail early
    return
  }
  if (actual === expected) {
    passed(testName, `Your function sayGoodbye logs ${JSON.stringify(actual)} when called`)
  } else {
    failed(testName, `The test expected you to log:\n\t${JSON.stringify(expected)}\nbut your code instead logged:\n\t${JSON.stringify(actual)}`)
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