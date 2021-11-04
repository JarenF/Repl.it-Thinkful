// setting up early-bail
var failCount = 0

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)


let context = 'the introduceSelf function'
// introduceSelf should be defined as a function
if(typeof introduceSelf !== 'function') {
  failed(context, "You need to define a function introduceSelf")
} else {
  // introduceSelf should return "`Hi! My name is {name}. I'm from {hometown}, and {fun fact}`."
  let callWith = [["Lina", "Forth Worth", "I love to juggle"],["Jasper", "Philadelphia", "I can do a handstand"], ["Jaimee", "Santa Ana", "I do awesome nature photography"]]
  for (let functionArgs of callWith) {
    let result = introduceSelf(...functionArgs)
    if(result === undefined) {
      failed(context, "You need to return a value from your introduceSelf function.")
    } else {
        let [name, hometown, funfact] = functionArgs
        let correctAnswer = `Hi! My name is ${name}. I'm from ${hometown}, and ${funfact}.`
        test(result, correctAnswer, context, functionArgs)
    }
  }
  if (failCount === 0) {
    passed(context, "Nice job fixing the scope bug.")
  }
}

function fail(message) {
  console.log(`❌\t${message}`)
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
    failCount += 1
  }
}