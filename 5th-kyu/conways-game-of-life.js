/* Given an array of 0s and 1s representing dead and live cells, respectively, return an array of what the next generation looks like.
    Rules:
    - A live cell with fewer than 2 live neighbours dies
    - A live cell with more than 3 live neighbors dies
    - A dead cell with exactly 3 live neighbors becomes live
    - Cells outside the array are considered dead, and the array can't grow beyond its initial size
    - The rules are applied simultaneously to all cells
*/

//P: An array of numbers
//R: An array of numbers


/*
- "applied simultaneously" means cells spawned/killed by the currently ongoing tick cannot spawn/kill others
- This should be respected if we create a new array to represent the next generation and fill it as we iterate over the old array
- Diagonal "neighbors" count, based on the sample tests
- Need a helper that takes in the y, x coordinates of a spot in the array and returns the number of its neighbors
    - Have done similar things before, is there a way to do this without the billion ifs caused by needing to check if row/column exists before attempting to index into it?
    - left: is current x - 1 >= 0 ?
    - right: is current x + 1 <= length - 1?
    - up: is current y - 1 >= 0 ?
    - down: is current y + 1 <= length - 1?
    - Establishing these probably helps as then can just go if (left), which would be torpedoed by the zeroes if done directly
    - Check up and down, then put all potential neighbors in an array (don't care about x as that won't throw an error, just produce undefined) and filter by number of 1s
- Create new array (length same as input, length of rows same as first row of input)
- Iterate over its rows and columns
- If current value is 0: new value is also 0 unless exactly 3 neighbors
- If current value is 1: new value is also 1 unless live neighbors < 2 or > 3
*/


function nextGen(cells) {
    const numOfNeighbors = (y, x) => {
        let up = y - 1 >= 0
        let down = y + 1 < cells.length
        let neighbors = []
        if (up) {
            neighbors.push(cells[y - 1][x - 1], cells[y - 1][x], cells[y - 1][x + 1])
        }
        neighbors.push(cells[y][x - 1], cells[y][x + 1])
        if (down) {
            neighbors.push(cells[y + 1][x - 1], cells[y + 1][x], cells[y + 1][x + 1])
        }
        return neighbors.filter(e => e == 1).length
    }
    let newArr = Array.from({length: cells.length}, () => Array(cells[0].length))
    for (let y = 0; y < cells.length; y++) {
        for (let x = 0; x < cells[0].length; x++) {
            let neighbors = numOfNeighbors(y, x)
            if (cells[y][x] === 1) {
                newArr[y][x] = neighbors == 2 || neighbors == 3 ? 1 : 0
            }
            else {
                newArr[y][x] = neighbors == 3 ? 1 : 0
            }
        }
    }
    return newArr
  }
  