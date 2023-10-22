/* You start at position [0, 0] in a n x n array, can only move in the cardinal directions and are trying to get to [N - 1, N - 1].
Or, actually, looking at the sample tests, it might be a string. Anyway, there are numbers (0-9) in it representing differences in altitude.
Return the minimal sum of altitude changes to get from the start to the end.
*/

//P: A string
//R: A number

/*
- This is a DFS, right, as we're not going to take the first path we find?
- Need to generate every possible path to the exit and keep track of its score, then find the minimum
- If we find one with 0, we can abort and just return that
- Probably need to split the string into a two-dimensional array because otherwise figuring out where we can go from each index is a PITA
- From starting location, can only go right or down. 
    - Add "[0, 0]" (joined as a string to allow for equality checks) to a visited array somewhere so we don't go in circles and cause infinite loops
    - Add [0, 1, <absolute value of 0, 0 alt and 0, 1 alt difference>] and [1, 0,  <absolute value of 0, 0 alt and 1, 0 alt difference>] to list of places to go
- Hm. Recursive function or "places left to visit" while loop? I'm currently mentally trying to do both.
- Visited has to be tracked per path
- Found paths don't have to be stored, just the minimum of the previous solution and the current one

*/


function pathFinder(area){
    // String of length 1 will probably break subsequent code so stop right here
    if (area.length <= 1) {return 0}
    // Object for keeping track of where on the grid we are, where we've been, and how many climbing rounds we're up to
    class Coord {
        constructor(y, x, score, visited) {
            this.y = y
            this.x = x
            this.score = score
            this.visited = visited
        }
      toString() {
        // This method is for debugging purposes only
        return `Coords: ${this.y}, ${this.x}. Score: ${this.score}. Visited: ${this.visited}`
      }
    }
    // Turn string into array so we have x, y coordinates
    let grid = area.split('\n').map(row => row.split(''));
    // Helper we'll need a few times
    const altitudeChanges = arr => arr.reduce((acc, cur, idx, arr) => {
        if (!idx) {return 0};
        return acc + Math.abs(cur - arr[idx - 1]);
    }, 0)
    // Initialise a variable for the climbing rounds and calculate the path if we just go right and down, to have a point of comparison other than Infinity
    let rounds = Infinity;
    let firstRow = altitudeChanges(grid[0])
    let lastColumn = altitudeChanges(grid.map(e => e[e.length - 1])) 
    rounds = firstRow + lastColumn
    let n = grid.length;
    // Array of points yet to visit, at the start that's going right and down from [0, 0]
    let toVisit = [new Coord(0, 1, Math.abs(grid[0][1] - grid[0][0]), ["00", "01"]), new Coord(1, 0, Math.abs(grid[1][0] - grid[0][0]), ["00", "10"])];
    const guessRemaining = (y, x) => {
        let downFirst = grid.slice(y).map(row => row[x]).concat(grid[grid.length - 1].slice(x + 1))
        let downLast = grid[y].slice(x).concat(grid.slice(y + 1).map(row => row[row.length - 1]))
        return Math.min(altitudeChanges(downFirst), altitudeChanges(downLast)) 
    }
    while (toVisit.length) {
        //if (grid.length > 15) {console.log("ROUND START"); toVisit.forEach(e => console.log(e.toString()))}
        toVisit.sort((a, b) => guessRemaining(b.y, b.x) - guessRemaining(a.y, a.x))
        let next = toVisit.pop();
        // We've reached the end, so see how the altitude score compares and return it if it's 0 as that's the best possible
        if (next.y == n - 1 && next.x == n - 1) {
            rounds = Math.min(next.score, rounds);
            if (rounds == 0) {return rounds}
            continue;
        }
        // If already over the current number of rounds, abort further calculations of this path
        if (next.score > rounds) {
            continue
        }
        // Valid next steps are cardinal directions that are not out of bounds and haven't been visited yet (no going in circles)
        // North and west are moving away from the goal and are only allowed if they're offering an option with no altitude change
        let north = next.y > 0 && !next.visited.includes(`${next.y - 1}${next.x}`);
        let west = next.x > 0 && !next.visited.includes(`${next.y}${next.x - 1}`);
        let south = next.y < n - 1 && !next.visited.includes(`${next.y + 1}${next.x}`);
        let east = next.x < n - 1 && !next.visited.includes(`${next.y}${next.x + 1}`);
        let temp = []
        if (north) {
            let northAlt = Math.abs(grid[next.y][next.x] - grid[next.y - 1][next.x]);

            temp.push(new Coord(next.y - 1, next.x, next.score + northAlt, next.visited.concat(`${next.y - 1}${next.x}`)));

        }
        if (south) {
            let southAlt = Math.abs(grid[next.y][next.x] - grid[next.y + 1][next.x]);
            temp.push(new Coord(next.y + 1, next.x, next.score + southAlt, next.visited.concat(`${next.y + 1}${next.x}`)));
        }
        if (east) {
            let eastAlt = Math.abs(grid[next.y][next.x] - grid[next.y][next.x + 1]);
            temp.push(new Coord(next.y, next.x + 1, next.score + eastAlt, next.visited.concat(`${next.y}${next.x + 1}`)));

        }
        if (west) {
            let westAlt = Math.abs(grid[next.y][next.x] - grid[next.y][next.x - 1]);

            temp.push(new Coord(next.y, next.x - 1, next.score + westAlt, next.visited.concat(`${next.y}${next.x - 1}`)));

        }
        temp.sort((a, b) => b.score - a.score);
        toVisit = toVisit.concat(temp);
    }
    return rounds;
}

/* WIP - works on basic tests up to 4 x 4 but then times out. Using unshift instead of push (i.e. making it bootleg DFS instead of BFS) got the failing tests to return numbers rather than Infinity, but
not the right ones (and comes with an additional performance cost.) Tried to balance it by using unshift only if the selected path didn't come with an altitude change, but it still times out. Probably need
to find a way to cut down on the number of paths explored where it makes no difference. Actually. Unless following a path of no altitude changes, it shouldn't backtrack at all (i.e. no moving north).
Update - that does seem to be the right path as disallowing moving north or west unless there's no altitude change has allowed it to pass another couple tests before running into the timeout.  */

/* Update! I have:
    - Changed the unshifts to push again, but also changed shift() at the start to pop(). Not using shift/unshift should help performance and this way it *should* explore one path fully before going down others
    - Initialised rounds as the path you take if you go across the first row and then down the last column rather than Infinity (meaning the algorithm doesn't have to traverse a full path to get a comparison value)
        and added a check that aborts if the current path is already longer than "rounds". It is now very close to passing, just choking on the large mazes still.

*/

/* Removed the restriction on north and west as that seemed to cause the odd random to fail, but of course caused a performance hit. Gave up on it as I didn't see how I could fix the performance.
Very sad as I felt I was most of the way there. Discussion contained the hint that neither standard DFS nor BFS would work; the secret was to not check all possible paths. That's fine but didn't help me.
I don't know how I could further prune the paths other than aborting if current score is higher than the previous best.
Sample solution:  */

function pathFinder(area){
    let a = area.split('\n'),
      max = a.length - 1,
      cost = a.map(e => [...e].fill(1e5)),
      best = 1e5,
      go = (lastAlt, oldSum, y, x) => {
        let alt = a[y][x]
        let sum = oldSum + Math.abs(alt - lastAlt)
        if (sum >= best || sum >= cost[y][x]) return
        if (y == max && x == max) return best = sum
        cost[y][x] = sum
        if (x < max) go(alt, sum, y, x + 1)
        if (y < max) go(alt, sum, y + 1, x)
        if (y > 0) go(alt, sum, y - 1, x)
        if (x > 0) go(alt, sum, y, x - 1)
      }
    go(a[0][0], 0, 0, 0)
    return best
  }

  /* Difference to mine (apart from being a lot shorter) seems to be that it not only checks whether the current sum is higher than the previous best, but also makes sure
  that any paths reaching a point at a higher cost than previously also get discarded. 
  I checked whether the addition of a costGrid into my original code would allow it to pass, but it does not. */
