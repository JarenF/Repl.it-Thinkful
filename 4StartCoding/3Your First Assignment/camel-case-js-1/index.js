// camelCasing
// Feel free to change the function input so you
// can see how the functions camel-cases the input you give it!.

// Example inputs:
camelize("I like camels");
camelize("camelize-me-please");

// Try your examples below!



// DO NOT MODIFY FUNCTION BELOW
// Function for camelizing input. 
function camelize(text) {
    let camelizedText = text.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();        
    });
    console.log(camelizedText);
}