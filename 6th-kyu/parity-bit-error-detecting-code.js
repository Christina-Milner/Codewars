/* Given a sequence of 8-bit binary strings where the 8th bit is a parity bit indicating whether the number of 1-bits is even (0) or odd (1), return 
a sequence of the 7-bit strings with those where the parity bit doesn't match the rest replaced by "error". */

//P: A string
//R: A string

/*
- Split by space to get individual strings
- Map them to themselves with the last bit removed, or error
    - To check: Split the individual string, check if reduce sum is even or odd, and compare against the parity bit
*/

function parityBit(binary) {
    const strArr = binary.split(' ')
    return strArr.map(e => {
        const sumOf1s = e.slice(0, -1).split('').reduce((a, b) => a + Number(b), 0)
        const parityMatches = sumOf1s % 2 == 0 && e.slice(-1) == "0" || sumOf1s % 2 !== 0 && e.slice(-1) == "1"
        return parityMatches ? e.slice(0, -1) : "error"
    }).join(' ')
}