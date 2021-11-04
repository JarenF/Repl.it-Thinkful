let myFavoriteFruits = ["banana", "cherry", "mango", "pear"];

console.log(myFavoriteFruits.length); //-> prints array length, 4
myFavoriteFruits.pop(); //-> removes last item from the list
console.log(myFavoriteFruits); //-> prints the array
console.log(myFavoriteFruits.length); //-> prints array length, 3

console.log("=================================");

// pop() both removes the last item from the array AND returns that item, so it can be used for example to create a new variable
let lastFruit = myFavoriteFruits.pop(); //-> removes last item from array and turns it into a variable
console.log(lastFruit); //-> prints variable, which is 'mango'
console.log(myFavoriteFruits); //-> prints the array
console.log(myFavoriteFruits.length); //-> 2

console.log("=================================");
//We can use push() to move lastFruit back into the array
myFavoriteFruits.push(lastFruit); //-> adds lastFruit to the array
console.log(myFavoriteFruits); //-> prints the array
