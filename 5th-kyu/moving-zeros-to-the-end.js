/* Given an array, move all zeroes contained in it to the end while preserving the order of the other elements. */

//P: An array
//R: An array

/*
- The way I see it, filter out the zeroes, check how many there are, and add them back to the end. But that sounds suspiciously easy for a 5th kyu.
Let's see what I am missing.
*/

function moveZeros(arr) {
    const numOfZeroes = arr.filter(e => e === 0).length
    return arr.filter(e => e !== 0).concat(Array(numOfZeroes).fill(0))
  }

/* Nope, that's all there is to it! 'kay. */