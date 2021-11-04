let currentHour = "3";
let currentMinutes = "15";
let currentSeconds = "47";

let oClock = currentHour + "o'Clock"; //-> "3o'Clock"
let oClockPretty = currentHour + " o'Clock"; //-> "3 o'Clock"

let hoursMinutes = currentHour + currentMinutes; //-> "315"
let formattedHoursMinutes = currentHour + ":" + currentMinutes; //-> "3:15"
let formattedHoursMinutesSeconds = currentHour + ":" + currentMinutes + ":" + currentSeconds; // "3:15:47"

let timeIsMessage = "The time is:";

console.log(formattedHoursMinutesSeconds);
console.log(timeIsMessage + formattedHoursMinutes); //-> "The time is:3:15"
console.log(timeIsMessage + " " + formattedHoursMinutes); //-> "The time is: 3:15"
console.log(timeIsMessage + " " + formattedHoursMinutesSeconds);