// increaseCount should return 1 more each time it's called
// increaseCount(); // 1
// increaseCount(); // 2
// increaseCount(); // 3

// Fix the scope bug in this function
function increaseCount() {
  let count = 0;  
  count = count + 1
  return count
}

// This tests your code - you can ignore it for now!
require('./test.js');(void 0);