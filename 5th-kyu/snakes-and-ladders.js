/* Write a class SnakesLadders with a method play(). The class stores the board pictured in the description, with both players starting at square 0 and alternating turns, player 1 playing first.
If a roll lands exactly on the bottom of a ladder, the player gets to move up the ladder, if it lands exactly on the head of a snake, the player slides down the tail.
Rolling two of the same value means the player rolls again.
The game is won by reaching square 100, but it must be reached exactly, otherwise the player "bounces back" the extra points. If the end is reached with a roll of two of the same, the player does
not have to roll again and wins. */

//P: Two integers
//R: A string ("Player n Wins!", "Game over!" or "Player n is on square x")

/*
- I don't understand how the test cases work if I'm writing the whole class and the creator has no way of knowing where the variables for players and positions are stored, but we'll see

- Game needs to keep track of p1 position, p2 position and whose turn it is, as well as whether the game is over
- Desc says players start at square 0 but the picture shows square 1. Did the author get confused by zero-indexing, or...?
- Going to assume the board is an array of 100 but the last square is actually index 99
- Which is extremely cumbersome because that means converting all values in the picture one down
- Need a list of snakes and one of ladders - make them arrays of arrays of 2 numbers, where the first element is the square that's relevant to land on (bottom of ladder, head of snake)
    and the second element is where you get teleported
- Play method needs to check:
    - Game already over? 
    - If not, move player relevant number of squares
    - Overshot 100? Subtract overshoot 
    - Landed on a snake head or ladder bottom? Adjust
    - Landed on 100? Win
    - Neither of those true, but input values were the same? Return where the player is, but whose turn it is doesn't change
    - Otherwise, change whose turn it is and return where player who just moved is
*/

class SnakesLadders {
    constructor() {
        this.player1Pos = 0
        this.player2Pos = 0
        this.active = 1
        this.gameOver = false
        this.ladders = [[2, 38], [7, 14], [8, 31], [15, 26], [21, 42], [28, 84], [36, 44], [51, 67], [71, 91], [78, 98], [87, 94]]
        this.snakes = [[16, 6], [46, 25], [49, 11], [62, 19], [64, 60], [74, 53], [89, 68], [92, 88], [95, 75], [99, 80]]
    }

    play(die1, die2) {
        console.log("Parameters: ", die1, die2, "Position 1 ", this.player1Pos, "Position 2 ", this.player2Pos)
        if (this.gameOver) {
            return "Game over!"
        }
        let newPos = this.active == 1 ? this.player1Pos + (die1 + die2) : this.player2Pos + (die1 + die2)
        if (newPos == 100) {
            this.gameOver = true
            return `Player ${this.active} Wins!`
        }
        if (newPos > 100) {
            newPos = 100 - (newPos - 100)
        }
        if (this.ladders.find(e => e[0] == newPos)) {
            newPos = this.ladders.find(e => e[0] ==  newPos)[1]
        }
        if (this.snakes.find(e => e[0] == newPos)) {
            newPos = this.snakes.find(e => e[0] ==  newPos)[1]
        }
        if (this.active == 1) {
            this.player1Pos = newPos
        } else {
            this.player2Pos = newPos
        }
        if (die1 == die2) {
            return `Player ${this.active} is on square ${newPos}`
        }
        else {
            this.active = this.active == 1 ? 2 : 1
            return `Player ${this.active == 1 ? 2 : 1} is on square ${newPos}`
        }
    }
};

/* Didn't need the "board" array as it wasn't an indexing thing, players actually start off the board. So don't need to convert indices to positions, they are the same. */