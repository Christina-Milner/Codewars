/* Given two numbers as strings, return their sum as a string. This will be checking for numbers large enough that simply converting to num won't work. */

//P: Two strings
//R: A string

/*
- You do it the way you would add the numbers by hand
- As long as both strings aren't empty, pop off the last digit, add them, put the modulo 10 in as the next digit and save integer division by 10 as a carry
- Next round, make sure to add the carry
- Remembering this being a part of a similar kata, make sure to add any remaining carry on after the loop finishes
- Reverse result
*/



function sumStrings(a, b) { 
    let num1Arr = a.split('')
    let num2Arr = b.split('')
    let result = []
    let carry = 0
    while (num1Arr.length || num2Arr.length) {
        let [next1, next2] = [num1Arr.pop(), num2Arr.pop()]
        if (next1 && next2) {
            result.push((Number(next1) + Number(next2) + carry) % 10)
            carry = Math.floor((Number(next1) + Number(next2) + carry) / 10)
        }
        else if (next1) {
            result.push((Number(next1) + carry) % 10)
            carry = Math.floor((Number(next1) + carry) / 10)
        }
        else if (next2) {
            result.push((Number(next2) + carry) % 10)
            carry = Math.floor((Number(next2) + carry) / 10)
        }
    }
    if (carry) {result.push(carry)}
    while (result[result.length - 1] == "0") {
        result.pop()
    }
    return result.reverse().join('')
}