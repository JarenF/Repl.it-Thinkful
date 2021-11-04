// Here's the function. No need to edit the function
function rollDice () {
  let randomRoll = Math.floor(Math.random() * 6) + 1  
  console.log('You rolled a ' +randomRoll + "!")
}

//Call rollDice at least 3 times
rollDice()
rollDice()
rollDice()


// This tests your code - you can ignore it for now!
require('./test.js');(void 0);