let currentForecast = "rainy";
let currentWindSpeed = 40;
let holiday = false;
let currentDay = "Monday";
let message = "";

if (currentForecast === "rainy" || currentForecast === "snowing" && currentWindSpeed > 30) {
  message = "Very Scary outside! Stay indoors!";
} else {
  message = "It's not super scary and it might be nice";
}

console.log("Forecast for " + currentDay + " is: " + message);

if (currentForecast != "sunny") {
  console.log("It won't be sunny today");
}

if (!holiday) {
  console.log("You can't take today off!");
}
