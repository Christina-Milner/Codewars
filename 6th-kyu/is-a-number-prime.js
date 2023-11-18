/* Given an integer, return a boolean indicating whether this integer is a prime (i.e. has no divisors besides itself and 1). 
You can assume input will be an integer, but it may be negative or 0.
There's a performance hint reminding us that we can't loop up to n, or even n/2. */

//P: A number
//R: A boolean

/*
- We loop only up to the square root, after that all divisors are the "counterparts" to divisors already found
- Use absolute value of input to account for the negatives problem
- 1 and 0 should return false and need to be dealt with outside the loop
*/



function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
  }

/* Negatives are never primes, apparently. *cough* I knew that. */