/* Write a function that returns a boolean indicating whether a given ISBN-10 identifier is valid.
These consist of digits 0-9, with the last digit also being able to be X (10), and are valid if the sum of the digits multiplied by their position
modulo 11 equals zero. */

//P: A string
//R: A boolean


/*
- Note: The "position" starts at 1, so have to take that into account when using indexes
- Split the string, map to digit as number times index (converting the X if necessary), reduce to sum, take modulo 11
*/


function validISBN10(isbn) {
    if (isbn.length !== 10 || isbn.slice(0, 9).match(/\D/) || !(isbn[9].match(/[\d|X]/))) {
        return false
    }
    return isbn.split('')
            .map((digit, idx) => {
                if (isNaN(digit)) {
                    digit = 10
                }
                return Number(digit) * (idx + 1)
            })
            .reduce((acc, cur) => acc + cur, 0)
            % 11 === 0
}

/* Right, note to self: LOOK AT THE SAMPLE TESTS.
I was assuming the mathematical check was all I was checking for, when in fact the description of ISBN numbers as being 10 digits, all digits and last digit digit or X were also all conditions
I needed to make sure were met. */
/* Ooh, this would've been a more elegant way to do the regex check: */
if (!/[0-9]{9}(\d|X)/.test(isbn)) return false;