/* Complete a class that can decode and encode a Vigenere cipher.
"The shift is derived by applying a Caesar shift to a character with the corresponding index of the key in the alphabet." isn't the clearest instruction ever,
but once reading up on the cipher, it makes sense.*/

//P: A string
//R: A string

/* 
To encode:
- Need to repeat the key to match the string length
- To simulate the Vigenere Cipher table:
    - Shift the alphabet (moving first element to the back) idx times, where idx is the index of the key letter in the (original) alphabet
    - Then grab the letter at idx2 out of that, where idx2 is the index of the message letter in the (original) alphabet
    - Probably worth doing all permutations of this at the start instead of redoing it on each letter
- Map each letter in the message string to the letter at idx2 in alphabet idx (anything not in the alphabet gets left as it is)

To decode:
- Find the index of the current letter in the alphabet indicated by the key letter, then grab the letter at that index in the original alphabet
*/


class VigenèreCipher {
    constructor(key, abc) {
        this.key = key
        this.abc = abc
        this.table = this.createCipherTable()
    }
    createCipherTable() {
        let table = {}
        for (let i = 0; i < this.abc.length; i++) {
            table[this.abc[i]] = this.abc.slice(i) + this.abc.slice(0, i)
        }
        return table
    }

    encode(str) {
        const keyPhrase = this.key.length >= str.length ? this.key.slice(0, str.length) : this.key.repeat(Math.floor(str.length / this.key.length)) + this.key.slice(0, this.key.length % str.length)
        return str.split('').map((letter, idx) => {
            return this.abc.includes(letter) ? this.table[keyPhrase[idx]][this.abc.indexOf(letter)] : letter
        }).join('')
    }
    decode(str) {
        const keyPhrase = this.key.length >= str.length ? this.key.slice(0, str.length) : this.key.repeat(Math.floor(str.length / this.key.length)) + this.key.slice(0, this.key.length % str.length)
        return str.split('').map((letter, idx) => {
            return this.abc.includes(letter) ? this.abc[this.table[keyPhrase[idx]].indexOf(letter)] : letter
        }).join('')
    }
  }