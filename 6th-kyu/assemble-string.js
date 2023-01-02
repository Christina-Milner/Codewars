/* Given an array of strings that are "corrupted" versions of an original string with characters replaced by "*", assemble the original string
from the information given. If a character cannot be unambiguously determined from the information given, use "#".
Examples: 
input = [
  "a*cde",
  "*bcde",
  "abc*e"
]
result = "abcde"

input = [
  "a*c**",
  "**cd*",
  "a*cd*"
]
result = "a#cd#" */

//P: An array of strings
//R: A string

/*
- Create an empty string that will be the result
- Iterate over the length of the provided strings (x) as well as the length of the array (y).
- If Array[y][x] is something other than "*", add that character to the result string and continue
- If, at the end of a loop, string length is still shorter than the current x, add a "#"
- Return result string
*/

function assembleString(array) {
    if (!array.length) {return ""}
    let resultString = ""
    for (let i = 0; i < array[0].length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (array[j][i] !== "*") {
          resultString += array[j][i]
          break
        }
      }
      if (resultString.length < i + 1) {
        resultString += "#"
      }
    }
    return resultString
  }

/* Needed a break, not a continue, but that became obvious pretty quickly when I got "HHHHeeeellllooooo". 
Hadn't thought of what would happen with array[0].length and an empty array, but bad form not putting that in the sample tests. */