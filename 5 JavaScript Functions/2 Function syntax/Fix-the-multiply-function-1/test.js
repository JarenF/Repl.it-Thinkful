// setting up early-bail
var failCount = 0

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let mul = (a, b) => a * b
// multiply should be defined as a function
if(typeof multiply !== 'function') {
  fail("You need to define a multiply function")
} else {
  // test the result of multiply
  [[2,5], [25,20], [5,15], [542, 197]].forEach((args => {
    let res = multiply(...args);
    test(res, mul(...args), args)
  }))
}

function fail(message) {
  console.log(`❌\t${message}`)
}

// single example
function pass(message) {
  console.log(`✅\t${message}`)
}

function test(actual, expected, args) {
  if (failCount > 0) {
    // bail early
    return
  }
  if (actual === expected) {
    pass(`Passed. When called with ${JSON.stringify(args)}, multiply returns ${JSON.stringify(expected)}`)
  } else {
    if (actual === undefined) {
      fail(`Failed.\n Multiply should return a value`)
    } else {
      fail(`Failed.\nWhen called with ${JSON.stringify(args)}, multiply should return ${JSON.stringify(expected)}. It returned ${JSON.stringify(actual)}`)
    }
    
    failCount += 1
  }
}