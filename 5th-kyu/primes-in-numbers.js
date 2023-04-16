/* Given a positive number n, find the prime factor decomposition of n and return as a string in the format "(p1**n1)(p2**n2)...(pk**nk)", where powers of one
are written as simply the number itself. */

//P: A number
//R: A string

/*
- Quick Google on how to do prime factorialisation suggests you basically divide by 2 (if possible) and then keep dividing by stuff until what's left is a prime number.
- Example: n = 86240 should return "(2**5)(5)(7**2)(11)"
- So we would divide by 2, which is 43120, and realise result is still divisible by 2, and keep going. After 5 times, we have 2695, which is no longer divisible by 2, so we keep
    going up the list of primes. It's not divisible by 3, so we divide it by 5. That's 539. Dividing it by 7 twice gives us 11, which is a prime.
- So, recursive function that checks whether its input is a prime (base case) and has some kind of list of factors as an accumulator
    - If input is prime, add it to the list and return it
    - Otherwise, find lowest prime to divide by, add to list, and do recursive call
    - Keep track of which one we just divided by as we don't need to try the lower ones again
- Seem to dimly remember from a previous kata that for checking what primes a number is divisible by, only need to go up to its square root
*/

function primeFactors(n){
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

    return Object.keys(resultObj).map(e => resultObj[e] > 1 ? `(${e}**${resultObj[e]})`: `(${e})`).join('')
}