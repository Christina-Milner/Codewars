/* Given two positions on a chessboard in algebraic notation, return how many moves it would take a knight to get there. 
Example: "a3", "b5" => 1
The board is 8 x 8 and the knight is (obviously) not allowed to move off it.
*/

//P: Two strings
//R: A number

/*
- If we take c4 as an example for a knight position, it could move to b6, d6, b2, d2, a5, a3, e5, e3
    - So first coordinate -1 or +1 and second -2 or +2, or first coordinate -2/+2 and second coordinate -1/+1
- If the chessboard is a 2-dimensional array, the letter coordinate is the column index x (with a 0 => a, 1 => b etc. conversion), but
    the number coordinate is backwards and +1 compared to the y row, as the top row is 8 - so the absolute value of y - 8
- We need to generate the list of all possible moves from the starting position
    - [x - 1, y - 2], [x - 1, y + 2], [x + 1, y - 2], [x + 1, y + 2], [x - 2, y - 1], [x - 2, y + 1], [x + 2, y - 1], [x + 2, y + 1]
    - Each validated to make sure x and y are between 1 and 8 (or 0 and 7 if actually using an array, but I doubt we will be)
- I guess we add a third number to the coordinates, the number of moves, so 1 on the first round
- This then recursively runs on each of those
- It needs to keep track of where we've been as well, so actually, just add an array of the path rather than a number
- Ignore squares you've already been to on a given path - no going in circles
- If the destination is reachable from current square, push current path info into a result array so we can later pick the one with the lowest number of moves
- This all feels very cumbersome and I haven't stated a condition for when we're done (base case)
- Given there's no other pieces/occupied spaces to take into account, I feel like there should just be a mathematical solution
- Let's look at some examples:
    - c4 => g5: c4 -> e5 -> f7 -> g5 (3) ([4, 2] to [3, 6]) 
    - a1 => d4: a1 -> c2 or b3 -> d4 (2) ([7, 0] to [4, 3])
    - a1 => g5: a1 -> c2 -> e1 -> f3 -> g5 (4, I think) ([7, 0] to [3, 6])

*/

function knight(start, finish) {
    const alphabet = "abcdefgh"
    const isReachable = (coord1, coord2) => {
        let xdiff = Math.abs(alphabet.indexOf(coord1[0]) - alphabet.indexOf(coord2[0]))
        if (!(xdiff === 1 || xdiff == 2)) {
            return false
        }
        let ydiff = Math.abs(coord1[1] - coord2[1])
        if (xdiff === 1) {
             return ydiff === 2
        }
        if (xdiff === 2) {
            return ydiff === 1
        }
    }
    const findPossibleMoves = coord => {
        let temp = []
        for (let thing of [[1, 2], [2, 1]]) {
            let [yNewPlus, yNewMinus] = [alphabet.indexOf(coord[0]) + thing[0], alphabet.indexOf(coord[0]) - thing[0]]
            let [xNewPlus, xNewMinus] = [Number(coord[1]) + thing[1], Number(coord[1]) - thing[1]]
            for (let y of [yNewPlus, yNewMinus]) {
                if (y >= 0 && y <= 7) {
                    for (let x of [xNewPlus, xNewMinus]) {
                        if (x >= 1 && x <= 8) {
                            temp.push(`${alphabet[y]}${x}`)
                        }
                    }
                }
            }
        }
        return temp
    }

    let movesQueue = []
    let visited = []

    let possibles = findPossibleMoves(start)
    possibles.forEach(e => movesQueue.push([e, 1]))

    while (movesQueue.length) {
        let next = movesQueue.shift()
        if (next[0] == finish) {
            return next[1]
        }
        visited.push(next[0])
        let nextOptions = findPossibleMoves(next[0])
        for (let move of nextOptions) {
            movesQueue.push([move, next[1] + 1])
        }
    }
}

/*
- What the "visited" array is for? Don't ask me. Oops. I was *going* to check against that, but then forgot and the solution worked without it. (I could remove it here but have already submitted to CW.)
- I originally wrote this using a recursive helper but ran into the issue that obviously, as we're looking for the shortest route, it couldn't just return the first one it found,
    but that meant it  ended up checking near infinite numbers of them and timing out. Eventually got a "BFS rather than DFS, yo" pointer.
*/