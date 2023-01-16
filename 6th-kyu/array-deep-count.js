/* Given an array, return the total count of its elements, including those of any nested arrays.
An empty nested array counts as one element.
Example: 
["x", "y", ["z"]]    -->  4
(3 actual elements and the subarray itself is the 4th).
*/

//P: An array
//R: A number

/* 
- Question is, are there any arrays with objects in them hidden in the randoms? Otherwise, could use typeof == object to check for an element
being an array.
- I wrote a reduce yesterday to flatten an array, but that won't work here as the subarrays have to be counted, not just their elements (presumably for this reason)
- Make a recursive helper that takes an array and an accumulator initialised to 0
- If the array is empty, return the accumulator
- Otherwise, take first element
- If its type is not object, shift it and recursive call to remaining array, acc + 1
- If it is, return helper(first element) + recursive call to remaining array, acc + 1? My brain hurts
*/

function deepCount(a) {
  
    const elementCounter = (arr, acc = 0) => {
      if (!arr.length) {return acc}
      if (typeof(arr[0]) !== "object") {
        arr.shift()
        return elementCounter(arr, acc + 1)
      }
      return elementCounter(arr[0], 0) + elementCounter(arr.slice(1), acc + 1)
    }
    
    return elementCounter(a)
  }

/* Whooo recursion, phew no objects hidden in the randoms 
Oh. Today I learned isArray is a thing. In which case the tests probably shouldn't have let me use typeof. */