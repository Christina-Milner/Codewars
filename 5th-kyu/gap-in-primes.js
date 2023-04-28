/* Given three numbers g, m and n (all integers, g >= 2, m > 2 and n >= n2), return the first pair of (consecutive) prime numbers between n and m whose difference
is g. Return null if none exist.
Example: gap(2, 3, 50) = [3, 5]
*/

//P: 3 numbers
//R: An array of 2 numbers or null

/*
- Iterate from m to n and check which numbers are primes
    - Keeping performance in mind, don't save them all in an array, just keep track of two at a time
    - Also, might as well iterate only over the odd ones (other than 2) because no even numbers are going to be primes
- Helper checks if something is prime by iterating up to square root of a number and checking for numbers it's divisible by
- Push first prime into array, push next one in
- Return if desired gap, otherwise get rid of first one and repeat
- Return null if loop has finished and not returned anything
*/


function gap(g, m, n) {
    const isPrime = num => {
        if (n == 2) {
            return true
        }
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    }

    let pairOfPrimes = []
    const start = m % 2 == 0 ? m + 1 : m
    for (let i = start; i <= n; i += 2) {
        if (isPrime(i)) {
            if (pairOfPrimes.length < 2) {
                pairOfPrimes.push(i)
                continue
            }
            if (pairOfPrimes[1] - pairOfPrimes[0] == g) {
                return pairOfPrimes
            }
            pairOfPrimes.shift()
            pairOfPrimes.push(i)
        }
    }
    return null
}