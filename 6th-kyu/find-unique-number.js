/* Given an array of numbers (that is potentially gigantic in size), return the one number contained in it that is unique */

// P: An array of numbers
// R: One number

function findUniq(arr) {
    let seen = {}
    for (let num of arr) {
      if (!(num in seen)) {seen[num] = 1}
      else if (seen[num] > 1) {continue}
      else {seen[num]++}
    }
    return Number(Object.keys(seen).filter(e => seen[e] == 1)[0])
  }