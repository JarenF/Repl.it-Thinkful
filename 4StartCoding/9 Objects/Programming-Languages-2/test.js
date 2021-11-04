const fs = require('fs')
let code = fs.readFileSync('./index.js', 'utf8')
let trimmed = code.replace(/^require.*/gm, '')
let [languages] = Function(trimmed + '; return [languages]')();

if (languages['swift'] && languages['java'] && languages['javascript'] && languages['cobol']) {
  if (!code.match(`languages.swift`) || 
      !code.match(`languages.java`) || 
      !code.match(`languages.javascript`) ||
      !code.match(`languages.cobol`)) {
    fail(`Must add the languages using 'object.key = value'! Don't add them directly to the object declaration - we're practicing dot notation.`)
  } else {
    let correct = {
      "python": "Guido van Rossum",
      "cobol": "Grace Hopper",
      "javascript": "Brendan Eich",
      "java": "James Gosling",
      "swift": "Chris Lattner"
    }
    if (deepEquals(languages, correct)) {
      pass(`Successfully added cobol, swift, java, and javascript to the languages object.`)
    }
    else {
      fail(`Some of the values weren't what was expected. Expected:\n${JSON.stringify(correct,null,2)}`)    
    }
  }
} else {
  fail(`Missing some of the languages. \nYou should have added the keys 'swift', 'java', and 'javascript', and 'cobol'\nRemember that they are case sensitive! `)
}


function fail(message) {
  console.log(`❌\tFailed`, `\nResult:\n`, JSON.stringify(languages, undefined, 2), `\n${message}`);
}

function pass(message) {
  console.log(`✅\tPassed\n${message}`, `\nResult:\n`, JSON.stringify(languages, undefined, 2));
}

function isObject(o) {
  return typeof(o) === 'object' && o !== null
}

function deepEquals(a,b) {
  if(isObject(a) && isObject(b)) {
    let keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) {
      return false
    }
    for (key of keys) {
      if(!deepEquals(a[key], b[key])) {
        return false
      }
    }
    // if all the keys match, they're equal
    return true
  } else {
    return a === b
  }
}