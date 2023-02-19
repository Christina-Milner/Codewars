/* Given a string, return the length of the longest substring consisting of unique characters, paying attention to performance. */

//P: A string
//R: A number

/*
- Declare max (0) and substring ("")
- Iterate over string, adding each letter to substring if not present yet
- If letter already present, check if substring length is greater than max, and if so, update max to it, then reset substring
*/

function longestSubstringOf(string) {
	let substr = ""
    let max = 0
    for (let letter of string) {
        if (!substr.includes(letter)) {
            substr += letter
        }
        else {
            substr = substr.slice(substr.indexOf(letter) + 1)
            substr += letter
        }
        if (substr.length > max) {
            max = substr.length
        }
    }
    return max
}