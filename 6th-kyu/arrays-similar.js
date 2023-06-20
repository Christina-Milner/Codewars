/* Given two arrays, return whether they contain the same elements in the same number of occurrences. */

//P: Two arrays
//R: A boolean

/*
- Compare length: If unequal, definitely false
- Otherwise just sort them and iterate over them comparing the elements? Or am I missing something?

*/


function arraysSimilar(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false
    }
    const arr1Sorted = arr1.slice().sort()
    const arr2Sorted = arr2.slice().sort()
    for (let i = 0; i < arr1Sorted.length; i++) {
        if (arr1Sorted[i] !== arr2Sorted[i]) {
            return false
        }
    }
    return true
  }