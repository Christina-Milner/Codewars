/* Given a lowercase string with no special characters, shift the letters such that:
- consonants move ahead 9 places in the alphabet (wrapping around if necessary)
- vowels move back 5 places in the alphabet (wrapping around if necessary)
- "c" or "o" get moved back 1 space
- "d" gets moved back 3 spaces
- "e" gets moved back 4 spaces
- If a shifted letter becomes "c", "o", "d" or "e", it reverts to its original value
*/

/* 
- Make array of alphabet
- Make object mapping all these rules
- iterate over input string, get indexOf in alphabet and return modified index as appropriate
- check if result is "c"/"o"/"d"/"e" and revert as appropriate
*/

function vowelBack(str) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const rules = {
      aiou: -5,
      co: -1,
      d: -3,
      e: -4
    }
    
    return str.split('').map(e => {
      let idx = alphabet.indexOf(e)
      let modifier = 0
      for (let key of Object.keys(rules)) {
        if (key.includes(e)) {modifier = rules[key]}
      }
      if (!modifier) {modifier = 9} // consonant
      idx += modifier
      let char = idx < 0 ? alphabet[idx + 26] : idx > 25 ? alphabet[idx - 26] : alphabet[idx]
      return (char == "c" || char == "o" || char == "d" || char == "e") ? e : char
    }).join('') 
}

/* Moment of puzzlement as some tests failed, but... it's no wonder "i" doesn't get converted properly if I forgot to add it to the vowels rule.
All good now. */