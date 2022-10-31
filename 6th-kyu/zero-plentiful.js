/* Given an array, return the number of groups of 4 or more consecutive zeroes (or 0 if not present). All zeroes must be in groups of at least 4, or none of them count. */

// P: An array of integers (or empty array)
// R: A number

function zeroPlentiful(arr){
    let tempCounter = 0
    let zeroCounter = 0
    for (let i = 0; i < arr.length; i++) {
      let num = arr[i]   // * See footnote
      if (num !== 0) {
        if (tempCounter >= 4) {
          zeroCounter++
          tempCounter = 0
        }
        else if (tempCounter > 0) {
          zeroCounter = 0
          tempCounter = 0
          break
        }
      }
      else {
        tempCounter++
      }
    }
    if (tempCounter >= 4) {zeroCounter++}
    if (tempCounter > 0 && tempCounter < 4) {zeroCounter = 0}
    return zeroCounter
  }

  //* Looping over the indices (and then declaring num so I could reuse what I'd previously written with let num of arr)
  // ended up being unnecessary. It was the result of a "what if we're on a 0 and the next element doesn't exist" check
  // that got moved into the two conditionals outside the for loop.
