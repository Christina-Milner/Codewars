/* Given an array of rationals represented as subarrays of [numerator, denominator], return their sum in its irreducible form as an array.
If the numerator is cleanly divisible by the denominator, return the result as a number.
If the input is empty, return null. */

//P: An array of arrays of numbers
//R: An array of two numbers or null or a number


/* 
- Check for empty input
- Multiply all the denominators to find a common one - won't necessarily be the lowest, but we're simplifying afterwards anyway so who cares
- Convert all array items to the new denominator
- Sum the numerators
- Simplify the result (iterate from half the denominator down and break when finding a number that both num and denom are divisible by)
- If modulo of num by denom is 0, return number, otherwise return array
*/

function sumFracts(l) {
    if (!l.length) {
        return null
    }
    const common = l.reduce((a, b) => b[1] * a, 1)
    const converted = l.map(e => [e[0] * (common / e[1]), common])
    let sum = converted.reduce((a, b) => [a[0] + b[0], common], [0, common])

    if (sum[0] % sum[1] == 0) {
        return sum[0] / sum[1]
    }
    for (let i = Math.floor(common / 2); i > 1; i--) {
        if (sum[0] % i == 0 && sum[1] % i == 0) {
            sum[0] = sum[0] / i
            sum[1] = sum[1] / i
        }
    }
    return sum
}

/* Would've worked on the first attempt if I'd remembered not to initialise the accumulator  for a product with 0 ... */