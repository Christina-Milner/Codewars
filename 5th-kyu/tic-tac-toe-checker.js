/* Given a 3 by 3 array representing a tic tac toe game where 0 = no token placed yet, 1 = token placed by X, and 2 = token placed by O (why not just use
    those strings? idk), return whether the board is complete, and if so, who won (so -1, 1, 2 or 0 for a draw). All arrays passed in will be valid. */

//P: An array of arrays of numbers
//R: A number

/* 
- I could've sworn I've built a whole tic tac toe class before, but no idea where it is
- Check if board contains any zeroes (Array.some()) - if so, return -1
- Check if any rows are all the same number - if so, return that number
- Check if any columns are all the same number (can be done in same iteration as rows, just map each row to element at current index) - if so, return that number
- Check diagonals - as these are all 3 x 3, fairly easy case of checking 0, 0, 1, 1, 2, 2, and 0, 2, 1, 1, and 2, 0
If nothing else has fired, return 0

*/

function isSolved(board) {
    // Helper that checks whether input array is all same element and returns that element if so,
    // otherwise false, as I was repeating the same bit of code a lot
    const allSame = arr => arr.every(el => el === arr[0]) ? arr[0] : false

    // Initialise left diagonal so it gets filled during iteration and I don't have to do it by hand
    let leftDiagonal = []

    // Check for completed rows or columns
    for (let i = 0; i < board.length; i++) {
        // row
        if (allSame(board[i])) {
            return allSame(board[i])
        }
        // column
        const column = board.map(row => row[i])
        if (allSame(column)) {
            return allSame(column)
        }
        // Populate left diagonal
        leftDiagonal.push(board[i][i])
    }

    // Make right diagonal by hand
    const rightDiagonal = [board[0][2], board[1][1], board[2][0]]

    // Diagonals
    if (allSame(leftDiagonal)) {
        return allSame(leftDiagonal)
    }
    if (allSame(rightDiagonal)) {
        return allSame(rightDiagonal)
    }
  
    // Not finished if there are 0s in it
    if (board.some(row => row.includes(0))) {return -1}
  
    // Must be a draw
    return 0
  }

/* One flaw in my logic - obviously, the board is often not filled up yet when someone wins, so checking for zeros first thing was unwise.
Problem solved by simply moving it after the row/column/diagonal checks, though. */