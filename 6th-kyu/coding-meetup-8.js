/* Given an array of objects representing data about developers attending a meetup, return "true" if all continents/geogrpahic zones will be represented and false
otherwise. */

//P: An array of objects
//R: A boolean

/*
- Declare an array constant of all the continents
- Map input list to the continent properties
- Can now use array.every() to check whether all continents are present in that list
*/

function allContinents(list) {
    const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
    const devContinents = list.map(e => e.continent)
    return continents.every(e => devContinents.includes(e))
  }