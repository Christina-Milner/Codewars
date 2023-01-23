/* Given an array of objects representing data about developers attending a meetup, return a string either containing first name and country of the first Python
developer in the list, or indicating that there are none. */

//P: An array of objects
//R: A string

/* Use array.find() to find the first Python developer. If that returns undefined, return the string stating so, otherwise return a template string including
name and country. */

function getFirstPython(list) {
    const firstPyDev = list.find(e => e.language == 'Python')
    return firstPyDev ? `${firstPyDev.firstName}, ${firstPyDev.country}` : "There will be no Python developers"
  }