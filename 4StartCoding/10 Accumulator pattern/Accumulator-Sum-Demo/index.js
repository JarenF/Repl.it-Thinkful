// an example of the accumulator pattern
let countTo = 10; // how high should we count?
let sum = 0; // this is a place to store our sum

for (let i = 1; i <= countTo; i++) {
  sum += i;
  console.log("The current sum is: " + sum);
}
console.log("The final sum is: " + sum);
