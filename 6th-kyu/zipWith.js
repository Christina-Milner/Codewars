/* Given a function and two arrays, return the array of values created by applying the function to each pair of values.
If the arrays are of unequal length, the overhanging part of the longer array gets ignored.
All input is valid, and the input should not be modified. */

//P: A function and two arrays
//R: An array

/*
- So my first instinct was to use map, but don't think that works in the case of unequal array lengths where some elements would get mapped to nothing. Which makes this a case for reduce.
- Starting value would be the empty array and each step concatenates current to the accumulator
- Actual value to be concatenated is function(current, otherArray[idx])
- If the first array is the shorter one, any overhang in the second will get ignored anyway
- If the second array is the shorter one, this gets checked for by going if length of array 2 smaller than current index plus 1, return accumulator
- Trying to determine which array is the shorter one first and running the operation on that gets wonky as the function arguments have to be passed in the order array 1, array 2 in any case
*/


function zipWith(fn, arr1, arr2) {
    return arr1.reduce((acc, cur, idx) => {
        if (arr2.length < idx + 1) {
            return acc
        }
        return acc.concat(fn(cur, arr2[idx]))
    }, [])
  }

/* Not complex, but yeah, could have also created a new array of length (shorter of the two input arrays) and filled it with index => fn(a[index], b[index]).
It did annoy me a little that my reduce solution will perform a few useless calculation steps if array 1 is the longer one. */