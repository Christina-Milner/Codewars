/* We're simulating a Dots and Boxes game. 
Given the board size as an integer between 1 and 26 (to make a num x num board) and an array of lines that have already been drawn,
complete all possible squares by completing the Game class.
Return an array of all lines filled in including the original ones, sorted numerically and with no duplicates.

A 2 x 2 board would have lines 1, 2, 6, 7 and 11, 12 as the horizontals and 3, 4, 5, 8, 9, 10 as verticals. 

We are only doing the moves the player whose turn it is could make (i.e. completing as many boxes as possible but not adding any lines that don't complete a box). 

Example:
board = 2;
lines = [1, 3, 4];
game = new Game(board);
game.play(lines) => [1, 3, 4, 6]
*/

//P: An integer on initialisation of the class and an array of integers for the play function
//R: An array of integers

/*
- Rewrite provided code to use the class syntax. Yuck.
- I'm thinking create arrays for the horizontal and vertical lines so you can then do a check like if horizontal(idx) and vertical (idx) and vertical (idx + 1) and ...
next row (idx) ??? Then box.
- A n x n box will have n horizontal lines on each row and n + 1 vertical ones, and it will have n + 1 rows and n + 1 columns
- So total number of lines should be (n + 1)**2 + n * (n + 1)? Hmm no, that returns 15 for n = 2, and it should be 12.
    - Not sure where the mental error is above, but yeah, it's 3 x 2 + 3 x 2
    - But that would give 24 for n = 3, and it's only 17. Wait no, looked at the picture on Wikipedia, I just can't count. It is 24. So 2 * (n + 1) * n.
- Initialise arrays rows and columns
- Initialise an array of length 2 * (n + 1) * n and populate with integers starting at 1
- Slice off the first n elements and push to rows, then the next n + 1 elements and push to columns, and so on until it's gone 
    - For that toggle, initialise a counter and do a) if it's even and b) if it's odd
- Initialise the array we'll return later that starts out as the lines input
- Write some kind of box checker function: if rows[x][x] && rows[x + 1][x] && columns[x][x] && columns[x][x + 1] in lines, we have a box
- Assign 0 to conditions not met and 1 to conditions met, and if the total sum is 3, return the missing line and add it to lines
- This needs to keep checking the whole thing as more lines are added. How does it know it's done? 
    - I guess set something to true that will break the loop once false, and set it to false once it's done an entire loop without adding any lines
- Sort lines and return it
*/

class Game {
    constructor(board) {
      this.num = board
      this.allLines = Array.from({length: 2 * (board + 1) * board}, (_, i) => i + 1)
      this.lines = []
      this.rows = []
      this.columns = []
      this.boxes = []
    }
    
    makeRowsColsBoxes() {
      let counter = 0
      let lines = this.allLines
      while (lines.length) {
        if (counter % 2 == 0) {
          lines.slice(0, this.num).forEach(e => this.rows.push(e))
          lines = lines.slice(this.num)
          counter++
        } else {
          lines.slice(0, this.num + 1).forEach(e => this.columns.push(e))
          lines = lines.slice(this.num + 1)
          counter++
        }
      }
      while (this.boxes.length < this.num ** 2) {
        let box = []
        box.push(this.rows.shift())
        box.push(box[0] + this.num)
        box.push(box[0] + this.num + 1)
        box.push(this.rows[this.num - 1])
        this.boxes.push(box)      
      }
    }
    
    findMissing(arr) {
      let missing = arr.filter(e => !this.lines.includes(e))
      if (missing.length !== 1) {return null}
      return missing[0]    
    }
    
    boxChecker() {
      while (true) {
        let added = false
        for (let line of this.lines) {
          let possibleBoxes = this.boxes.filter(e => e.includes(line))
          for (let box of possibleBoxes) {
            if (this.findMissing(box)) {
              this.lines.push(this.findMissing(box))
              added = true
              }
            }
          }
          if (!added) {break}
    }
  }
    
    play(lines) {
      this.makeRowsColsBoxes()
      this.lines = lines
      this.boxChecker()
      this.lines.sort((a, b) => a - b)
      return this.lines
    }
  }

  
/* I'd originally had a much worse giant nightmare of a function that didn't work because I couldn't accurately map the indices of a given row or column
to the indices of those that might make a box with it. I.e, for [7, 9, 12] it was returning [7, 8, 9, 12] instead of [7, 9, 10, 12] because it had no way
of knowing that 8 (column index 3) was at the other end of the shape from row 7 (row index 3). Solved it by creating an array of all possible boxes
instead, which also made boxChecker and findMissing MUCH shorter than they were. Indentation might be a bit all over the place because Codewars. */
  