// setting up early-bail
var failCount = 0


// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'increaseCount'

// increaseCount should be defined as a function
if(typeof increaseCount !== 'function') {
  failed(context, "You need to define a function increaseCount.")
} else {
  // increaseCount should log each step with the "Step N - " appended
   for (let i = 1; i <= 10; i++) {
    if (failCount > 0) {
      // bail early
      break
    }
    let result = increaseCount()
    test(result, i, context)
  }
  if (failCount === 0) {
    passed(context, "Nice job.")
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
  if (actual == expected) {
    pass(`When called on time ${expected} increaseCount returned:\n${actual}`)
  } else {
    fail(`When called on time ${expected}, the test expected: ${expected}\nbut increaseCount returned:\n${actual}`)
  }
}