/* Given an array of integers and an integer k, return the minimum number of passes required to make the array all the same number when changing
up to k continuous elements at a time. */

//P: An array of numbers and a number
//R: A number

/*
- Hm. First, we need to identify the number we need to change everything to
- This would seem to be the number there's already the most of in the array, though there might be a scenario where this doesn't apply due to longer subsections being able to be replaced faster
- I may be missing something, but I'm going to try:
    - Identify number the array has the most of
    - Initialise a counter
    - Find index first occurrence of number that isn't that
    - Change all elements from that index to index + k to the desired number (I don't think it matters whether we're overwriting ones that were already correct)
    - Increment counter
    - Repeat previous 3 steps in a while loop until everything's the same
    - Return counter

*/



function arrayEqualization(arr, k) {
    const desiredNum = arr.slice().sort((a, b) => arr.filter(el => el === b).length - arr.filter(el => el === a).length)[0]
    let count = 0
    while (!(arr.every(el => el === desiredNum))) {
        const rest = arr.filter(el => el !== desiredNum)
        const idx = arr.indexOf(rest[0])
        for (let i = 0; i <= k && idx + i < arr.length; i++) {
            arr[idx + i] = desiredNum
        }
        count++
    }
    return count    
  }

/* ^ That passed fixeds, but not randoms, and it's been a long day, so am forfeiting/unlocking solutions. This is one that was readable/understandable to me: */

function arrayEqualization(array, k) {
    const values = new Set(array)
    let minSteps = Infinity
  
    for (const value of values) {
      let last = null
      let steps = 0
  
      for (let idx = 0; idx < array.length; ++idx) {
        if (array[idx] !== value) {
          if (last === null || last + k <= idx) {
            last = idx
            steps += 1
          }
        }
      }
  
      minSteps = Math.min(minSteps, steps)
    }
  
    return minSteps
  }

/* Have to check for every distinct value in the array how many steps it would take to change everything - can't assume it's the one there's most of.
Then you only add a step if the current index is greater than or equal to the previous one plus k, and keep updating minSteps to the lowest of the values seen. */