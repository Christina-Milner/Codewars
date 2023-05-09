/* Write a function that takes in a car mileage number and an array of "special numbers" (which may be empty) and returns 0 if the mileage number is boring, 1 if it is nearing an interesting number and 2 if it is an interesting number.
Interesting numbers are one of the following:
    - Included in the array
    - Any digit followed by only zeroes
    - Every digit is the same number
    - Sequential digits, incrementing (0 after 9)
    - Sequential digits, decrementing (0 after 1)
    - Palindromes
They are always greater than 99.
"Nearing an interesting number" means 1 or 2 less than one.
Input is an integer greater than 0 and less than 1000000000.
*/

//P: A number and an array of numbers
//R: A number

/*
- Check for < 98 first (always 0)
- Check if number is in array, or if not, if number +1 or number +2 are
- Write helpers to check the other stuff:
    - Only zeroes: Convert to string, slice first digit off, convert back to number and check if it's now 0
    - All the same: Convert to string, split, do an every()
    - Sequential: Same, just map back to number after split
    - Palindrome: Slice off half the number string (rounded down), and same number of elements from the back, check if first half = last half reversed
*/


function isInteresting(number, awesomePhrases) {
    if (number < 98) {
        return 0
    }
    const onlyZeroes = num => {
        return Number(String(num).slice(1)) === 0
    }
    const allSame = num => {
        return String(num).split('').every(e => e == String(num)[0])
    }
    const sequential = num => {
        let arr = String(num).split('').map(e => Number(e))
        return arr.every((e, i, arr) => {
            if (i == 0) {return true}
            return e == arr[i - 1] + 1 || e == 0 && arr[i - 1] == 9
        }) || arr.every((e, i, arr) => {
            if (i == 0) {return true}
            return e == arr[i - 1] - 1
        })
    }
    const palindrome = num => {
        return String(num).slice(0, Math.floor(String(num).length / 2)) == String(num).slice(String(num).length - Math.floor(String(num).length / 2)).split('').reverse().join('')
    }

    if (number >= 100 && (awesomePhrases.includes(number) || onlyZeroes(number) || allSame(number) || sequential(number) || palindrome(number))) {
        return 2
    }
    else if (awesomePhrases.includes(number + 1) || onlyZeroes(number + 1) || allSame(number + 1) || sequential(number + 1) || palindrome(number + 1) || 
        awesomePhrases.includes(number + 2) || onlyZeroes(number + 2) || allSame(number + 2) || sequential(number + 2) || palindrome(number + 2)) {
        return 1
    }
    else {return 0}
}

/* Righto, just needed one small tweak to make sure 98 and 99 weren't being counted as interesting themselves. */