// for tracking the console.log calls
let unspiedConsoleLog = spy(console, 'log')

const fs = require('fs');
let code = fs.readFileSync('./index.js', 'utf8');
let trimmed = code.replace(/^require.*/gm, '')
Function(trimmed)(); // shouldn't need any of the values back

// testing the first loop - log the numbers from 1 to 10
test(flatten(console.log.calls.slice(0,10)), [1,2,3,4,5,6,7,8,9,10])
test(flatten(console.log.calls.slice(10,16)), [5,6,7,8,9,10])
test(flatten(console.log.calls.slice(16)), [0,10,20,30,40,50,60,70,80,90,100])

function test(actual, expected){
  if(arrayEqual(actual, expected)) {
    unspiedConsoleLog(`✅\tPassed\n\texpected:\t${JSON.stringify(expected)}\n\tgot:\t\t${JSON.stringify(actual)}`);
    return true;
  }else{
    unspiedConsoleLog(`❌\tFailed\n\texpected:\t${JSON.stringify(expected)}\n\tgot:\t\t${JSON.stringify(actual)}`);
    return false;
  } 
}

function testCode(code, requiredMethod, message){
  if(!code.match(requiredMethod)){
    unspiedConsoleLog(`Code passed but was done without using ${message}, try solving the challenge using  ${message}`)
  }
}

function arrayEqual(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length
    && a.every((n,i) =>
      Array.isArray(n) ? arrayEqual(n, b[i]) : n == b[i]
    )
}

function spy(obj, name, options={callThrough: false}) {
  var oldVersion = obj[name]
  let calls = []
  function newfunc(...args) {
    if (options.callThrough) {
      oldVersion(...args) // keep the existing behavior
    }
    calls.push(args) // add the calls in
  }
  newfunc.calls = calls
  obj[name] = newfunc;
  return oldVersion;
}

function flatten(arr) {
  return arr.reduce((memo, item) => memo.concat(item), [])
}