const fs = require('fs');
let code = fs.readFileSync('./index.js', 'utf8');
let trimmed = code.replace(/^require.*/gm, '')
let sum = Function(trimmed + '; return sum')();

if(test(sum, 55)){
  testCode(code, /for\s*\(/, 'a for loop');
}

function test(actual, expected){
  if(actual == expected){
    console.log(`✅\tPassed\n\t\texpected: ${JSON.stringify(expected)}\n\t\tgot: ${JSON.stringify(actual)}`);
    return true;
  }else{
    console.log(`❌\tFailed\n\t\texpected: ${JSON.stringify(expected)}\n\t\tgot: ${JSON.stringify(actual)}`);
    return false;
  } 
}

function testCode(code, requiredMethod, message){
  if(!code.match(requiredMethod)){
    console.log(`Code passed but was done without using ${message}, try solving the challenge using  ${message}`)
  }
}
