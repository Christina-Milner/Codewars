/* Given a positive integer n, return the number of pure odd digit primes below n, as well as the ones closest to n (next lower and next higher).
Example: only_oddDigPrimes(20) ----> [7, 19, 31] */

//P: A number (positive integer)
//R: An array of 3 numbers

/* 
- Helper that checks if number is a prime (iterate from 2 to square root and return false if modulus is 0)
- Helper that checks if number contains only odd digits (turn to string and use regex match for even numbers)
- 1 appears to not count?! So iterate from 2 to n and populate array with numbers where both helpers return true
- Length of array is first number of return, its last value should be the second
- Iterate from n upwards to find last part of return
*/

function onlyOddDigPrimes(n) {
    const isPrime = n => {
        if (n == 1) {return true}
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) {return false}
        }
        return true
    }
    const containsEvenDigits = n => {
        return /[02468]/.test(String(n))
    }
    let pureOddPrimes = []
    for (let i = 2; i < n; i++) {
        if (isPrime(i) && !containsEvenDigits(i)) {
            pureOddPrimes.push(i)
        }
    }
    let nextPureOddPrime
    for (let i = n; i < Infinity; i++) {
        if (isPrime(i) && !containsEvenDigits(i)) {
            nextPureOddPrime = i
            break
        }
    }
    return [pureOddPrimes.length, pureOddPrimes[pureOddPrimes.length - 1], nextPureOddPrime]
}