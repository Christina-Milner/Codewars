/* Given a number n, return a "pyramid" made out of arrays of 1s with the corresponding number of layers.
0 produces the emtpy array.
1 produces [[1]]
2 produces [[1], [1, 1]]
3 produces [ [1], [1, 1], [1, 1, 1] ]
and so on. */

//P: A number
//R: An array of arrays of numbers

/*
- Default option would be to initialise array and then iterate over numbers from 1 to n and push in Array(i).fill(1)
- Alternative: Array of length n and map each element to an array of the length of its index plus 1, filled with 1s.
    - This might need a separate check for 0, though?
*/


function pyramid(n) {
    return Array.from({length: n}, (_, i) => Array(i + 1).fill(1))
  }