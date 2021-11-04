// set up early bail
let failCount = 0

// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [shadowAge, listOfPuppies, puppyAges] = Function(trimmed + "; return [shadowAge, listOfPuppies, puppyAges];")();

test(shadowAge, 0, 'shadowAge')
testContains(code, /puppyAges\[0\]/, 'accessing shadow\'s age', 'the [] accessor')
test(puppyAges[1], 2, 'mocha\'s birthday (puppyAges[1])')
test(listOfPuppies, ['shadow', 'mocha', 'ranger', 'holly'], 'listOfPuppies')
test(puppyAges, [0,2,2,0], 'puppyAges')


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

function test(actual, expected, message) {
  if (failCount > 0) {
    return // early bail
  }
  if (deepEquals(actual, expected)) {
    console.log(`✅\tTest passed for ${JSON.stringify(message)}. Nice job.`)
    return true
  } else { 
      console.log(`❌\tThe test for ${message} expected:\n\t${JSON.stringify(expected)}\nbut your code resulted in:\n\t${JSON.stringify(actual)}`)
      failCount += 1
      return false
    }
}

function testContains(code, required, testName, message) {
  if (failCount > 0) {
    return // early bail
  }
  if(!code.match(required)) {
    console.log(`❌\tThe code for ${testName} works, but it doesn't use ${message}.`)
    failCount += 1
  }
}
