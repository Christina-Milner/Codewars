/* Given two strings, return a number indicating how many letters the first string needs to be shifted/rotated by to form the second.
Example: "coffee", "eecoff" => 2
If they are already the same, the result is 0. If the first string cannot be turned into the second this way, return -1. */

//P: Two strings
//R: A number

/*
- Check if strings are already the same thing and if so, return 0
- Otherwise, iterate from 1 to length of the word
- Remove last letter and stick onto the front with each iteration
- If word now equals second word, return i
- Otherwise, return -1
*/


function shiftedDiff(first, second) {
    if (first === second) {
        return 0
    }
    for (let i = 1; i <= first.length; i++) {
        first = first[first.length - 1] + first.slice(0, -1)
        if (first === second) {
            return i
        }
    }
    return -1
}