/* Given an array of positive integers, find the minimum number that would have to be added to the array to make its sum a prime number.
Example: minimumNumber ({3,1,2}) ==> return (1) (the sum would be 6 and 1 brings it to 7, a prime). */

//P: An array of positive integers
//R: An integer

/* 
The problem doesn't *explicitly* state the number can't be negative, but I guess it follows from the fact it gets inserted into an
exclusively positive array. We'll assume positives only.

- Write a helper that checks if a number is a prime. I don't know of a more elegant way to do this than to iterate from 2 to n-1 and
    return false if the modulo ever spits out 0, otherwise true. Oh, akshully - only need to iterate up to n / 2. Duh.
- Sum the given array using reduce
- If the result is a prime, return 0
- If not, start incrementing it (open-ended so I guess while loop?) until we do find a prime, then return the difference
*/

function minimumNumber(numbers) {

    const isPrime = num => {
        if (num == 1) {return true}
        for (let i = 2; i <= num / 2; i++) {
            if (num % i == 0) {return false}
        }
        return true
    }

    let sum = numbers.reduce((a, b) => a + b, 0)
    if (isPrime(sum)) {return 0}

    let i = sum
    while (true) {
        if (isPrime(i)) {return i - sum}
        i++
    }
  }