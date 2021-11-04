// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')

var numFunctionCalls = (code.match(/rollDice\(\)/g) || []).length;

if(numFunctionCalls === 0){
  console.log(`\n ❌\t You haven't invoked the function rollDice. \n`)
}else if(numFunctionCalls <= 2){
  console.log(`\n ❌\t You invoked the function rollDice ${numFunctionCalls} times. You need to invoke rollDice at least 3 times \n`)
}else if(numFunctionCalls >= 3){
  console.log(`\n ✅\t great job calling rollDice ${numFunctionCalls} times! \n`)
}