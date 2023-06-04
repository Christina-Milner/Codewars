/* There is a 4 by 4 grid of skyscrapers that are between 1 and 4 levels high. No skyscrapers in the same row or column can have the same number of floors.
There are clues placed around the outside of the grid indicating how many buildings can be seen from that point (higher skyscrapers obscure lower ones).
Given the clues as an array of numbers in a clockwise order, return the skyscraper heights as an array of arrays. There is only one solution to each puzzle.*/

//P: An array of numbers
//R: An array of arrays of numbers

/*
- Create the solution as a 4 x 4 array filled with 0s
- Create a function that checks whether each row and column has the values from 1-4 to know when done
- If a clue is 1, that means the 4 building is directly next to it
- If its index is between 0 and 3, the 4 is at arr[0][idx]
- 4 to 7, the 4 is at arr[idx - 4][3]
- 8 to 11, the 4 is at arr[3][3 - (idx - 8)]
- 12 to 15, the 4 is at arr[Math.abs(idx - 15)][0]

Hmmm.
4 - 1 2 3 4 - 1
2 - 1 2 4 3 - 2
3 - 1 3 2 4 - 1
3 - 1 3 4 2 - 2
2 - 1 4 2 3 - 2
2 - 1 4 3 2 - 3
3 - 2 1 3 4 - 1
2 - 2 1 4 3 - 2
3 - 2 3 1 4 - 1
3 - 2 3 4 1 - 2
2 - 2 4 1 3 - 2
2 - 2 4 3 1 - 3
2 - 3 4 1 2 - 2
2 - 3 4 2 1 - 3
2 - 3 2 1 4 - 1
2 - 3 2 4 1 - 2
2 - 3 1 2 4 - 1
2 - 3 1 4 2 - 2
1 - 4 1 2 3 - 2
1 - 4 1 3 2 - 3
1 - 4 2 1 3 - 2
1 - 4 2 3 1 - 3
1 - 4 3 1 2 - 3
1 - 4 3 2 1 - 4

- A 4 gives us the whole sequence for that row or column
- A 3 combined with a 1 on the other end has the possibilities 132, 134, 213, 231, or 234
- A 3 with something other than a 1 on the other end gives us the position of the 4 (assuming there is a clue there, rather than 0)

- Just went over the example to see how I as a human would solve it. Like this:
Fill in any 4s next to 1s
Deduce position of remaining 4s
Deduce 3 based on 2 visible and  position of the 4
1 and 2 left for the column, 1 cannot be next to the 2
1 only thing left in rightmost column
1 in row 2 based on the 2
3 only thing left in that row
2 and 3 in 3rd column determined by 3 at bottom
2 only thing left in 3rd row
2 in 1st row placed because it can no longer be in 2nd column
All others only remaining number in row or column

But yeah, um, going to have to circle back to this. At least it's comforting to know it's on the hard side for a 4th kyu according to the comments.
*/


function solvePuzzle (clues) {
    let grid = Array.from({length: 4}, e => Array(4).fill(0))
    // Indices for the clue on the other side of the row or column
    const counterparts = {
        0: 11, 1: 10, 2: 9, 3: 8, 4: 15, 5: 14, 6: 13, 7: 12, 8: 3, 9: 2, 10: 1, 11: 0, 12: 7, 13: 6, 14: 5, 15: 4
    }
    const rowComplete = row => {
        const rowValues = grid.filter((_, i) => i === row)
        for (let i = 1; i <= 4; i++) {
            if (!rowValues.includes(i)) {
                return false
            }
        }
        return true
    }
    const colComplete = col => {
        const colValues = grid.map(e => e[col])
        for (let i = 1; i <= 4; i++) {
            if (!colValues.includes(i)) {
                return false
            }
        }
        return true
    }
    const colValues = col => {
        return grid.map(e => e[col])
    }

    const solutionComplete = () => {
        return [0, 1, 2, 3].every(num => rowComplete(num) && colComplete(num))
    }
    // Fill in info based on 1 and 4 clues
    for (let i = 0; i < clues.length; i++) {
        if (i <= 3) {
            if (clues[i] === 1) {
                grid[0][i] = 4
            }
            if (clues[i] === 4) {
                grid[0][i] = 1
                grid[1][i] = 2
                grid[2][i] = 3
                grid[3][i] = 4
            }
        }
        else if (i <= 7) {
            if (clues[i] === 1) {
                grid[i - 4][3] = 4
            }
            if (clues[i] === 4) {
                grid[i - 4][3] = 1
                grid[i - 4][2] = 2
                grid[i - 4][1] = 3
                grid[i - 4][0] = 4
            }
        }
        else if (i <= 11) {
            if (clues[i] === 1) {
                grid[3][3 - (i - 8)] = 4
            }
            if (clues[i] === 4) {
                grid[3][3 - (i - 8)] = 1
                grid[2][3 - (i - 8)] = 2
                grid[1][3 - (i - 8)] = 3
                grid[0][3 - (i - 8)] = 4
            }
        }
        else {
            if (clues[i] === 1) {
                grid[Math.abs(i - 15)][0] = 4
            }
            if (clues[i] === 4) {
                grid[Math.abs(i - 15)][0] = 1
                grid[Math.abs(i - 15)][1] = 2
                grid[Math.abs(i - 15)][2] = 3
                grid[Math.abs(i - 15)][3] = 4
            }
        }
    }

    // Find the remaining 4s
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].includes(4)) {
            continue
        }
        for (let j = 0; j < grid[i].length; j++) {
            if (colValues(j).includes(4)) {
                continue
            }
            if (i === 1 && j > 0 && j < 3 && (clues[14] === 2 || clues[5] === 2 || clues[5] === 3)) {
                grid[i][j] = 4
            }
            if (i === 2 && j > 0 && j < 3 && (clues[13] === 2 || clues[6] === 2 || clues[6] === 3)) {
                grid[i][j] = 4
            }
        }
    }
    if (grid.filter(e => e.includes(4)).length === 3) {
        for (let i = 0; i < grid.length; i++) {
            if (grid[i].includes(4)) {
                continue
            }
            for (let j = 0; j < grid[i].length; j++) {
                console.log(colValues(j))
                if (!colValues(j).includes(4)) {
                    grid[i][j] = 4
                }
            }
        }
    }
    console.log(grid)
    return grid
}