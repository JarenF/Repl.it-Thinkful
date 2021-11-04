const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [fruitBasket] = Function(trimmed + '; return [fruitBasket]')();

let failCount = 0

test(fruitBasket.banana, 'yellow', 'banana should be "yellow"')
testMatch(code, /fruitBasket\.banana\s*=\s*['"]yellow['"]/, "dot notation for banana")

test(fruitBasket.avocado, 'green', 'avocado should be green')
testMatch(code, /fruitBasket\.avocado\s*=\s*['"]green['"]/, "dot notation for avocado")

test(fruitBasket.strawberry, 'red', 'strawberry should be red')
testMatch(code, /fruitBasket\.strawberry\s*=\s*['"]red['"]/, "dot notation for strawberry")

function formatExpectation(actual, expected) {
   return `\nexpected:\n${JSON.stringify(expected, null, 2)}\ngot:\n${JSON.stringify(actual, null, 2)}.`
}

function test(actual, expected, message) {
  if (failCount > 0) {
    return
  }
  if (actual === expected) {
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