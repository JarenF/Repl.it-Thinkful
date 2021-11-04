
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let trimAndCaps = Function(trimmed + "; return trimAndCaps;")();


if(test(trimAndCaps, "I LIKE TO USE METHODS!")) {
    testCode(code, /.trim\(/, 'a trim method');
     testCode(code, /.toUpperCase\(/, 'a uppercase method');
}


function test(actual, expected){
  if(actual !== expected) {
    console.log(`❌\tThe code for trimAndCaps didn't work as expected:\n\t\texpected: ${JSON.stringify(expected)}\n\t\tgot: ${JSON.stringify(actual)}`);
    return false;
  } else {
    console.log(`✅\tGreat Job, test passed with value:\n\t\texpected: ${JSON.stringify(expected)}\n\t\tgot: ${JSON.stringify(actual)}`);
    return true;
  }
}

function testCode(code, requiredMethod, message){
  if(!code.match(requiredMethod)){
    console.log(`Code passed but was done without using ${message}, try solving the challenge using ${message}`)
  }
}