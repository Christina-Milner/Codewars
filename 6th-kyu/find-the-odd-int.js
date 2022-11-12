/* Given an array of integers, find the one that appears an odd number of times (there will only ever be one). */

//P: An array of integers
//R: A number

// Two solutions for this:
// The obvious:

function findOdd(arr) {
    return arr.filter(e => arr.filter(el => el == e).length % 2 !== 0)[0]
}

//This:

function findOdd(arr) {
    const uniques = new Set(arr)
    for (let num of uniques.values()) {
      if (arr.filter(e => e == num).length % 2 !== 0) {
        return num
      }
    }
  }

/* I like the idea of booting out the duplicates first so every number only has to be checked
once, but I can't really judge if this is really a performance increase. */