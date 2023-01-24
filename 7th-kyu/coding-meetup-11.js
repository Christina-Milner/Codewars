/* Given an array of objects representing data about developers attending a meetup, return their average age rounded to the nearest integer. */

//P: An array of objects
//R: A number

/*
Map the devs to their ages, use reduce to sum them, divide by the length of the array, and use Math round. What am I missing?
*/

function getAverageAge(list) {
    const devAges = list.map(e => e.age)
    return Math.round(devAges.reduce((a, b) => a + b, 0) / devAges.length)
  }

/*Oooh, this is a 7th kyu, that explains it. I was hoping the series would get progressively more difficult. */