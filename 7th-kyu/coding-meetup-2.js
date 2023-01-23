/* Given an array of objects containing data about developers attending a coding meetup, return an array where each object has a new property 'greeting'
with the value 'Hi <first name>, what do you like the most about <language>?'. */

//P: An array of objects
//R: An array of objects

/* 
- Copy the input array as to not modify input
- Use forEach to add the above property to each entry
- Return new array
*/

function greetDevelopers(list) {
    let newList = list.slice()
    newList.forEach(e => e.greeting = `Hi ${e.firstName}, what do you like the most about ${e.language}?`)
    return newList
  }

/* That passed the tests (because it didn't say anywhere not to modify the input), but I had a sneaking suspicion it would do so due to JS object reference
voodoo, and console log testing confirms it does. Meaning the .slice() is entirely pointless, but I'll leave it there as I've already submitted.
What I WANTED to do is this (and I'll submit that as a refactor): */


function greetDevelopers(list) {
    let newList = list.map(e => Object.assign({}, e))
    newList.forEach(e => e.greeting = `Hi ${e.firstName}, what do you like the most about ${e.language}?`)
    return newList
  }