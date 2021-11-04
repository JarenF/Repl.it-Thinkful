// setting up early-bail
var failCount = 0

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [sayHelloToMyFriend] = Function(trimmed + "; return [sayHelloToMyFriend];")();

// spy on console.log function
let unspiedConsoleLog = spy(console, 'log')
// now, console.log will have an array of all its calls

let context = 'the sayHelloToMyFriend function'
// sayHelloToMyFriend should be defined as a function
if(typeof sayHelloToMyFriend !== 'function') {
  failed(context, "You need to define a function sayHelloToMyFriend")
} else {
  // sayHelloToMyFriend should log "Hello, x, it's nice to meet you!"
  // after we call sayHello, console.log should be called with the right args, the right number of times
  let callWith = ["Rebekkah", "Mylo", "Ahsan"]
  for (let functionArg of callWith) {
    console.log.calls.length = 0 // clear the calls, dangerously
    sayHelloToMyFriend(functionArg)
    if(console.log.calls.length === 0) {
      failed(context, "You need to call console.log in your sayHelloToMyFriend function.")
    } else if (console.log.calls.length > 1) {
      failed(context, "You called console.log more than once from inside the sayHelloToMyFriend function. The test expects that you call it exactly once.")
    } else {
      let args = console.log.calls[0];
      if(args.length === 0) {
        failed(context, "You didn't pass anything into console.log")
      } else if(args.length > 1) {
        failed(context, `You passed in more than one argument to console.log. The tests want you to pass just one. You passed: ${JSON.stringify(args)}`)
      } else {
        let string = args[0]
        let correctAnswer = `Hello, ${functionArg}, it's nice to meet you!`
        test(string, correctAnswer, context, functionArg)
      }
    }
    if (failCount === 0) {
      passed(context, "Nice job using a parameter.")
    }
  }
}

function fail(message) {
  unspiedConsoleLog(`❌\t${message}`)
}

function failed(name, message) {
  unspiedConsoleLog(`❌\t Your code for ${name} didn't work as expected.`)
  unspiedConsoleLog(message)
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
    pass(`When called with\n\t${JSON.stringify(args)}\nYour function logged:\n\t${JSON.stringify(actual)}`)
  } else {
    fail(`When called with\n\t${JSON.stringify(args)}\nThe test expected you to log:\n\t${JSON.stringify(expected)}\nbut your function logged:\n\t${JSON.stringify(actual)}`)
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