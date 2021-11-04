
// load and execute the code from index.js in this scope
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
code = "function foo() {" + code + "; return iWantToCode}; var iWantToCode = foo()"
eval(code)

test(iWantToCode, true)

function test(actual, expected) {
  if (actual == expected) {
    console.log(`✅\tYour code worked! Nice job.`)
    console.log(`Great! You’ve started your coding adventure. You’re going to be a great coder, I can already tell. If you practice the drills in the upcoming lessons, you’ll be ready to pass the Thinkful Technical Evaluation no problem!
`)
  } else {
    console.log(`❌\t Change 'false' to 'true' to pass the test.`)
    console.log(`The test expected:\n\t${expected}\nbut your code had:\n\t${actual}`)
  }
}
