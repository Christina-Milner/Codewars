/* Given a number n, return how many fractions can be made with n as the denominator whose values are between 0 and 1 and which cannot be simplified further. 
Example: 15 -> 1/15, 2/15, 4/15, 7/15, 8/15, 11/15, 13/15 and 14/15 -> 8
(So the values are between 0 and 1 EXCLUSIVELY.)
Will need to be able to handle big numbers.
*/

//P: A number
//R: A number

/* 
- So potential denominators go from 1 to n - 1
- And we need to find all numbers in that range that do not share any divisors with n
- So for each of those numbers (besides 1), we need to check a) whether n is divisible by it and b) if not, whether it is divisible by something n is also divisible by
- But not in quadratic time
- I would say: Iterate up to n / 2 and save all numbers that n isn't divisible by... or can we just go up to square root after all?
- Ok no hang on. The possible numbers to go with 15 are 14. 15 / 5 is 3, so we remove 2 (as 15 itself wasn't up for grabs), 15/3 is 5, so we remove 4 (same reason.) That leaves the right number.
- But that presumably only works because no numbers between 1 and 14 are divisible by both 5 and 3. 
- Let's check with 80 (correct result would be 32)
    (... insert lengthy playing with numbers here)
- Find primes going up to square root of num that num is divisible by
- Hm, no, I can't think of a way to make this work that doesn't involve actually iterating over all the numbers, so let's try that
- Iterate over numbers from 2 to n - 1 and check if num is divisible by them
- If yes, add to a list and for all subsequent numbers, check for divisibility by the numbers in that list, too
- And yes this will absolutely run in quadratic time, but let's see
*/


function properFractions(n){
    if (n === 1) {return 0}
    let divisors = []
    let count = 0
    for (let i = 2; i <= n - 1; i++) {
        let itCounts = true
        if (n % i === 0) {
            divisors.push(i)
            continue
        }
        for (let divisor of divisors) {
            if (i % divisor === 0) {
                itCounts = false
                break
            }
        }
        if (itCounts) {count++}
    }
    return count + 1
}

/* ^Right, so that works logic-wise, but as expected times out on the larger tests. Hmmmm. */
/* Ok, been given a hint about Euler's totient function... but I don't understand the maths symbols ._. ... but don't want to look up some of these other results as they look like they'll have
the solution on how to code it. 
I did already think about primes, but what does it matter whether I have a nested loop checking over the existing divisors or a nested "is this a prime" check?
Ok, the weird math squigglies mean we take the product of n * (1 - 1/prime) for each prime factor of n. Ok, I should be able to take it from there. Lemme just dig up that kata about prime factorialisation...
*/

function properFractions(n) {
    if (n === 1) {return 0}
    const isPrime = num => {
        if (Math.floor(Math.sqrt(num)) == Math.sqrt(num)) {
            return false
        }
        for (let i = 2; i < Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false
            }
        }
        return true
    }
    const primes = Array.from({length: Math.floor(Math.sqrt(n))}, (_, i) => i + 2).filter(e => isPrime(e))

    const factorializer = (number, lastPrime = 2, acc = {}) => {
        if (isPrime(number)) {
            if (number in acc) {
                acc[number] += 1
            } else {
                acc[number] = 1
            }
            return acc
        }
        for (let prime of primes.slice(primes.indexOf(lastPrime))) {
            if (number % prime == 0) {
                if (prime in acc) {
                    acc[prime] += 1
                } else {
                    acc[prime] = 1
                }
            return factorializer(number / prime, prime, acc)
            }
        }
    }
    const resultObj = factorializer(n)
    return Math.round(Object.keys(resultObj).map(Number).map(e => (1 - 1 / e)).reduce((acc, cur) => acc * cur, 1) * n)
}