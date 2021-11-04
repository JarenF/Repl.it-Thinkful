// When called with an array of steps, printInstructions should use a loop to log each step, with "Step 1 - " in front.
// Example:
// printInstructions(["Remove the plastic wrapper", "Microwave 45 seconds", "Let cool", "Enjoy!"])
// should log 
// "Step 1 - Remove the plastic wrapper"
// "Step 2 - Microwave 45 seconds"
// "Step 3 - Let cool"
// "Step 4 - Enjoy!"


// This code has a scope bug
let steps = ["Remove the plastic wrapper", "Microwave 45 seconds", "Let cool", "Enjoy!"]
function printInstructions(instructions) {  
  for (let i = 0; i < steps.length; i++) {
    console.log("Step " + (i + 1) + " - " + steps[i]);
  }
}

// This tests your code - you can ignore it for now!
require('./test.js');(void 0);