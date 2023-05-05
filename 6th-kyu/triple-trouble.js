/* Given two numbers, return 1 if there are 3 of a digit in a row in the first one and then 2 of that same digit in a row in the second one, and 0 otherwise,
because someone doesn't know what booleans are for.
Does it count if there's more than 2 or 3 of it? No idea, we'll find out.*/

//P: Two numbers
//R: A number

/*
- Convert numbers to strings and split, map back to numbers
- I don't have time to mess around with regex, so will simply iterate over the numbers and keep a tally of how many times
it's seen a digit in a row. Once it hits 3 for the first number, add to an object (key is the digit, value is whatever)
- Do same thing with second number but 2
- Return 1 if any of the keys from object 1 are present in object 2, 0 otherwise
*/

function tripledouble(num1, num2) {
    let numStr1 = String(num1)
    let numStr2 = String(num2)
    let digits1 = {}
    let digits2 = {}

    for (let i = 0; i < numStr1.length; i++) {
        if (numStr1[i] == numStr1[i - 1] && numStr1[i] == numStr1[i + 1]) {
            digits1[numStr1[i]] = true
        }
    }
    for (let i = 0; i < numStr2.length; i++) {
        if (numStr2[i] == numStr2[i - 1]) {
            digits2[numStr2[i]] = true
        }
    }
    for (let key of Object.keys(digits1)) {
        if (key in digits2) {
            return 1
        }
    }
    return 0
}

//More elegant version for reference:

function tripledouble(num1, num2) {
    for (let i = 0; i < 10; i++) {
      if (new RegExp(`${i}{3}`).test(num1) && new RegExp(`${i}{2}`).test(num2)) {
        return 1;
      }
    }
    return 0;
  }