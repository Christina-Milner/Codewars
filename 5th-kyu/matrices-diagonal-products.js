/* Given a square matrix M of dimension n x n of numbers from -9 to 9 (excluding 0), calculate the sum of the products of all diagonals going from upper left to
lower right as sum1 and then subtract the sum of the products of all diagonals going from upper right to lower left, sum2, from it. */

//P: An array of arrays of numbers representing a matrix
//R: A number

function sumProdDiags(matrix) {
    // upper left to lower right
    let sum1 = 0
    const findProductsLeft = (i, j, arr, acc = 1) => {
        if (!arr[i + 1] || !arr[i + 1][j + 1]) {return arr[i][j] * acc}
        return findProductsLeft(i + 1, j + 1, arr, acc * arr[i][j])
    }
    // middle to right
    for (let i = 0; i < matrix.length; i++) {
        sum1 += findProductsLeft(i, 0, matrix)
    }
    // middle to left
    for (let j = 0; j < matrix.length; j++) {
        sum1 += findProductsLeft(0, j, matrix)
    }
    // subtract the central diagonal that was counted twice
    sum1 -= Array(matrix.length).fill(0).map((_, i) => matrix[i][i]).reduce((a, b) => a * b, 1)

    // upper right to lower left
    let sum2 = 0
    
    /*No idea why I couldn't get findProductsRight to work, but I couldn't, so let's
    flip the array and use the previous one, cause that works */
    
    let matrixMirrored = matrix.map(e => e.reverse())
    
    // middle to right
    for (let i = 0; i < matrix.length; i++) {
        sum2 += findProductsLeft(i, 0, matrixMirrored)
    }
    // middle to left
    for (let j = 0; j < matrix.length; j++) {
        sum2 += findProductsLeft(0, j, matrixMirrored)
    }
    // subtract the central diagonal that was counted twice
    sum2 -= Array(matrix.length).fill(0).map((_, i) => matrixMirrored[i][i]).reduce((a, b) => a * b, 1)
    
    return sum1 - sum2    
}