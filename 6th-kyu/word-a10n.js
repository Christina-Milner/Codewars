/* Given a string, return that string with all words longer than 4 letters abbreviated in the scheme <first letter> + number of letters in between + <last letter>.
Words with fewer than 4 letters should stay as they are, and non-letter characters should stay in place (hyphenated words are treated as 2 words). */

//P: A string
//R: A string

/* 
- Write helper function that takes a string and returns slice(0, 1) + str.slice(1, -1).length + slice(-1)
- Regex replace groups of letters longer than 4 by passing them into that function
*/

function abbreviate(string) {
  
    const abbreviator = str => str.slice(0, 1) + String(str.slice(1, -1).length) + str.slice(-1)
    
    return string.replace(/([A-Za-z]+)/g, m => m.length >= 4 ? abbreviator(m) : m)
  }

/* I cannot believe that actually worked on the first try. Might get the hang of these regex shenanigans yet. */