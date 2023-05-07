/* Given an array of integers, return an array of arrays of prime numbers and the sum of all numbers in the original array that are divisible by them.
Example:
I = [12, 15]; //result = [[2, 12], [3, 27], [5, 15]]
The prime numbers these numbers are divisible by are 2, 3 and 5, and both 12 and 15 are divisible by 3, so it's [3, 12 + 15].
The sum may be negative if there are negative numbers in the array. */

//P: An array of numbers
//R: An array of arrays of numbers

/*
- Write the usual helper that checks if a number is a prime (iterate from 2 to square root of number and return false if number evenly divisible by any of them)
    - How does this work with negatives? 
    - Negatives don't have a square root (for all practical purposes here) so take square root of the absolute value and slap the - back on after
    - Loop also has to work differently - it's <= sqrt for positives, >= sqrt for negatives
    - Orrr ... for purposes of checking primes, it doesn't actually matter, so just use absolute value
- Iterate from 2 to square root of biggest number in the array (by absolute values)
- If number is prime (lol we're not actually ever going to feed negatives into the helper), push it into result array together with the sum (array filtered by divisible by n, reduced to sum)
- Pray this is performant enough
*/


function sumOfDivided(lst) {
    if (!lst.length) {return []}

    const isPrime = n => {
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false
            }
        }
        return true
    }
    let result = []

    const limit = lst.map(e => Math.abs(e)).reduce((a, b) => Math.max(a, b))

    for (let i = 2; i <= limit; i++) {
        if (isPrime(i) && lst.filter(e => e % i === 0).length > 0) {
            result.push([i, lst.filter(e => e % i === 0).reduce((a, b) => a + b, 0)])
        }
    }
    return result
  }

/* Small tweaks that were needed:
- Iterating up to just the square root is fine just to check if something is a prime, but doesn't work for the second for loop as then all the "counterparts" get ignored
  (i.e. it'll include 3 for 15, but ignore its counterpart 5).
- Simply including the counterpart when hitting the first one would've meant having to sort the array by ascending primes after, meh
- Initially fixed it by going up to half the max value instead, but that doesn't work for cases where the original array includes prime numbers (that may be much bigger than
    this value but also need to be included)
- Could have checked for those with a second loop adding all the array values that are primes AND bigger than the limit previously checked, but since I could get away with
    just iterating up to the max value, I did that instead
- Needed to add check for empty input array, otherwise the Math.max reduce with no initial value explodes
*/
   