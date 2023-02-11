/* Write a class Pong. The constructor accepts the maximum score attainable before the game is over. The method play() determines whether the current
player a) successfully hits the ball back, b) misses the ball, c) misses the ball and causes the opponent to win or d) is trying to hit the ball despite the game
being over. It takes the Y coordinate of the ball and that of the centre of the current player's paddle as input. Output should be one of various strings.
The game always starts with Player 1, the paddles are 7 pixels in height and the ball is 1 pixel in height. */

//P: A number for the constructor, two numbers for play()
//R: A string for play()

/*
Max score constructor is already provided.
- Probably a good idea to add a property for whether the game is over here that is false at initialisation.
- Need to also add player scores that start with 0
- Need to add who is the current player (default 1)
- play() needs to check:
    - if Game Over is true, return "Game Over!"
    - Otherwise, check whether ball pos is player pos +- 3
        - If not, add one point to non-current player
        - Check if non-current player has now reached the max
            - If so, return "Player X has won the game!" and set Game Over to true
            - If not, return "Player X has missed the ball!" and swap the players 
                - This is annoying as can't do stuff after return but will return wrong one if swapping before
        - If yes, return "Player X has hit the ball!" and swap players
*/

class Pong {
    constructor(maxScore) {
      this.maxScore = maxScore
      this.p1Score = 0
      this.p2Score = 0
      this.currentP = 1
      this.nextP = 2
      this.gameOver = false
    }
    
    swapPlayers(currentPlayer) {
        this.currentP = this.currentP == 1 ? 2 : 1
        this.nextP = this.nextP == 1 ? 2 : 1
        return currentPlayer
    }

    play(ballPos, playerPos) {
      if (this.gameOver) {return "Game Over!"}
      if (ballPos >= playerPos - 3 && ballPos <= playerPos + 3) {
        return `Player ${this.swapPlayers(this.currentP)} has hit the ball!`
      }
      let potentialWinner
      if (this.currentP == 1) {
        this.p2Score += 1
        potentialWinner = this.p2Score
      } else {
        this.p1Score += 1
        potentialWinner = this.p1Score
      }
      if (potentialWinner == this.maxScore) {
        this.gameOver = true
        return `Player ${this.nextP} has won the game!`
      }
      return `Player ${this.swapPlayers(this.currentP)} has missed the ball!`
    }
  }

/* Note to self: Keeping a turn count and just checking if it's even or odd would've been more elegant than two properties that keep swapping between 2 and 1. */