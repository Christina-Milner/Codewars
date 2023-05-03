/* Given a n x n maze with the starting point [0, 0], "." as empty spaces and "W" as walls, and [n - 1, n - 1] being the exit point, return a boolean indicating whether
it is possible to go from the start to the exit while moving only in the cardinal directions. */

//P: ~~An array of arrays of strings~~ - nope, it's a string!
//R: A boolean

/*
- This smells of "depth first search" shenanigans that I'm not sure I remember correctly
- But it will help that the start and exit points are not randomised
- First test uses this maze:
...WWW
.W....
......
W....W
..W...
..W.W.
- As start is always upper left, we can go row by row
- If 0, 1 and 1, 0 are both walls, instant false
- Same is true at the other end - if n - 1, n - 2 and n - 2, n - 1 are both walls, instant false
- Iterate over first row and put coordinates into an array, stop when hitting a "W" - these are accessible from the start
- Iterate over second row - put coordinates into array if a) not a wall AND (b) x, y - 1 was present in previous array OR c) accessible from one of those points
- Keep doing that until reaching last row and check if n - 1, n - 1 ends up in array
*/


function pathFinder(maze){
    let currentRow = []
    let prevRow = []
    const mazeArr = maze.split('\n').map(e => e.split(''))
    for (let i = 0; i < mazeArr.length; i++) {
        console.log("current ", currentRow, "prev ", prevRow)
        if (i === 0) {
            for (let j = 0; j < mazeArr.length; j++) {
                if (mazeArr[i][j] === ".") {
                    currentRow.push(j)
                } else {
                    break
                }
            }
        } else {
            prevRow = currentRow
            currentRow = []
            for (let j = 0; j < mazeArr.length; j++) {
                if (mazeArr[i][j] === "." && (prevRow.includes(j) || currentRow.includes(j - 1))) {
                    currentRow.push(j)
                }
            }
        }   
    }
    return currentRow.includes(mazeArr.length - 1)
}

/* Important to read properly - was stumped for a moment as to why the if block in the else block wasn't firing, but it was because the input was a string, not an array of arrays.
The above works for the fixeds but does not work for scenarios like the "snake path" where you have to alternate horizontal and vertical movement. It'll have to be the DFS after all.
Let's try again. */

function pathFinder(maze){
    console.log("*****TEST STARTS HERE********")
    let mazeArr = maze.split('\n').map(e => e.split(''))
    const length = mazeArr.length
    mazeArr = mazeArr.map((e, idx) => e.map((f, i, arr) => f == "." ? [idx, i] : null ).filter(e => e)).reduce((a, b) => a.concat(b), [])
    // ^this creates an array of arrays of coordinates where we can walk
    let visited = []
    let found = false
    const routeFinder = current => {
        if (current[0] == length - 1 && current[1] == length - 1) {
            found = true
            return true
        }
        if (visited.length == mazeArr.length) {
            return false
        }
        if (!visited.find(e => e[0] == current[0] && e[1] == current[1])) {
            let [y, x] = [current[0], current[1]]
            let up = [y - 1, x]
            let down = [y + 1, x]
            let left = [y, x - 1]
            let right = [y, x + 1]
            visited.push(current)
            for (let point of [up, down, left, right]) {
                if (mazeArr.find(e => e[0] == point[0] && e[1] == point[1]) && !visited.find(e => e[0] == point[0] && e[1] == point[1])) {
                    routeFinder(point)
                }
            }
            return false
       }
    }
    return routeFinder([0, 0]) || found
 
}

/* So the problem I'm having is if I return routeFinder(point), it doesn't check all the options as the return statement interrupts iteration, but if I don't return it,
it reaches the return true base case and does nothing. Creating the found variable outside the function and setting it to true in case that base case is reached is a 
workaround of sorts, but now the whole thing is timing out on big random mazes. */
/* Giving up on it - here's top solution by other people: */

function pathFinder(maze){
    const rows = maze.split(`\n`).map(l => l.split(``));
    const n = rows.length - 1;
    const moveTo = (x, y) => {
      if (x < 0 || y < 0 || x > n || y > n || rows[y][x] !== '.') {
        return false;
      }
      
      if (x === n && y === n) {
        return true;
      }
      
      rows[y][x] = `x`;
      
      return moveTo(x - 1, y)
        || moveTo(x + 1, y)
        || moveTo(x, y - 1)
        || moveTo(x, y + 1);
    }
    
    return moveTo(0, 0);
  }