/* Implement the Luhn algorithm to validate a credit card number, i.e. givena positive integer of up to 16 digits, return true if valid and false if not.
The algorithm:
- Double every other digit, starting from right to left - if a rseulting number is greater than 9, replace it with the sum of its digits (i.e. subtract 9)
- Sum all the final digits
- Divide sum by 10 - if remainder is zero, the original number is valid. */

//P: A number
//R: A boolean

/*
- Turn number to string, split into array, map back to number
- Reverse, map to double even digits (subtracting 9 if result greater than it)
- Sum with reduce and check modulo 10
*/

function validate(n) {
    let numArr = String(n).split('').map(e => Number(e))
    let sum = numArr.reverse()
                .map((e, i) => {
                    if (i % 2 == 0) {
                        return e
                    }
                    return e * 2 > 9 ? e * 2 - 9 : e * 2
                })
                .reduce((a, b) => a + b, 0)
    return sum % 10 == 0
}