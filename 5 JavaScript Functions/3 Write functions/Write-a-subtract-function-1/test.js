// setting up early-bail
var failCount = 0

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'the subtract function'
let difference = (a, b) => a - b
if(typeof subtract !== 'function') {
  failed(context, "You need to define a function subtract.")
} else {
  let callWith = [[5,2],[1,2], [3,5], [6,4], [1231, 65]]
  for (let functionArgs of callWith) {
    if (failCount > 0) {
      // bail early
      break
    }
    let actual = subtract(...functionArgs)
    if (actual === undefined) {
      failed(context, "You didn't return anything from subtract. You have to return a value.")
    } else {
      let correctAnswer = difference(...functionArgs)
      test(actual, correctAnswer, context, functionArgs)
    }
  }
  if (failCount === 0) {
    passed(context, "Nice job returning the value.")
  }
}

function fail(message) {
  console.log(`❌\t${message}`)
  failCount += 1
}

function failed(name, message) {
  console.log(`❌\t Your code for ${name} didn't work as expected.`)
  console.log(message)
  failCount += 1
}

// single example
function pass(message) {
  console.log(`✅\t${message}`)
}

// overall
function passed(name, message) {
  console.log(`✅\tYour code for ${name} worked!\n${message}`)
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