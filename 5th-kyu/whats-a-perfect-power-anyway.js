/* Given a number n, return a pair of numbers [m, k] where m ** k = n if it is a perfect power and null if it is not.
In cases where multiple pairs are possible, any one pair will do. */

//P: A number
//R: An array of numbers or null


/*
- Iterate from 2 to the square root of n
- If not divisible by the current number, move on
- Otherwise, keep dividing by it until the result either becomes not divisible by it (then abort) or that number is reached
- Do this with little recursive helper that will spit out the number of rounds of division once it hits 1
*/


function isPP(n) {
    const divisionHelper = (num1, num2, rounds = 0) => {
        if (num1 === 1) {
            return rounds
        }
        if (num1 % num2 !== 0) {
            return null
        }
        return divisionHelper(num1 / num2, num2, rounds + 1)
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        let powers = divisionHelper(n, i)
        if (powers) {
            return [i, powers]
        }
    }
    return null
}