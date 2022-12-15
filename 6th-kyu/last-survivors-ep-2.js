/* Given a string of lowercase letters, replace two equal letters (don't have to be adjacent) by the next letter in the alphabet ("zz" loops back around to "a").
Keep doing this until there are no possible substitutions left, and return the resulting string. Order of letters in the result string does not matter. */

//P: A string of lowercase letters
//R: A string of lowercase letters

/* 
- First I need a way to check if we're done. Comparing the string's length to the size of a set created from it should do the trick.
- Recursive function? 
    - If the above check is met, it returns what it has
    - Otherwise iterate over the unique letters (we need to create the set anyway) of the current string
        - If str.split.filter(e == letter).length is >= 2, replace by (integer division length / 2) * next letter + (modulo length / 2) current letter
        - Feed result back into this function
*/

function lastSurvivors(str) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    
    const doublesReplacer = str => {
      const uniques = new Set(str.split(''))
      if (uniques.size == str.length) {return str}
      Array.from(uniques.values()).forEach(u => {
        const count = str.split('').filter(e => e == u).length
        if (count >= 2) {
          const idx = alphabet.indexOf(u) + 1 < 26 ? alphabet.indexOf(u) + 1 : 0
          const pattern = new RegExp(u, "g")
          str = str.replace(pattern, "") + alphabet[idx].repeat(Math.floor(count / 2)) + u.repeat(count % 2)
        }
      })
      return doublesReplacer(str)
    }
    
    return doublesReplacer(str)  
  }

/* Today I learned that .values() is not actually an array.
Alllso, replacing all the letters out (as I realised I would have to do for the above approach to work) and then putting them back in
is probably a little clumsy, but it beats falling down a regex rabbit hole. */