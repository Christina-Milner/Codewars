/* This is like Decode the Morse Code, but now the code string is just a sequence of 0s and 1s. 
- A dot is 1 time unit
- A dash is 3 time units
- A pause between symbols in one character is 1 time unit long
- A pause between dots and dashes inside a word is 3 time units
- A pause between words is 7 time units long

However, the number of 1s and 0s that correspond to a "time unit" depends on the speed of the telegraph operator, so this is something to figure out.
decodeBits(bits) should convert the string of zeroes and ones to Morse code, and decodeMorse(morseCode) should then convert that into a human-readable string.
As before, a dictionary of the morse characters is preloaded (MORSE_CODE).
Example: 
1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011
=> 
···· · −·−−   ·−−− ··− −·· ·
=> 
HEY JUDE
*/

//P: A string/A string
//R: A string/A string

/* 
- So, in the example, a "time unit" is 2 characters, i.e. the first dot is two 1s, the pause between characters is 6 0s, and so on
- Find the shortest sequence of 0s and assume that's the unit? (Careful as there can be useless leading or trailing zeroes, have to filter those out first)
- Now split by "0" x 7 x unit to get the "words"
- Split by "0" x unit to get the symbols
- Any 0s left mark a change from dot to dash or vice versa
*/


function decodeBits(bits) {
    // Get rid of erroneous leading and trailing zeroes
    while (bits[0] === "0") {
        bits = bits.slice(1)
    }
    while (bits[bits.length - 1] === "0") {
        bits = bits.slice(0, bits.length - 1)
    }
    // Look at the length of the groups of 1s and 0s to see what a "unit" is
    let zeroes = bits.split(/1+/)
    let ones = bits.split(/0+/)
    console.log(zeroes, ones)
    let oneUnit
    if (!zeroes.join('')) {oneUnit = ones.map(e => e.length).filter(e => e).reduce((acc, cur) => Math.min(acc, cur))}
    else if (!ones.join('')) {oneUnit = zeroes.map(e => e.length).filter(e => e).reduce((acc, cur) => Math.min(acc, cur))}
    else {
        oneUnit = Math.min((zeroes.map(e => e.length).filter(e => e).reduce((acc, cur) => 
                  Math.min(acc, cur))), (ones.map(e => e.length).filter(e => e).reduce((acc, cur) => Math.min(acc, cur))))
    }

    // 0 x unit x 7 separates "words"
    const wordSeparator = "0".repeat(oneUnit * 7)
    let words = bits.split(wordSeparator)

    // 0 x unit separates (most) characters
    words = words.map(e => e.split("0".repeat(oneUnit)))

    // 3 x unit x "1" is a dash, unit x "1" is a dot
    words = words.map(e => e.reduce((acc, cur) => {
        if (!cur) {return acc.concat(' ')}
        if (cur === "1".repeat(oneUnit)) {return acc.concat(".")}
        if (cur === "1".repeat(oneUnit * 3)) {return acc.concat("-")}
    }, []).join('').replace(/  /g, " "))
    return words.join('   ')
}

function decodeMorse(morseCode) {
    return morseCode.split('   ').map(e => e.split(' ').map(char => MORSE_CODE[char]).join('')).join(' ')
}
