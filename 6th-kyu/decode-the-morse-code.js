/* Write a function that decodes Morse code.
The morse code symbols are preloaded as a map called MORSE_CODE. Characters are separated by one space, words by three spaces. Special codes like SOS are
treated as single special characters. Input does not need to be validated/error checked. Extra spaces at the beginning or end should be ignored. */

//P: A string
//R: A string

/*
- Trim input string to cover the leading/trailing space issue
- Split by 3 spaces to get words, then split those by one space to get letters
- Map letters to entries in preloaded dictionary
- How to tackle the SOS case of multiple characters being mashed together? 
- If dictionary entry in previous step is not found, it is one of those
- In that case, iterate over the substring
- If a slice from 0 to current i is found in the dictionary, add the letter to a result string and slice it out of the current string, then repeat
*/



function decodeMorse(morseCode) {
    return morseCode.trim().split('   ').map(word => {
        return word.split(' ').map(letter => {
            if (letter in MORSE_CODE) {
                return MORSE_CODE[letter]
            }
            else {
                let result = ""
                while (letter) {
                    for (let i = 0; i < letter.length; i++) {
                        if (letter.slice(0, i) in MORSE_CODE) {
                            result += MORSE_CODE[letter.slice(0, i)]
                            letter = letter.slice(i)
                            break
                        }
                    }
                }
                return result
            }
        }).join('')
    }).join(' ')
}

/* So, 'SOS' was actually contained in the pre-loaded dictionary and that entire section of the code was unnecessary.
So I checked for myself whether it works, and it does not (it goes into infinite loops). I would try to fix it, but I
don't think it's actually possible to unambiguously decipher a word if there are no spaces in it. So refactored solution to this: */

function decodeMorse(morseCode) {
    return morseCode.trim().split('   ').map(word => {
        return word.split(' ').map(letter => MORSE_CODE[letter]).join('')
    }).join(' ')
}

