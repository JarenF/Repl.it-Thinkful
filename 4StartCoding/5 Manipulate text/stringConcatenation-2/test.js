// spy on console.log function
let unspiedConsoleLog = spy(console, 'log')

const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [formattedSaleTotal, formattedCostMessage, formattedProfitMessage] = Function(trimmed + "; return [formattedSaleTotal, formattedCostMessage, formattedProfitMessage];")();

let failCount = 0

if(typeof formattedSaleTotal !== 'string') {
  failed('formattedSaleTotal', "You need assign a value to formattedSaleTotal.")
} else {
  test(formattedSaleTotal, 'Sale netted us 4.99', 'formattedSaleTotal')
}

if(typeof formattedCostMessage !== 'string') {
  failed('formattedCostMessage', "You need assign a value to formattedCostMessage.")
} else {
  test(formattedCostMessage, 'Sale cost us 2.25', 'formattedCostMessage')
}

if(typeof formattedProfitMessage !== 'string') {
  failed('formattedProfitMessage', "You need assign a value to formattedProfitMessage.")
} else {
  test(formattedProfitMessage, 'Profit from sale is 2.74', 'formattedProfitMessage')
}


function fail(message) {
  unspiedConsoleLog(`❌\t${message}`)
  failCount += 1
}

function failed(name, message) {
  unspiedConsoleLog(`❌\t Your code for ${name} didn't work as expected.`)
  unspiedConsoleLog(message)
  failCount += 1
}

// single example
function pass(message) {
  unspiedConsoleLog(`✅\t${message}`)
}

// overall
function passed(name, message) {
  unspiedConsoleLog(`✅\tYour code for ${name} worked!\n${message}`)
}

function test(actual, expected, testName) {
  if (failCount > 0) {
    // bail early
    return
  }
  if (actual === expected) {
    pass(`Nice! Got the expected value for ${testName}:\n${JSON.stringify(actual)}`)
  } else {
    fail(`For ${testName}\n\texpected:\n${JSON.stringify(expected)}\nbut got:\n${JSON.stringify(actual)}`)
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