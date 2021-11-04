// setting up early-bail
var failCount = 0

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
eval(code)

let context = 'gradeQuiz'
// gradeQuiz should be defined as a function
if(typeof gradeQuiz !== 'function') {
  failed(context, "You need to define a function gradeQuiz.")
} else {
  // gradeQuiz should return the number that are equal
  let callWith = [[['C', 'D', 'B'], ['C', 'A', 'B']],[['C', 'D', 'D', 'B', 'A', 'C', 'B'], ['A', 'D', 'D', 'B', 'B', 'C', 'B' ]]]
  for (let functionArgs of callWith) {
    if (failCount > 0) {
      // bail early
      break
    }
    let score = gradeQuiz(...functionArgs)
    if(score === undefined) {
      failed(context, 'nothing returned from gradeQuiz')
    } else if (typeof score !== 'number') {
        failed(context, `gradeQuiz should return a number`)
      } else {
        let [student, teacher] = functionArgs
        let correct = student.reduce((memo, v, i) =>  v === teacher[i] ? memo + 1 : memo, 0)
        test(score, correct, context, functionArgs)
      }
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
  if (actual === expected) {
    pass(`When called with\n${JSON.stringify(args)}\ngradeQuiz returned:\t${JSON.stringify(actual)}`)
  } else {
    fail(`When called with\n${JSON.stringify(args)}\nThe test expected:\t${JSON.stringify(expected)}\ngradeQuiz returned:\t${JSON.stringify(actual)}`)
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