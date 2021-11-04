const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [car] = Function(trimmed + '; return [car]')();


if (car.price.current == 10000) {
  if (!code.match(/car\.price\.current\s*=\s*10000/)) {
    fail(`Use dot notation to update the car price.`)
  } else {
    pass(`Succesfully updated car price to ${car.price.current}`);
  }
} else {
  fail(`Result: current car price ${car.price.current}.\nUse dot notation to update the current car price to 10000.`)
}

function fail(message) {
  console.log(`❌\tFailed\n${message}`);
}

function pass(message) {
  console.log(`✅\tPassed`, message);
}
