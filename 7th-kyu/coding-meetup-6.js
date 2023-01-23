/* Given an array of objects representing data about developers attending a meetup, return true if all developers in the list code in the same language
and false otherwise. */

//P: An array of objects
//R: A boolean

/*
This is what array.every() is for. Grab the first element's language and check if they're all that.
*/

function isSameLanguage(list) {
    let firstLang = list[0].language
    return list.every(e => e.language == firstLang)
  }