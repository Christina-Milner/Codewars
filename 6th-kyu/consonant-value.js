/* Given a lowercase string consisting entirely of letters, return the highest value of consonant substrings. The value of a letter is its position in the alphabet
starting with a at 1. */

//P: A string of lowercase letters
//R: A number

/*
- Can I split a string by a Regex pattern? Probably not, but what I can do is just sub out all the vowels and then split by that
- This yields an array of consonant substrings that I can map to their values
    - Either iterate over each substring to add the letter's values (indexOf in the alphabet + 1), or split the substring and reduce
- Then return the Math.max of the mapped array, orrr I might try something funky and use reduce for it (if a greater b, a, otherwise b)
*/

function solve(s) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  return s.replace(/[aeiou]/g, "#")
        .split('#')
        .map(e => e.split('').reduce((a, b) => a + alphabet.indexOf(b) + 1, 0))
        .reduce((a, b) => a > b ? a : b, 0)
};

// \o/
/* Ooh, from looking at solutions- I could have indeed done s.split(/[aeiou]+/). Probably something I should've checked before
using a workaround, but OH WELL. I know now.
Could have done it in one "line" if I'd used charCodeAt instead of an alphabet constant, but I care very little about that and
a lot about an alphabet string being a convenient copy paste */