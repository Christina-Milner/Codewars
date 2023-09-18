/* Write a class that takes the desired letter shift in the constructor and then allows to encode or decode strings, always returning an uppercase string. */
/* Example:
var c = new CaesarCipher(5); // creates a CipherHelper with a shift of five
c.encode('Codewars'); // returns 'HTIJBFWX'
c.decode('BFKKQJX'); // returns 'WAFFLES'
*/

//P: A string
//R: A string

/*
- Initialise objects with the alphabet in uppercase as a property
- Create a second version by slicing and sticking stuff at the end that represents the shifted version (i.e. shift by 1)
    would be alphabet.slice(1) + alphabet.slice(0, 1)
- Encode method turns input into uppercase and maps it (if present in alphabet, use index in original alphabet to find it in shifted alphabet, otherwise it stays the same)    
- Decode does the same thing the other way around, but casing should not be an issue there
*/


class CaesarCipher {
    constructor(shift) {
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.shifted = this.alphabet.slice(shift) + this.alphabet.slice(0, shift)
    }

    encode(str) {
        return str.toUpperCase().split('').map(letter => {
            if (!this.shifted.includes(letter)) {
                return letter
            }
            return this.shifted[this.alphabet.indexOf(letter)]
        }).join('')
    }

    decode(str) {
        return str.split('').map(letter => {
            if (!this.shifted.includes(letter)) {
                return letter
            }
            return this.alphabet[this.shifted.indexOf(letter)]
        }).join('')
    }
}