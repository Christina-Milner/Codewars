/* Given an array of numbers (or empty array), return the array with the odd numbers sorted but the even numbers left in place */

//P: An array of numbers (or empty)
//R: An array of numbers (or empty)

function sortArray(array) {
    if (!(array.length)) {return []}
    let placeholder = array.map(e => e % 2 == 0 ? e : null)
    let oddsSorted = array.filter(e => e % 2 !== 0).sort((a, b) => b - a)
    return placeholder.map(e => e === null ? oddsSorted.pop() : e)
  }