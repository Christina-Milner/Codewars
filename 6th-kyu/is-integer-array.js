/* Given an array, return true if every element is an integer (or a float with no decimals, but like JS cares) or it is empty, otherwise false. */

//P: An array
//R: A boolean

/* 
- Check array length to return true if empty
- Return array.every(element is number and Math floor of number does not change its value)
*/

function isIntArray(arr) {
    return arr ? !arr.length || arr.every(e => typeof(e) == "number" && Math.floor(e) == e) : false
  }

/* Ternary operator added because one of the tests fed null into it. */