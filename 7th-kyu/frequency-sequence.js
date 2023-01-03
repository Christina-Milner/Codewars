/* Given a string s and a character sep, replace each character in s with a number representing the number of times it occurs in s, and separate with sep.
"hello world", "-" --> "1-1-3-3-2-1-1-2-1-3-1" */

//P: Two strings
//R: A string

/* 
- Split string to array
- Map e to arr.filter(e).length
- Join with separator
*/

function freqSeq(str, sep) {
    return str.split('').map((e, i, arr) => arr.filter(f => f == e).length).join(sep)
}

