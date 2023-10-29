/* Write a function that accepts an arbitrary number of arrays and returns a single array created by alternately appending elements from
the arguments. If an input array is shorter than the others, the result should be padded with null. */

//P: An arbitrary number of arrays
//R: An array 

/*
- [...arguments] is the array of the input arrays
- Use Math.max to find the length of the longest input array
- Nested for loop: for 0 to max and for each array in the input, push its element at the current i into the result
- If array is shorter than current i, push in null instead
- Return result

*/



function interleave() {
    let result = [];
    let arrays = [...arguments];
    let max = arrays.reduce((acc, cur) => Math.max(cur.length, acc), 0);
    for (let i = 0; i < max; i++) {
        for (let array of arrays) {
            if (array.length <= i) {
                result.push(null);
            }
            else {
                result.push(array[i]);
            }
        }
    }
    return result;
}