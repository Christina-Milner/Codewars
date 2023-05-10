/* Given two square matrices of the same size containing integers, return their sum, i.e. the matrices are two dimensional arrays and the return should be
one two dimensional array of the same size with the elements in each position summed up. */

//P: Two arrays of arrays of numbers
//R: One array of arrays of numbers

/*
Map a to the sum of its elements with the ones at the same index in b by doing a nested map on the elements
*/


function matrixAddition(a, b){
    return a.map((subArr, idx) => {
        return subArr.map((num, rowIdx) => num + b[idx][rowIdx])
    })
}