/* Convert a string of digits into letters following a phone keyboard logic (2 = a, 22 = b, 222 = c), but with 1 separating letters with the same number and 0 
being spaces. Return a lowercase string (that cannot contain numbers)." */

//P: A string of digits
//R: A string of letters

/* This may end up being a real "duh" moment, but I'm thinking just type out the number -> letter mappings and then replace? */

function phoneWords(stringOfNums) {
  
    // Map the number combos to the corresponding letters
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let numToLetters = {}
    let numStr = "2"
    alphabet.split('').forEach((e, i) => {
      if (i == 0) {
        numToLetters[numStr] = e
        }
      else {
        if ((numStr.length == 3 && numStr[0] !== "7" && numStr[0] !== "9") || numStr.length == 4) {
          numStr = String(Number(numStr[0]) + 1)
        } else {
          numStr += numStr[0]
        }
        numToLetters[numStr] = e
      }
    })
  
    // Replace in given string
    let pattern = new RegExp(Object.keys(numToLetters).reverse().join('|'), 'g')
    return stringOfNums.split('1').map(e => e.replace(pattern, m => numToLetters[m]).replace(/0/g, " ")).join('')
  }


/* I got bored halfway through typing out all the letter combos and wrote code to make the map instead. Made for some extra debugging
as I forgot about the buttons with 4 letters on them, but, oh well. */
