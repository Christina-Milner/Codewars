/* Given two strings, return a boolean indicating whether the first strings contains all of the letters of the second string in order (case insensitive). */

//P: Two strings
//R: A boolean


/*
- Turn both strings to lowercase
- split second one into an array
- Iterate over first string. If element currently at the front of the array is found, unshift it.
- Array should be empty once done iterating
*/

function nameInStr(str, name){
    let lower = str.toLowerCase()
    let nameArr = name.toLowerCase().split('')
    for (let char of lower) {
        if (char == nameArr[0]) {
            nameArr.shift()
        }
    }
    return !nameArr.length
}

/* For reference, I did briefly wonder whether I couldn't do this with Regex by assembling the elements of name with .* in between, and this would have been how: */

function nameInStr(str, name){
    return new RegExp(name.split('').join('.*'), 'i').test(str);
  }