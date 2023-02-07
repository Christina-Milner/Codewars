/*Given an unspecified number of arrays of varying lengths, combine them into a new array by alternating their elements (first element of array A then first element
    of array B then first element of array C, and so on). */

//P: Arrays (probably of strings and/or numbers)
//R: One array


/* 
- Use [...arguments] to access all the arrays without knowing how many there are
- Find out how long the longest one is (map arguments to length, find max)
- Iterate from 0 to that value and nest an iteration over all the arrays into it
    - If i is greater than the current array's length - 1, move on (I have my reasons to be wary of the if (!arr[i]) shortcut)
    - Otherwise, add element to output array
*/

function combine() {
    const arrays = [...arguments]
    const maxLength = arrays.map(e => e.length).reduce((a, b) => Math.max(a, b))
    let result = []
    for (let i = 0; i < maxLength; i++) {
        for (let array of arrays) {
            if (i > array.length - 1) {continue}
            result.push(array[i])
        }
    }
    return result
 }

/* Wait hold the phone, I can use "if (i in arr)" to check whether an index is within bounds??? Good to know! */