/* Implement the methods Math.round, Math.ceil and Math.floor as if they didn't already exist. */

//P: A valid, non-negative number
//R: A number

/*
- parseInt() can fill in for Math.floor
- This makes the other two easy enough: 
    - Math.ceil should return parseInt + 1 unless parseInt and the number are equal
    - If number - parseInt(number) is greater than or equal to 0.5, round becomes Math.ceil, otherwise Math.floor
*/

Math.round = function(number) {
    if (Math.floor(number) == number) {
        return number
    }
    if (number - Math.floor(number) >= 0.5) {
        return Math.ceil(number)
    } else {
        return Math.floor(number)
    }
  };
  
  Math.ceil = function(number) {
    if (Math.floor(number) == number) {
        return number
    }
    return Math.floor(number) + 1
  };
  
  Math.floor = function(number) {
    return parseInt(String(number))
  };