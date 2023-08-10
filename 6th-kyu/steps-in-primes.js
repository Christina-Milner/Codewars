/* Given a number n, a number m and a number k, find the first pair of prime numbers between n and m that have a difference of k.
Return null if such a pair does not exist. */

//P: 3 numbers
//R: An array of 2 numbers

/*
- Write the usual helper to check if a number is prime (iterate up to square root, return false if divisor found)
- Initialise an empty array
- Iterate from start to end
- If a number is prime, push it in the array
- Check ... actually, this doesn't even need to be an array, just a holding variable
- If number is prime, set the variable to it
- On next number that is prime, check if the difference is the desired one.
- Wait no stop hang on, the primes don't have to be consecutive to be considered a "pair". Ok, back to the array
- No, scrap all of that. Iterate over, check if a number is prime, if yes, check if number + step is also prime. If yes, return those two, if not, keep going.

*/



function step(step, start, end) {
    const isPrime = num => {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    }
    for (let i = start; i <= end - step; i++) {
        if (isPrime(i) && isPrime(i + step)) {
            return [i, i + step]
        }        
    }
    return null

}