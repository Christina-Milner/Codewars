/* Given an initial value initVal and a pattern list of say [k1, k2, k3], imagine an array of [initVal, initVal + k1, initVal + k1 + k2, initVal + k1 + k2 + k3] and so on.
Return the sum of the digits of the nth item in this array. */

//P: A number, an array of numbers, and another number
//R: A number

/* This is going to be another one of those things where I iteratively create an array that may or may not cause the tests to time out and then it turns out
there would have been a math shortcut. I am going to at least try to not just create that array.
Worth bearing in mind that "the nth element" appears to be counting from index 1.
- So, we make a subfunction to find the nth element
    - This integer divides n - 1 and the list length (seems to always be 3 in sample tests, but I don't trust them) [Update: And for good reason!]
    - Add the result * the sum of the list to initialVal
    - For the remainder, iterate over the list and add those values
    - That should be the nth element without having to actually make the array

- Summing the digits is trivial but might make another subfunction for it for the sake of tidiness:
    - Turn number into string, split, map back to numbers and sum reduce.

*/

function sumDigNthTerm(initval, patternl, nthterm) {
  
    const findNthValue = (init, list, n) => {
      let result = init
      result += Math.floor((n - 1) / list.length) * list.reduce((a, b) => a + b, 0)
      for (let i = 0; i < (n - 1) % list.length; i++) {
        result += list[i]
      }
      return result
    }
      
    const sumDigits = n => String(n).split('').map(e => Number(e)).reduce((a, b) => a + b, 0)
      
    return sumDigits(findNthValue(initval, patternl, nthterm))    
  }