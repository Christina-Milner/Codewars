/* A number is a k-prime if it has k prime factors (2 * 2 counting as 2), so prime numbers are 1-primes.
Given an array arr of numbers and a number n, return how many times in the array there are two adjacent numbers that are both n-primes.

arr = [10005, 10030, 10026, 10008, 10016, 10028, 10004]
consec_kprimes(4, arr) => 3 because 10005 and 10030 are consecutive 4-primes, 10030 and 10026 too as well as 10028 and 10004 but 10008 and 10016 are 6-primes.
*/

//P: A number and an array of numbers
//R: A number

/*
- There is a preceding kata to this called k-Primes where I wrote a function to return the number of prime factors for any given number, using memoization
    Let's steal that and use it here.
- In essence, we want to filter the array down to the numbers that have the correct k, but while preserving their original indices to check whether they were adjacent
- Alternatively: initialise a counter for the final result, starting at 0, and one for the previous k, also starting at 0
- Iterate over the array, checking the "k" for each number
    - If it is the same as the previous value (and the right k, ofc), increment the counter
    - If it is not, update previous value
*/

let memo = {}

function findDecomp(num) {
    if (num in memo) {return memo[num]}
    return primeDecomp(num)
}

function primeDecomp(num, k = 1, originalNum = num) {
    let divisor
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            divisor = i
            break
        }
    }
    if (divisor) {
        return primeDecomp(num / divisor, k + 1, originalNum)
    }
    memo[originalNum] = k
    return k
}

function consecKprimes(k, arr) {
    let prevK = 0
    let count = 0
    for (let num of arr) {
        const currentK = findDecomp(num)
        if (currentK == k && currentK == prevK) {
            count++
        }
        prevK = currentK
    }
    return count
}