/* Write a function that returns the factorial of a number n as a string and returns the complete number when the numbers get large.
Negative input should return null. */

//P: A number
//R: A string (of digits)

/*
- This is going to be closely related to adding big numbers
- Multiplying "by hand" kinda works like adding - to multiply a number by say 4, take the last digit, multiply it by 4, note result, anything over 9 is a "carry", do with all other digits
- Multiplying by, say, 25, is doing the above to multiply by 5 plus same thing with 2 and an extra 0 tacked on
- So the function needs to do this for each multiplication involved in the process:
    - Split both numbers into arrays
    - Reverse both arrays
    - Do above multiplication process for each digit, storing the result as a string
    - If first number is more than single-digit, use the procedure from "adding big numbers" to sum up the components
*/



function factorial(n){
    if (n < 0) {return null}
    if (n <= 1) {return "1"}
    let result = 1
    for (let i = 2; i <= 15; i++) {
        result *= i
        if (i === n) {
            return String(result)
        }
    }
    for (let i = 16; i <= n; i++) {
        result = multiplyBigNumbers(i, result)
    }
    return result
 }

function multiplyBigNumbers(num1, num2) {
    let result = []
    let num1Arr = String(num1).split('').reverse().map(Number)
    let num2Arr = String(num2).split('').reverse().map(Number)
    let carry = 0
    for (let i = 0; i < num1Arr.length; i++) {
        let subResult = []
        carry = 0
        for (let j = 0; j < num2Arr.length; j++) {
            let num = num1Arr[i] * num2Arr[j] + carry
            subResult.push(String(num % 10))
            if (num > 9) {carry = Math.floor(num / 10)}
            else {carry = 0}
        }
        if (carry) {subResult.push(carry)}
        subResult = subResult.reverse().join('')
        subResult += "0".repeat(i)
        result.push(subResult)
    }
    if (result.length === 1) {return result.join('')}
    return result.reduce((acc, cur) => add(acc, cur), "")
}

function add(a, b) {
    const numADigits = a.split('').reverse() 
    const numBDigits = b.split('').reverse()
    const max = Math.max(a.length, b.length)
    let result = []
    let carry = 0
    for (let i = 0; i < max; i++) {
        let digit
        if (i < a.length && i < b.length) {
            digit = Number(numADigits[i]) + Number(numBDigits[i]) + carry
        } else {
            let longer = numADigits.length === max ? numADigits : numBDigits
            digit = Number(longer[i]) + carry
        }
        if (digit > 9) {
            carry = Number(String(digit)[0])
            digit = String(digit)[1]
        } else {
            carry = 0
        }
        result.push(digit)
    }
    if (carry) {
        result.push(String(carry))
    }
    return result.reverse().join('')
}

/* So I was quite proud that this worked (only kink that needed to be ironed out was not resetting the carry appropriately), but that was soured a little when I saw that this is all it would've needed:

function factorial(n) {
  var res = [1];
  for (var i = 2; i <= n; ++i) {
    var c = 0;
    for (var j = 0; j < res.length || c !== 0; ++j) {
      c += (res[j] || 0) * i;
      res[j] = c % 10;
      c = Math.floor(c / 10);
    }
  }
  return res.reverse().join("");
}

Going to be mulling over that one for a while. */