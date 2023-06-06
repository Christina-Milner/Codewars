/* Given a number n, return the factorial decomposition of n! as a string.
For example: n = 12; decomp(12) -> "2^10 * 3^5 * 5^2 * 7 * 11"
Primes should be in increasing order, and the exponent omitted when it is 1. */

//P: A number
//R: A string


/*
- So, calculating the factorial and then doing factorial decomposition doesn't fly because GL doing that with 4000!
- Took me a moment of playing around in an Excel sheet to wrap my head around it, but:
    - 12! is 1 * 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9 * 10 * 11 * 12
    - Now replace anything that isn't a prime with a product of something that is
    - You get 2*3*2*2*5*2*3*7*2*2*2*3*3*2*5*11*3*2*2
    - And that is indeed 10 2s, 5 3s, 2 5s, one 7 and one 11
- So! Array from 2 to n
- Iterate over this array and check if each number is a prime
- If not, replace it with its breakdown into primes (TBD)
- Afterwards, make Set, turn back into array, and sort, then iterate over that and count how many times present in the array to get the exponent
- How to break down numbers? 
- Might be best integrated into the helper to check for primes
- Instead of returning true or false, it returns the number itself if it's prime
- If it finds something it's divisible by, do the division and recursively call on the rest, and, uh, return an array I guess
*/

function decomp(n) {
    let factors = Array.from({length: n - 1}, (_, i) => i + 2)
    const breakIntoPrimes = (num, acc = []) => {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                acc.push(i)
                return breakIntoPrimes(num / i, acc)
            }
        }
        return acc.length ? acc.concat(num) : num
    }
    factors = factors.reduce((acc, cur) => acc.concat(breakIntoPrimes(cur)), [])
    const sorted = Array.from(new Set(factors))
    sorted.sort((a, b) => a - b)
    return sorted.map(num => factors.filter(el => el === num).length === 1 ? `${num}` : `${num}^${factors.filter(el => el === num).length}`).join(" * ")
}