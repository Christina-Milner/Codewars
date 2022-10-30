/* Given a string, find out whether it is a pangram, i.e. contains all letters from A to Z (case irrelevant) at least once. */

//P: A string
// R: A boolean

function isPangram(string){
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    return alphabet.every(e => string.toLowerCase().includes(e))
  }
