/* Given a number n, return an array of all primes up to and including n. */

//P: A number
//R: An array of numbers

/*
- Create an array of numbers from 2 to n
- Ensure 0 and 1 get handled properly (looks like desired result is empty array)
- Filter array by numbers that are primes, using a helper
- Helper iterates from 2 to square root of a number and returns false if it finds anything the number is divisible by, otherwise true
*/



function prime(num) {
    if (num < 2) {return []}

    const isPrime = num => {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false
            }
        }
        return true
    }

    return Array.from({length: num - 1}, (_, i) => i + 2).filter(e => isPrime(e))
}