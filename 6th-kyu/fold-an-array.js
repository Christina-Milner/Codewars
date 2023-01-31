/* Given an array of numbers, fold it the specified number of times. Folding it means the last element gets added to the first one, the second to the penultimate one
and so on, with the middle one staying in place if array length is odd. */

//P: An array of numbers and a positive integer
//R: An array of numbers

/*
- Slice array into first half from 0 to length / 2 (rounded up - having an odd element float around at the end shouldn't be a problem) and rest
- Create new array of length (input array length / 2 rounded up) with elements being first half at that index + second half at that index (put a check here
    for second half element existing)
- Repeat this recursively for the given number of times
*/

function foldArray(array, runs) {
  if (runs == 0) {return array}
  let firstHalf = array.slice(0, Math.ceil(array.length / 2))
  let secondHalf = array.slice(Math.ceil(array.length / 2)).reverse()
  let foldedArr = Array.from({length: Math.ceil(array.length / 2)}, (_, i) => secondHalf[i] ? firstHalf[i] + secondHalf[i] : firstHalf[i])
  return foldArray(foldedArr, runs - 1)
}

/* Forgot in the thought process above that I'd need to reverse the second half, but that became obvious pretty quickly. */