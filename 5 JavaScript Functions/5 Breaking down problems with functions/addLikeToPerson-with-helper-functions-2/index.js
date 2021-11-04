// Here are the helper functions - no need to change them
function findPerson(people, nameToMatch) {
  // loop through the collection of people
  // if the current person's name matches the nameToMatch, return the person
  for(let i = 0; i < people.length; i++) {
    let person = people[i]
    if (person.name === nameToMatch) {
      return person
    }
  }
}

function addLike(person, topic) {
  let likes = person["likes"]
  likes.push(topic)
}

// Write your function 'addLikeToPerson' using the helper functions
function addLikeToPerson(people, nameToMatch, topic) {
  // find the person to add the like to (findPerson)
  // add the like to that person (addLike)
}



// This tests your code - you can ignore it for now!
require('./test.js');(void 0);