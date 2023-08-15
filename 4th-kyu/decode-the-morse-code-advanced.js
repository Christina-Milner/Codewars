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
    // ToDo: Accept 0's and 1's, return dots, dashes and spaces
    return bits.replace('111', '-').replace('000', ' ').replace('1', '.').replace('0', '');
}

function decodeMorse(morseCode) {
    // ToDo: Accept dots, dashes and spaces, return human-readable message
    return morseCode.replace('.', MORSE_CODE['.']).replace('-', MORSE_CODE['-']).replace(' ', '');
}