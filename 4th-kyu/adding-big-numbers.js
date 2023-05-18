/* Given two numbers as a string, return their sum as a string.
(The numbers will be large - large enough that they get mangled by JS if we simply convert to number and add). */

//P: Two strings (of digits)
//R: A string (of digits)


/* This should be doable if we replicate how we would do addition on paper.
- Split both number strings and reverse the arrays (as we start at the ones position)
- For each digit, convert to number and add
    - If the result is greater than 9, use only the last digit and save the first as a "carry" to be added to the next round
- Turn back to string and add to result (we're going to have to reverse it at the end so might as well make it an array)
- Once one number has run out, make sure to add any remaining carry to the next digit, then staple on whatever is left of the other number
*/

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

/* Only needed to remember to add any remaining carry at the end!
Could probably save a little bit on performance if I got the for loop to actually "staple on whatever is left" and then abort
instead of running its course, but ehhhh. */
