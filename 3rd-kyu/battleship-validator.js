/* Given a 10 x 10 2D array  (this does not need to be validated), return whether or not it is a valid Battleship setup.
This means:
    - 1 boat of 4, 2 boats of 3, 3 boats of 2, and 4 boats of 1 - no more, no less
    - Boats can't touch or be adjacent to each other, even diagonally
    - Boats are straight lines
*/

//P: An array of arrays of numbers
//R: A boolean

/*
- So, a cell with a 1 in it can be:
    - A submarine (surrounded on all sides by 0s/undefined)
    - The end piece of a ship (all 0s except one direction)
    - The middle piece of a ship (all 0s except two sides that must either be left and right or top and bottom)
- So as a starting point, iterate over the array and check those 3 conditions - any "1" that isn't one of those 3 can return an instant false
- Or alternatively, start by looking for all 1s that are surrounded by nothing on all sides
    - Check if their number is exactly 4
    - Then change them to 0s
- Then repeat this process with the longer boats? I gotta try it out.
*/

function validateBattlefield(field) {
    const diagonalNeighbors = (y, x) => {
        let neighbors
        if (y > 0 && x > 0 && y < field.length - 1 && x < field.length - 1) {
            neighbors = [field[y - 1][ x - 1], field[y - 1][x + 1], field[y + 1][x - 1], field[y + 1][x + 1]]
        }
        else if (y === 0) {
            if (x === 0) {
                neighbors = [field[y + 1][x + 1]]
            }
            else if (x === field.length - 1) {
                neighbors = [field[y + 1][x - 1]]
            }
            else {
                neighbors = [field[y + 1][x - 1], field[y + 1][x + 1]]
            }
        }
        else if (y === field.length - 1) {
            if (x === 0) {
                neighbors = [field[y - 1][x + 1]]
            }
            else if (x === field.length - 1) {
                neighbors = [field[y - 1][x - 1]]
            }
            else {
                neighbors = [field[y - 1][x - 1], field[y - 1][x + 1]]
            }
        }
        else if (x === 0) {
            neighbors = [field[y - 1][x + 1], field[y + 1][x + 1]]
        }
        else if (x === field.length - 1) {
            neighbors = [field[y - 1][x - 1], field[y + 1][x - 1]]
        }
        return neighbors.filter(e => e === 1).length
    }
    const horizontalNeighbors = (y, x) => {
        let neighbors
        if (x > 0 && x < field.length - 1) {
            neighbors = [field[y][x - 1], field[y][x + 1]]
        }
        else if (x === 0) {
            neighbors = [field[y][x + 1]]
        }
        else if (x === field.length - 1) {
            neighbors = [field[y][x - 1]]
        }
        return neighbors.filter(e => e === 1).length
    }
    const verticalNeighbors = (y, x) => {
        let neighbors
        if (y > 0 && y < field.length - 1) {
            neighbors = [field[y - 1][x], field[y + 1][x]]
        }
        else if (y === 0) {
            neighbors = [field[y + 1][x]]
        }
        else if (y === field.length - 1) {
            neighbors = [field[y - 1][x]]
        }
        return neighbors.filter(e => e === 1).length
    }
    const isSubmarine = (y, x) => {
        return field[y][x] === 1 && !diagonalNeighbors(y, x) && !horizontalNeighbors(y, x) && !verticalNeighbors(y, x)
    }

    let battleship = 0
    let cruisers = 0
    let destroyers = 0
    let submarines = 0

  
    for (let y = 0; y < field.length; y++) {
        for (x = 0; x < field.length; x++) {
            if (field[y][x] === 1) {
                if (diagonalNeighbors(y, x) || horizontalNeighbors(y, x) && verticalNeighbors(y, x)) {
                    return false
                }
                if (isSubmarine(y, x)) {
                    submarines++
                }
                else if (horizontalNeighbors(y, x)) {
                    let n = x
                    while (field[y][n + 1] === 1) {
                        n++
                    }
                    let num = n - x
                    if (num === 1) {destroyers++}
                    if (num === 2) {cruisers++}
                    if (num === 3) {battleship++}
                    for (let coord of Array.from({length: n - x + 1}, (_, i) => i + x)) {field[y][coord] = 0}
                    if (num < 1 || num > 3) {return false}
                }
                else if (verticalNeighbors(y, x)) {
                    let n = y
                    while (field[n + 1][x] === 1) {
                        n++
                    }
                    let num = n - y
                    if (num === 1) {destroyers++}
                    if (num === 2) {cruisers++}
                    if (num === 3) {battleship++}
                    for (let coord of Array.from({length: n - y + 1}, (_, i) => i + y)) {field[coord][x] = 0}
                    if (num < 1 || num > 3) {return false}
                }
            }
        }
    }
    return battleship === 1 && cruisers === 2 && destroyers === 3 && submarines === 4
  }

/* Voilà! Rewrote it a little bit even after it passed the tests and I submitted it to CW, because I noticed I'd put "x" instead of "y" in the verticalNeighbors section of the big for loop, but when I fixed that,
it stopped passing. So there was clearly something else wrong with it that the tests didn't catch, but should be all good now. */