/* Given two strings, a code and a message, encrypt the message based
on a convoluted system of assigning letters. */

// P: two lowercase strings, can contain duplicates or the code can be one letter only, but no empties or other input
// R: an encoded lowercase string with numbers in it


// Originally wrote this as a while loop (running until the mapping object has 26 keys) with a for loop looping over the alphabet
// nested under it. This worked fine logic wise and ran just dandy in the console, but was so slow it timed out on Codewars.

// Solution that actually works:

function hamsterMe(code, message) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let mapping = {}
    let currentLetter = ""
    let counter = 1

    // If 'a' isn't in the code, stick it and all subsequent letters that aren't either at the end of the alphabet
    if (!code.includes('a')) {              
      let tempArr = alphabet.split('')
      for (let letter of tempArr) {
        if (code.includes(letter)) {
          alphabet = tempArr.slice(tempArr.indexOf(letter)).concat(tempArr.slice(0, tempArr.indexOf(letter))).join('')
          // oops, noticed after submitting I forgot a break here, it somehow works anyway
        }
      }
    }
    // Loop that actually matches the letters to their "parent letter" and correct count
    for (let letter of alphabet) {
      if (code.includes(letter)) {
        currentLetter = letter
        counter = 1
      }
      else {
        counter++
      }
      mapping[letter] = [currentLetter, counter]
    }
    return message.split('').map(e => mapping[e].join('')).join('')
}

