/* Given a 2-dimensional array representing a sudoku puzzle, write a function that brute force solves it. All input will be solveable this way. */

//P: An array of arrays of numbers
//R: An array of arrays of numbers


/*
- This is going to be an ongoing WIP, but I would like to start tackling things closer to my profile's kyu level
- I have done a sudoku solver as part of a course using DrRacket before, but I barely remember
- I do remember it involved recursive functions deciding when to "backtrack", which is something I struggle with

- My first instinct is to write helpers that check whether the conditions for rows, columns and boxes are met
    - Probably need two - one that checks if 1 to 9 is all in there (that will be used to check whether it's finished), and one that checks whether a particular number is already present
- I am hoping that if for every square, I map out the number of possible candidates, there will be one that only has one (kinda like when you solve it by hand), and I can take it from there
- But I suspect it'll actually be a "just start filling in random numbers and figure out when you've ended up in an impossible state" sort of deal, which I'm not sure I can wrap my head around

- So, first let's make the helpers. Rows are the sub-arrays, columns are the sub-arrays mapped to an element at a particular position, boxes are a horizontal and vertical slice combined - I have done
    a simpler sudoku-related kata before, so I might just go grab the code from there... er, or at least I thought I did? I know for a fact I've written this box code before. Ah, there it is, 
    validate sudoku, not sudoku validator. isValid() method from there:
*/


/* So, that does what I want it to do so far. The error in my thinking has actually occurred to me (when solving by hand, it's often not that there's only one number that can go in a square because all others are ruled out,
but it's that one of the numbers that could go there can't go anywhere else in that row/column). But, at least for the example puzzle, there are actually multiple squares where only one entry is possible! I have a
sneaking suspicion that this is a rabbit hole that won't go anywhere with tests emulating slightly harder puzzles, but let's see.
Yeah, even after 1 round of that, there's no longer any unambiguous squares, so I am going to have to figure out the recursive "start filling stuff in and backtrack" method.
This should be a good start for it to not try incorrect numbers, though. */

/*
Ok. Let's do this.
- Recursive function that finds the first 0 in the array and then calls itself on all possibilities of what could be filled in there
    - I use my existing possibilities() so it only tries numbers that don't violate obvious constraints
- If the grid is full, check whether it is solved (need helpers for both of these - note to self, add comments on what each part does as this is rapidly getting out of hand), and if so, return it
    - Otherwise, return nothing as an abort ... or just don't do anything? See how this works out
- If possibilities() for a square are empty, also abort as it's clearly a wrong path

*/


function sudoku(puzzle) {
    // Numbers that can be used as I need this in multiple places
    const nums = Array.from({length: 9}, (_, i) => i + 1)
    // Returns an array of arrays that are the columns of the puzzle
    const getColumns = (grid) => {
        let arr = []
        for (let i = 0; i < 9; i++) {
            arr.push(grid.map(row => row[i]))
        }
        return arr
    }
    // Returns an array of arrays that are the 3x3 boxes
    const getBoxes = (grid) => {
        let rowGroups = []
        let boxes = []
        for (let i = 1; i <= 3; i++) {
            rowGroups.push(grid.slice((i - 1) * 3, i * 3))
        }
        for (let group of rowGroups) {
            for (let i = 1; i <= 3; i++) {
                let box = group.map(row => row.slice((i - 1) * 3, i * 3)).reduce((acc, cur) => acc.concat(cur), [])
                boxes.push(box)
            }
        }
        return boxes
    }
    // Don't need rows as these are just the elements of the puzzle array

    // Find the 3 x 3 box that a given square at puzzle[y][x] is in
    const findBox = (x, y, grid) => {
        if (y < 3) {
            if (x < 3) {return getBoxes(grid)[0]}
            else if (x < 6) {return getBoxes(grid)[1]}
            else {return getBoxes(grid)[2]}
        }
        else if (y < 6) {
            if (x < 3) {return getBoxes(grid)[3]}
            else if (x < 6) {return getBoxes(grid)[4]}
            else {return getBoxes(grid)[5]}
        }
        else {
            if (x < 3) {return getBoxes(grid)[6]}
            else if (x < 6) {return getBoxes(grid)[7]}
            else {return getBoxes(grid)[8]}
        }
    }

    // Returns the possible choices for a square at x, y, excluding everything already present in that row, column or box
    const isValid = (num, x, y, grid) => {
         return !(grid[y].includes(num)) && !(getColumns(grid)[x].includes(num)) && !(findBox(x, y, grid).includes(num))
    }

    // Check whether the puzzle is filled out
    const filled = grid => grid.every(row => !(row.includes(0)))

    // Check whether it is actually solved correctly
    const solved = grid => {
        return nums.every(num => grid.every(row => row.includes(num)) && getColumns(grid).every(col => col.includes(num)) && getBoxes(grid).every(box => box.includes(num)))
    }

    let empties = []
    for (let i = 0; i <= 8; i++) {
        for (let j = 0; j <= 8; j++) {
            if (!puzzle[i][j]) {
                empties.push([i, j, 1])
            }
        }
    }
    let idx = 0

    loop: while (!solved(puzzle)) {
        console.log(puzzle.map(e => e.join('') + '\n').join(''))
        //console.log("idx ", idx, "empties ", empties[idx])
        for (let i = empties[idx][2]; i <= 9; i++) {
            if (isValid(i, empties[idx][1], empties[idx][0], puzzle)) {
                //console.log("Changing ", empties[idx][0], empties[idx][1], " to ", i)
                puzzle[empties[idx][0]][empties[idx][1]] = i
                empties[idx][2] = i
                idx++
                //console.log("Idx now ", idx)
                continue loop
            }
        }
        //console.log("Outside for loop")
        if (idx > 0) {
            idx--
            empties = empties.map((e, i) => i > idx ? [e[0], e[1], 1] : e)
            empties[idx][2]++
          }
    }
    return puzzle
}

/* Previous recursive subfunction: */ 
    const recursiveSolver = (grid) => {
        //console.log(grid.map(e => e.join('') + '\n').join(''))
        if (filled(grid)) {
            console.log("Grid filled")
            if (solved(grid)) {
                console.log("Grid solved")
                return grid
            }
            else return
        }
        else {
            for (let y = 0; y <= 8; y++) {
                for (let x = 0; x <= 8; x++) {
                    if (!grid[y][x]) {
                        console.log("Coordinates ", y, x)
                        const possibilitiesArr = possibilities(x, y, grid)
                        if (possibilitiesArr.length) {
                            for (let num of possibilitiesArr) {
                                let newGrid = grid.map((el, idx) => idx === y ? el.slice(0, x).concat(num).concat(el.slice(x + 1)) : el)
                                const result = recursiveSolver(newGrid)
                                if (result) {return result}
                            }
                        }
                        else {console.log("No possibilities"); return}
                    }
                }
            }
        }
    }
        return recursiveSolver(puzzle)

/* I'm really sad as I felt like this one was within my grasp, but I'm going to have to give up on it. Two days is way more time than one should be spending on one of these. After I couldn't get the recursive version to work,
I read the wikipedia article on sudoku algorithms and tried to implement what was described there as a while loop, but that's timing out as well. */
/* Having a look at the other solutions now to see what I missed and I'm struggling to understand those. */

/* THis is probably the closest to what I was trying to do: */

function isValid(board, row, col, num) {
    for(let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false
      }
    }
    
    const startRow = 3 * Math.floor(row / 3)
    const startCol = 3 * Math.floor(col / 3)
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return false
        }
      }
    }
    
    return true
  }
  
  function findEmptyCell (board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          return [i, j]
        }
      }
    }
    return null
  }
  
  function sudoku(puzzle) {
    //return the solved puzzle as a 2d array of 9 x 9 
    const emptyCell = findEmptyCell(puzzle);
    if (!emptyCell) {
      return puzzle
    }
    const [row, col] = emptyCell
    for (let num = 1; num <=9; num++) {
      if (isValid(puzzle, row, col, num)) {
        puzzle[row][col] = num
        if (sudoku(puzzle)) {
          return puzzle
        }
        puzzle[row][col] = 0
      }
    }
    
    return false
  }


/* See if I can adapt my original solution */

function sudoku(puzzle) {
    // Numbers that can be used as I need this in multiple places
    const nums = Array.from({length: 9}, (_, i) => i + 1)
    // Returns an array of arrays that are the columns of the puzzle
    const getColumns = (grid) => {
        let arr = []
        for (let i = 0; i < 9; i++) {
            arr.push(grid.map(row => row[i]))
        }
        return arr
    }
    // Returns an array of arrays that are the 3x3 boxes
    const getBoxes = (grid) => {
        let rowGroups = []
        let boxes = []
        for (let i = 1; i <= 3; i++) {
            rowGroups.push(grid.slice((i - 1) * 3, i * 3))
        }
        for (let group of rowGroups) {
            for (let i = 1; i <= 3; i++) {
                let box = group.map(row => row.slice((i - 1) * 3, i * 3)).reduce((acc, cur) => acc.concat(cur), [])
                boxes.push(box)
            }
        }
        return boxes
    }
    // Don't need rows as these are just the elements of the puzzle array

    // Find the 3 x 3 box that a given square at puzzle[y][x] is in
    const findBox = (x, y, grid) => {
        if (y < 3) {
            if (x < 3) {return getBoxes(grid)[0]}
            else if (x < 6) {return getBoxes(grid)[1]}
            else {return getBoxes(grid)[2]}
        }
        else if (y < 6) {
            if (x < 3) {return getBoxes(grid)[3]}
            else if (x < 6) {return getBoxes(grid)[4]}
            else {return getBoxes(grid)[5]}
        }
        else {
            if (x < 3) {return getBoxes(grid)[6]}
            else if (x < 6) {return getBoxes(grid)[7]}
            else {return getBoxes(grid)[8]}
        }
    }

    // Returns the possible choices for a square at x, y, excluding everything already present in that row, column or box
    const possibilities = (x, y, grid) => {
        return nums.filter(num => !grid[y].includes(num) && !getColumns(grid)[x].includes(num) && !findBox(x, y, grid).includes(num))
   }

    // Check whether the puzzle is filled out
    const filled = grid => grid.every(row => !(row.includes(0)))

    const recursiveSolver = (grid) => {
        //console.log(grid.map(e => e.join('') + '\n').join(''))
        if (filled(grid)) {
            return grid
        }
        let row, col
        for (let y = 0; y <= 8; y++) {
            for (let x = 0; x <= 8; x++) {
                if (grid[y][x] === 0) {
                    row = y
                    col = x
                }
            }
        }
        const possibilitiesArr = possibilities(col, row, grid)
        for (let num of possibilitiesArr) {
            grid[row][col] = num
            if (recursiveSolver(grid)) {
                return grid
            }
            grid[row][col] = 0
        }       
    }
    return recursiveSolver(puzzle)
}

/* Yay, at least now I don'T feel like I completely wasted all that time */