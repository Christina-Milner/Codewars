/* Given an array of integers, return the minimum absolute difference between two elements. (If the same element is present more than once, it's 0.) */

//P: An array of integers
//R: A number

/* 
- Iterate over array
- Initialise min
- For each element, create array with that element removed and map to difference between the elements and the removed element
- Find minimum of new array and update min to that if smaller
*/

function getting_mad(arr) {
    let min = null
    for (let i = 0; i < arr.length; i++) {
        let restOfArr = arr.slice(0, i).concat(arr.slice(i + 1))
        let currentMin = restOfArr.map(e => Math.abs(e - arr[i])).reduce((a, b) => Math.min(a, b))
        if (min == null || currentMin < min) {
            min = currentMin
        }
    }
    return min
}