
const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [myGrades] = Function(trimmed + '; return [myGrades]')();


if (myGrades.test1 == 98) {
  if (!code.match(/myGrades.test1\s*=\s*98/)) {
    fail(`Make sure to update the test score using 'object.key = value'`)
  } else {
    pass(`Succesfully updated your test with the lowest score! Nice work, hacker!`);
  }
} else {
  fail(`Your parents are going to find out about your low test score!\nChange the test score for the lowest test to 98.`)
}



function fail(message) {
  console.log(`❌\tWhoops!`, message, `\nResult:\n`, JSON.stringify(myGrades, undefined, 2));
}

function pass(message) {
  console.log(`✅\tGreat work!`, message,`\nResult:\n`,  JSON.stringify(myGrades, undefined, 2));
}
