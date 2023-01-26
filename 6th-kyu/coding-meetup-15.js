/* Given an array of objects representing data about developers attending a meetup, return an array of those developers where the sum 
of the ascii representation of the characters of their first name is an odd number. */

//P: An array of objects
//R: An array of objects

/* 
- Make a helper that takes a string, splits it, maps to charCodeAt and reduces to get the sum
- Filter input array by modulo of first name run through said helper not equal to zero
*/

function findOddNames(list) {
    const sumOfCharCodes = str => {
        return str.split('').map(e => e.charCodeAt()).reduce((a, b) => a + b, 0)
    }
    return list.filter(e => sumOfCharCodes(e.firstName) % 2 !== 0)
  }