/* Given a number, keep taking the sum of its digits until the result is single-digit. */

//P: A number
//R: A number


/*
- Turn number into string, split, and reduce to get the number of digits
- Keep doing this recursively until length of number string is 1
*/


function digitalRoot(n) {
    let numStr = String(n)
    if (numStr.length === 1) {
        return n
    }
    let sum = numStr.split('').reduce((acc, cur) => acc + Number(cur), 0)
    return digitalRoot(sum)
  }