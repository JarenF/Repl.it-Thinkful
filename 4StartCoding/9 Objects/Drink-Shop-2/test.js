const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [drinks] = Function(trimmed + '; return [drinks]')();


if (Object.keys(drinks).length > 3) {
  if (!code.match(/drinks[\.\[]/)) {
    fail(`Must add the drinks using 'object.key = value'! Don't change the object where it's first assigned.`)
  } else {
    pass(`Added three or more drinks to your store.`);
  }
} else {
  fail(`You must have at least three drinks to sell`)
}





function fail(message) {
  console.log(`❌\tFailed\n${message}\nResult: `, JSON.stringify(drinks, undefined, 2));
}

function pass(message) {
  console.log(`✅\tPassed\n${message}\nResult: `, JSON.stringify(drinks, undefined, 2));
}
