/* Given an array of integers, return an array of integers that represents one added to the number
the elements make up. */

// P: An array of single-digit integers
// R: An array of integers or null if input array is invalid (empty, negatives, more than 1 digit)

function upArray(arr){
    if (!arr.length || arr.filter(e => e > 9).length || arr.filter(e => e < 0).length ) {return null}
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] !== 9) {
        arr[i] += 1
        break
      }
      arr[i] = 0
      if (!arr[i - 1] && arr[i - 1] !== 0) {arr.unshift(1)}
    }
    return arr
  }

/* Thought I could simply join the array, convert to number, add one, and split it again, but the tests use
numbers too big for JS, so had to rethink that. It also required a rather inelegant extra check for leading
zeroes to keep them intact.
The fact that 0 is falsy is the bane of my existence. */