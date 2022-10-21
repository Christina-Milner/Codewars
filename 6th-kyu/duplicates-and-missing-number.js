/* Given an unsorted array of numbers ranging from a to b, find the number
that is missing from the sorted sequence from a to b, as well as all numbers
present in duplicate. And make it work with big arrays. */

// P: An array of numbers
// R: An array containing the missing number and a nested array of the duplicate numbers

function findDupsMiss(arr) {
    const a = arr.reduce((a, b) => Math.min(a, b))
    const b = arr.reduce((a, b) => Math.max(a, b))
    let seen = {}
    let missingNum = 0
    for (let num of arr) {
      if (num in seen) {seen[num] += 1}
      else {seen[num] = 1}
    }
  
    let dupes = Object.keys(seen).filter(e => seen[e] > 1)
                                 .map(e => Number(e))
                                 .sort((a, b) => a - b)
  
    for (let i = a; i <= b; i++) {
      if (!(i in seen)) {
        missingNum = i
        break
      }
      else {continue}
    }
  return [missingNum, dupes]
}

// Todo: This could probably be optimised to be faster with large arrays, but it's good enough to pass