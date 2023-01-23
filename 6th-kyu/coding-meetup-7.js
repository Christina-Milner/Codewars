/* Given an array of objects representing data about developers attending a meetup, return an array containing the developer who is the oldest, or, in case of a tie,
all the oldest developer in the same order as in the original array. */

//P: An array of objects
//R: An array of objects

/*
- Find the maximum age by mapping the list to each developer's age and then reducing by Math.max
- Return original array filtered by age being the maximum age
*/

function findSenior(list) {
    const highestAge = list.map(e => e.age).reduce((a, b) => Math.max(a, b))
    return list.filter(e => e.age == highestAge)
  }