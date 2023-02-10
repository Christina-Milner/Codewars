/* Given an aarray of positive integers, return the greatest common factor.

Example: [46, 14, 20, 88] => 2
*/

//P: An array of numbers
//R: A number

/*
Does "factor" mean "divisor"? Idk, math is hard, but looks like it for the purposes of this.
- Start at the lowest number in the array and check if everything else is divisible by that
- Then iterate down to 1 and find one where that is the case
*/

function greatestCommonFactor(array) {
    const min = array.reduce((a, b) => Math.min(a, b))
    for (let i = min; i >= 1; i--) {
        if (array.every(e => e % i == 0)) {
            return i
        }
    }
  }

/* Guess this would just return undefined in a case where there isn't a common factor. But all the tests passed so I guess we don't care. */