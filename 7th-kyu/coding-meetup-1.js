/* Given an array of objects containing data about developers attending a coding meetup, return the number of Javascript developers coming from Europe. */

//P: An array of objects
//R: A number

/* Filter the input array by continent Europe and language Javascript and return the length. */

function countDevelopers(list) {
    return list.filter(e => e.continent == 'Europe' && e.language == 'JavaScript').length
  }

/* Very simple, but I want to do all the Coding Meetup problems and thought I'd start at the beginning. */