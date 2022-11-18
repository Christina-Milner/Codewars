/* Given two numbers a and b, imagine a chess board of a x b squares and return the sum of the number of squares under attack by a queen for every possible
position of the queen. */

// P: two numbers, both between 1 and 20 inclusively
// R: A number

/* Represent the chessboard as a matrix like these grid-based problems usually do, so something like Array(b).fill(Array(a))
Make little subfunctions that count the horizontal/vertical/diagonal squares for any given position.
Wait, hang on. Horizontal and vertical are covered by adding the row and column lengths - 1 respectively for each possible position.
Loop through and add these up? */

function chessboardSquaresUnderQueenAttack(rows, columns){
    let board = Array(rows).fill(Array(columns).fill(1))
    let sum = rows * columns * (rows - 1 + columns - 1)

    const diagonals = (row, column, arr) => {
    const diagonalLowerRight = (column, row, arr, acc = 0) => {
            if (!arr[column + 1] || !arr[column + 1][row + 1]) {return acc}
            return diagonalLowerRight(column + 1, row + 1, arr, acc + 1)
        }
        const diagonalUpperRight = (column, row, arr, acc = 0) => {
            if (!arr[column + 1] || !arr[column + 1][row - 1]) {return acc}
            return diagonalUpperRight(column + 1, row - 1, arr, acc + 1)
        }
        const diagonalUpperLeft = (column, row, arr, acc = 0) => {
            if (!arr[column - 1] || !arr[column - 1][row - 1]) {return acc}
            return diagonalUpperLeft(column - 1, row - 1, arr, acc + 1)
        }
        const diagonalLowerLeft = (column, row, arr, acc = 0) => {
            if (!arr[column - 1] || !arr[column - 1][row + 1]) {return acc}
            return diagonalLowerLeft(column - 1, row + 1, arr, acc + 1)
        }
        return diagonalLowerRight(column, row, arr) + diagonalLowerLeft(column, row, arr) + diagonalUpperLeft(column, row, arr) + diagonalUpperRight(column, row, arr)
    }

    board.forEach((row, position, arr) => {
        row.forEach((square, idx, row) => {
            sum += diagonals(idx, position, board)
        })
    })

    return sum
}

/* Why the order of the row and column parameter changes? Because this was initially passing some tests but not all (due to diagonals producing incorrect results),
and I pretty quickly suspected I had those two the wrong way around somewhere, can never keep this kind of thing straight. Once switched in the definition of diagonals, it all passed. */