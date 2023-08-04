/* Given two 2-dimensional arrays of size n x n representing matrices, return an array of the product of the two. Input will only be square matrices.
Multiplication works like this: To fill in [n][m] in the result matrix, the elements in row n of matrix A are multiplied by the elements in column m of matrix b
and then those products are summed.
Example:
  A         B          C
|1 2|  x  |3 2|  =  | 5 4|
|3 2|     |1 1|     |11 8|

C[0][0] = A[0][0] * B[0][0] + A[0][1] * B[1][0] = 1*3 + 2*1 =  5
C[0][1] = A[0][0] * B[0][1] + A[0][1] * B[1][1] = 1*2 + 2*1 =  4
C[1][0] = A[1][0] * B[0][0] + A[1][1] * B[1][0] = 3*3 + 2*1 = 11
C[1][1] = A[1][0] * B[0][1] + A[1][1] * B[1][1] = 3*2 + 2*1 =  8

*/

//P: Two arrays of arrays of numbers
//R: An array of arrays of numbers


/*
- Haven't I done this before? Seems strangely familiar
- Initialise a n x n result array of whatever
- iterate over it in a nested for loop: y then x
    - Cell[y][x] is the sum reduce of all elements in A[y] multiplied by B[idx of element of A][x]

*/


function matrixMultiplication(a, b){
    let result = Array.from({length: a.length}, () => Array(a.length).fill(1))  
    for (let y = 0; y < result.length; y++) {
        for (let x = 0; x < result.length; x++) {
            result[y][x] = a[y].map((num, idx) => num * b[idx][x]).reduce((acc, cur) => acc + cur, 0)
        }
    }
    return result
  }