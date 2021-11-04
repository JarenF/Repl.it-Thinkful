// setting up early-bail
var failCount = 0

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'the getTotalGoals function'
let sum = (a) => a.reduce((memo, i) => i + memo, 0)
// getTotalGoals should be defined as a function
if(typeof getTotalGoals !== 'function') {
  failed(context, "You need to define a function getTotalGoals.")
} else {
  // totalGoals should return the sum of the numbers in the input array
  let callWith = [[0,1,2], [0,1,3,0,5,4,2,0,1], [1,4,5,1,2,3,0,6,1,1,2,4,0,1,2,2,3,4,1,0]]
  for (let functionArg of callWith) {
    if (failCount > 0) {
      // bail early
      break
    }
    let actual = getTotalGoals(functionArg)
    if (actual === undefined) {
      failed(context, "You didn't return anything from totalGoals. You have to return a value.")
    } else {
      let name = functionArg
      let correctAnswer = sum(functionArg)
      test(actual, correctAnswer, context, functionArg)
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