/* Given a string, return an array of arrays of number, letter pairs that allow for reconstructing the original string.
Example: 

runLengthEncoding("hello world!")
 //=>      [[1,'h'], [1,'e'], [2,'l'], [1,'o'], [1,' '], [1,'w'], [1,'o'], [1,'r'], [1,'l'], [1,'d'], [1,'!']]

*/

//P: A string
//R: An array of arrays

/*
- Could do something with iterating over the characters of the string, but I'm thinking split it and use reduce
- If accumulator empty, push [1, current letter] in
- If index 1 of last element in the accumulator is the same as current letter, update it to increment the count and return the accumulator
- Otherwise, do the same thing as in step 1, so I guess check for previous condition first and everything else is an else
*/


function runLengthEncoding(str) {
    return str.split('').reduce((acc, cur) => {
        if (acc.length && acc[acc.length - 1][1] === cur) {
            acc[acc.length - 1][0]++
            return acc
        }
        acc.push([1, cur])
        return acc
    }, [])
  }

/* For reference, this would've been how to do it with regex: */

const runLengthEncoding = str =>
  (str.match(/(.)\1*/g) || []).map(val => [val.length, val[0]]);