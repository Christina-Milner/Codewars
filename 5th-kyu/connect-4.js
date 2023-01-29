/* Create a class Connect4 that simulates a connect 4 game.
- The columns are 0 to 6 and the play() method takes one of these as an argument for where the player is placing their disc
- There are 6 rows
- play() should return "Player n wins!" if 4 discs are aligned horizontally, vertically or diagonally
- If a player attempts to place a disc in a column that is full, it should return "Column full!" and it remains this player's turn
- If a player has won, any subsequent moves should return "Game has finished!"
- In any other case, the return should  be "Player n has a turn"
- The players are 1 and 2 and 1 always starts the game
*/

//P: A number
//R: A string

/*
- The class needs properties to indicate whose turn it is (1 on init), whether the game is over (false on init), and of course for the board
itself (an array of 6 elements that are each arrays with 7 elements)
    - Have to think about what values to use for the arrays to indicate free spaces and filled spaces, but I'm thinking let's not fill with zeroes so we can use falsy
    values to check for whether a row/column exists. "X" and "O" for tokens, full stop or something for empty.
- Play method needs to:
    - Check whether the game is already over. Return "Game has finished!" if so.
    - Check whether the desired column is full. Assuming everything else works correctly, that should be the case when array[0][n] is taken. Return "Column full!"
    and don't do anything else.
    - Assuming that isn't the case, check the lowest y value at index x that isn't taken yet and place a token there
    - Run a helper that checks whether the game is won
        - Takes x, y of most recently placed token and the board itself as input and checks for line, column and diagonal
            - Column just needs to be checked if current y is 2 or lower. If so, check that array filtered by elements at current x contains 4 of the current
            player's token, and check that their indices are consecutive
            - Row: Check that current array row has 4 of the current player's token and that their indices are consecutive
            - Diagonals: Check (x - 1)(y - 1), (x + 1)(y - 1), (x + 1)(y + 1), (x - 1)(y + 1) until you hit "wrong" token and see how many there were
            - This is starting to sound a lot like the depth-first search for the hungry hippos thing I couldn't figure out, so will have a look at that solution.
                But that's weird, because I know I've made tic-tac-toe before without too many issues, and that's essentially the same thing, just with a smaller board.
    - If game is won, return "Player n wins!"
    - Otherwise, change current player and token and return "Player n has a turn"
*/

class Connect4 {
    constructor() {
        this.currentPlayer = 1
        this.currentToken = "X"
        this.gameOver = false
        this.board = Array(6).fill(0).map(() => Array(7).fill("."))
    }

    isFull(col) {
        return this.board[0][col] !== "."
    }

    placeToken(col, token) {
        let row = this.board.indexOf(this.board.find(e => e[col] !== "."))
        if (row == -1) {
          row = 6
        }
        row = row - 1
        this.board[row][col] = token
        return row
    }

    checkIfWon(row, col, token) {
        const horizontal = row => {
            return row.reduce((a, b) => {
                if (a < 4 && b !== token) {
                    return 0
                }
                if (b == token) {
                    return a + 1
                }
                if (b !== token && a >= 4) {
                    return a
                }
            }, 0) >= 4
        }
        let diagLeft = []
        let idx
        for (let i = 0; i < 6; i++) {
          if (i <= row) {
            idx = col - (row - i)
          }
          else {
            idx = col + (i - row)
          }
          if (this.board[i] && this.board[i][idx]) {
            diagLeft.push(this.board[i][idx])
          }
        }
        
        let diagRight = []
        let idx2
        for (let i = 0; i < 6; i++) {
          if (i <= row) {
            idx2 = col + (row - i)
          }
          else {
            idx2 = col - (i - row)
          }
          if (this.board[i] && this.board[i][idx2]) {
            diagRight.push(this.board[i][idx2])
          }
        }

        if (horizontal(this.board[row]) || horizontal(this.board.map(e => e[col])) || horizontal(diagLeft) || horizontal(diagRight)) {
          this.gameOver = true
        }
    }

    play(col) {
        if (this.gameOver) {
            return "Game has finished!"
        }
        if (this.isFull(col)) {
            return "Column full!"
        }
        let row = this.placeToken(col, this.currentToken)
        this.checkIfWon(row, col, this.currentToken)
        if (this.gameOver) {
            return `Player ${this.currentPlayer} wins!`
        }
        const returnMessageBecauseWhyTheHell = `Player ${this.currentPlayer} has a turn`
        this.currentPlayer = this.currentPlayer == 1 ? 2 : 1
        this.currentToken = this.currentPlayer == 1 ? "X" : "O"
        return returnMessageBecauseWhyTheHell
    }
}

/* I had a massive WIP version here followed by a paragraph about how it was going to be a WIP for another day as I couldn't get the diagonals
to work, and as I was writing it, it began to dawn on me what to do instead. So here we have it! 
The horizontal function is now poorly named, but I realised after I'd written it that I was going to have to recycle that logic for all
the other directions and it made more sense to just feed arrays of the elements found in other directions into the same function.

Oh, and one addendum regarding "returnMessageBecauseWhyTheHell": Before I'd even started coding the logic checking for a winner, I was
baffled why play() wasn't even passing the first sample test unless I initialised the object starting with player 2. A look at the comments
then revealed that "Player n has a turn" is supposed to mean "Player n JUST HAD a turn", rather than indicating whose turn it is now,
which irritated me as it makes zero sense. That means that return message had to be declared before swapping the current player over,
and, well, the variable name reflects this irritation.*/
