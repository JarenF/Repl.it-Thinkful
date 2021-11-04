let sentence = "this sentence is not Capitalized CorrectlY.";
console.log(sentence);
console.log(sentence.toLowerCase());
console.log(sentence.replace("this", "This"));

let lowerCased = sentence.toLowerCase();
let capitalized = lowerCased.replace("this", "This");
let corrected = capitalized.replace("not ", "");
console.log(corrected);
