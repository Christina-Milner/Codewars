/* Given a string and a number, turn the string into a passphrase by:
- Shifting each letter by the given number (but it stays a letter, so wrap around the end of the alphabet)
- Replacing each digit by its compliment to 9
- Keeping non-alphabetic, non-digit characters as they are
- Making each letter in an odd position lower case and in an even position uppercase
- Reversing the result.
*/

//P: A string and a number
//R: A string

/*
- Split string to array
- Use lowercase alphabet constant to do offset, should be index of current letter + offset modulo 26
- Fix casing based on index while at it
- Replace numbers by 9 - number
- Reverse result, join and return
*/

function playPass(s, n) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    return s.split('').map((e, i) => {
        if (alphabet.includes(e.toLowerCase())) {
            if (i % 2 == 0) {
                return alphabet[(alphabet.indexOf(e.toLowercase()) + n) % 26].toUpperCase()
            }
            return alphabet[(alphabet.indexOf(e.toLowercase()) + n) % 26]
        }
        if (e !== " " && !isNaN(e)) {
            return 9 - Number(e)
        }
        return e
    })
    .reverse()
    .join('')
}

/* TIL a string with just a space in it is apparently not NaN. */