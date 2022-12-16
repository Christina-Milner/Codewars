/* Given a string of words, turn each word "inside out". That means for example "climbing" becomes "milcgnib" as the outermost letters move to the
center and then their neighbors scoot up. If the word is uneven in length, the middle letter stays the same. */

//P: A string
//R: A string

/* 
- Split the string by spaces, map the words with a function that does what's described above, then join back together with " "
- That function: 
    - Take the two halves of the word (slice(0, integer div of length /2), slice (integer div length/2)), reverse them and stick them back together
    - If odd length, put word[length / 2 rounded up] back in the middle
*/

function insideOut(x){
  
    const wordTurner = str => {
      const l = str.length
      if (l <= 3) {return str}
      const firstHalfTurned = str.slice(0, Math.floor(l / 2)).split('').reverse().join('')
      const secondHalfTurned = str.slice(- Math.floor(l / 2)).split('').reverse().join('')
      return l % 2 == 0 ? firstHalfTurned + secondHalfTurned : firstHalfTurned + str[Math.floor(l / 2)] + secondHalfTurned
    }
    
    return x.split(" ").map(word => wordTurner(word)).join(" ")
  }