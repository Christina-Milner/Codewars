/* Given two arrays of integers of equal length, square the absolute value of the difference between each pair of corresponding elements and then
return the average of those squared values. */

//P: Two arrays of numbers
//R: A number


/*
- Can probably do this in one step with a reduce:
    - Reduce of array 1 with acc, current, and index: Add absolute value of current minus arr2[current] squared to acc, starting value 0
- Then divide by array length
*/



function solution(arr1, arr2) {
    return arr1.reduce((acc, cur, idx) => acc + Math.abs(cur - arr2[idx]) ** 2, 0) / arr1.length
}