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
    isValid() {
        const n = this.data.length
        // Sneaky tests with Sudokus that violate the size constraints
        if (!this.data.every(row => row.length === n)) {
            return false
        }
        // On with the actual validation
        const validate = arr => Array.from({length: n}, (_, i) => i + 1).every(e => arr.includes(e))
        for (let i = 0; i < n; i++) {
            // Rows
            if (!validate(this.data[i])) {
                return false
            }
            // Columns
            if (!validate(this.data.map(row => row[i]))) {
                return false
            }
        }
        // Boxes
        const root = Math.sqrt(n)
        let rowGroups = []
        let boxes = []
        for (let i = 1; i <= root; i++) {
            rowGroups.push(this.data.slice((i - 1) * root, i * root))
        }
        for (let group of rowGroups) {
            for (let i = 1; i <= root; i++) {
                let box = group.map(row => row.slice((i - 1) * root, i * root)).reduce((acc, cur) => acc.concat(cur), [])
                boxes.push(box)
            }
        }
        for (let box of boxes) {
            if (!validate(box)) {
                return false
            }
        }
        return true;
    }


*/


function sudoku(puzzle) {
    const getColumns = () => {
        let arr = []
        for (let i = 0; i < 9; i++) {
            arr.push(puzzle.map(row => row[i]))
        }
        return arr
    }
    const getBoxes = () => {
        let rowGroups = []
        let boxes = []
        for (let i = 1; i <= 3; i++) {
            rowGroups.push(puzzle.slice((i - 1) * 3, i * 3))
        }
        for (let group of rowGroups) {
            for (let i = 1; i <= 3; i++) {
                let box = group.map(row => row.slice((i - 1) * 3, i * 3)).reduce((acc, cur) => acc.concat(cur), [])
                boxes.push(box)
            }
        }
        return boxes
    }

    const findBox = (x, y) => {
        if (y < 3) {
            if (x < 3) {return getBoxes()[0]}
            else if (x < 6) {return getBoxes()[1]}
            else {return getBoxes()[2]}
        }
        else if (y < 6) {
            if (x < 3) {return getBoxes()[3]}
            else if (x < 6) {return getBoxes()[4]}
            else {return getBoxes()[5]}
        }
        else {
            if (x < 3) {return getBoxes()[6]}
            else if (x < 6) {return getBoxes()[7]}
            else {return getBoxes()[8]}
        }
    }

    const possibilities = (x, y) => {
        const nums = Array.from({length: 9}, (_, i) => i + 1)
        return nums.filter(num => !puzzle[y].includes(num) && !getColumns()[x].includes(num) && !findBox(x, y).includes(num))
    }

    let candidates = puzzle.map((row, idx) => row.map((num, i) => num ? num : possibilities(i, idx)))
    
  }

  /* So, that does what I want it to do so far. The error in my thinking has actually occurred to me (when solving by hand, it's often not that there's only one number that can go in a square because all others are ruled out,
    but it's that one of the numbers that could go there can't go anywhere else in that row/column). But, at least for the example puzzle, there are actually multiple squares where only one entry is possible! I have a
    sneaking suspicion that this is a rabbit hole that won't go anywhere with tests emulating slightly harder puzzles, but let's see.
    Yeah, even after 1 round of that, there's no longer any unambiguous squares, so I am going to have to figure out the recursive "start filling stuff in and backtrack" method.
    This should be a good start for it to not try incorrect numbers, though. */