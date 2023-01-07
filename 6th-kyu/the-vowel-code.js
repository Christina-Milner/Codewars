/* Create a function encode() that takes a string (all vowels contained in which will be lowercase) that replaces the vowels in this string with numbers,
a = 1, e = 2 and so on.
Create a function decode() that takes an encoded string and turns the numbers back to vowels (you can assume all numbers present are encoded vowels). */

//P: A string (for both functions)
//R: A string (for both functions)

/*
- save the vowels as a constant
- For encode: Globally regex match vowels and replace by their index in the vowel constant + 1
- For decode: Globally regex match digits and replace by vowel constant[digit - 1]
*/

function encode(string) {
    const vowels = "aeiou"
    return string.replace(/[aeiou]/g, m => String(vowels.indexOf(m) + 1))
  }
  
  function decode(string) {
    const vowels = "aeiou"
    return string.replace(/\d/g, m => vowels[m - 1])
  }

