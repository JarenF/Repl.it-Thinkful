
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [students] = Function(trimmed + '; return [students]')();

let correct = {
  guillermo: {
    classes : ['math', 'chemistry', 'english'],
    grade : 11,
    age : 16,
  },
  jacob: {
    classes : ['history', 'math', 'physics'],
    grade : 12,
    age : 17,
  }
}

let failCount = 0

test(students.guillermo, correct.guillermo, 'guillermo')
test(students.jacob, correct.jacob, 'jacob')
testMatch(code, /students.guillermo\s*=/, 'dot notation to reassign guillermo')
testMatch(code, /students.guillermo\s*=/, 'dot notation to reassign jacob')

function formatExpectation(actual, expected) {
   return `\nexpected:\n${JSON.stringify(expected, null, 2)}\ngot:\n${JSON.stringify(actual, null, 2)}.`
}

function test(actual, expected, message) {
  if (failCount > 0) {
    return
  }
  if (deepEquals(actual, expected)) {
    console.log(`✅\tPassed for ${message}`)
  } else {
    console.log(`❌\tFailed for ${message}`, formatExpectation(actual, expected))
    failCount += 1
  }
}

function testMatch(code, mustContain, message) {
  if (failCount > 0) {
    return
  }
  if(!code.match(mustContain)) {
    console.log(`❌\tFailed\nCode must use ${message}`)
    failCount += 1
  }
}

function isObject(o) {
  return typeof(o) === 'object' && o !== null
}

function deepEquals(a,b) {
  if(isObject(a) && isObject(b)) {
    let keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) {
      return false
    }
    for (key of keys) {
      if(!deepEquals(a[key], b[key])) {
        return false
      }
    }
    // if all the keys match, they're equal
    return true
  } else {
    return a === b
  }
}