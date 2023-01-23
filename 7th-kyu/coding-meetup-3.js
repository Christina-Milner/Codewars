/* Given an array of objects representing data about developers attending a meetup, return a boolean indicating if there will be at least one Ruby developer. */

//P: An array of objects
//R: A boolean

/* What was that operator again that turns truthy or falsy values into an actual boolean? !! or something?
(Had to Google it, I was correct but it goes before the value, not after.)
Ok, so I stick that in front of the length of the array filtered by language Ruby.
*/


function isRubyComing(list) {
    return !!list.filter(e => e.language == 'Ruby').length
  }