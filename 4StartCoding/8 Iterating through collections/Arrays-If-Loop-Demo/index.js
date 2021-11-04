let mixedArray = [9, "six", true, 18];

//prints the values of the items in the mixedArray
console.log("Printing each item...");
for (let i = 0; i < mixedArray.length; i++) {
  console.log(mixedArray[i]);
}

//prints a formatted string depending on item type
console.log("Printing formatted string with item type...");
for (let i = 0; i < mixedArray.length; i++) {
  if (typeof mixedArray[i] == "number") {
    console.log("The item at position " + i + " is a number: " + mixedArray[i]);
  }
  if (typeof mixedArray[i] == "string") {
    console.log("The item at position " + i + " is a string: " + mixedArray[i]);
  }
  if (typeof mixedArray[i] == "boolean") {
    console.log("The item at position " + i + " is a boolean: " + mixedArray[i]);
  }
}
