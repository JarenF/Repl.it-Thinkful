const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [tRexFacts, height, teeth] = Function(trimmed + '; return [tRexFacts, height, teeth]')();


let failCount = 0;
test(tRexFacts, {
  scientificName: "Tyrannosaurus Rex",
  period: "Cretaceous",
  height: "6 meters",
  "number of teeth": 50
})

test(height, "6 meters")
testMatch(code, /tRexFacts\.height/, 'dot notation to access the height')
test(teeth, 50)
testMatch(code, /tRexFacts\[['"]number of teeth['"]\]/, 'square bracket notation to access the number of teeth')

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

function formatExpectation(actual, expected) {
   return `\nexpected:\t${JSON.stringify(expected, null, 2)}\ngot:\t\t${JSON.stringify(actual, null, 2)}`
}


function test(actual, expected) {
  if (failCount > 0) {
    return
  }
  if (deepEquals(actual, expected)) {
    console.log(`✅\tPassed`, formatExpectation(actual, expected))
  } else {
    console.log('❌\tFailed', formatExpectation(actual, expected))
    failCount += 1
  }
}

function testMatch(code, shouldContain, message) {
  if (failCount > 0) {
    return
  }
  if(!code.match(shouldContain)) {
    console.log('❌\tFailed', '\n Expected code to use', message)
    failCount += 1
  }
}