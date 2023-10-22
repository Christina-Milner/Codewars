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
    if (area.length <= 1) {return 0}
    class Coord {
        constructor(y, x, score, visited) {
            this.y = y
            this.x = x
            this.score = score
            this.visited = visited
        }
      toString() {
        return `Coords: ${this.y}, ${this.x}. Score: ${this.score}. Visited: ${this.visited}`
      }
    }
    let grid = area.split('\n').map(row => row.split(''));
    let rounds = Infinity;
    let n = grid.length;
    let toVisit = [new Coord(0, 1, Math.abs(grid[0][1] - grid[0][0]), ["00", "01"]), new Coord(1, 0, Math.abs(grid[1][0] - grid[0][0]), ["00", "10"])];
    while (toVisit.length) {
        //console.log("ROUND START")
        //toVisit.forEach(e => console.log(e.toString()))
        let next = toVisit.shift();
        if (next.y == n - 1 && next.x == n - 1) {
            rounds = Math.min(next.score, rounds);
            if (rounds == 0) {return rounds}
            continue;
        }
        let north = next.y > 0 && !next.visited.includes(`${next.y - 1}${next.x}`);
        let west = next.x > 0 && !next.visited.includes(`${next.y}${next.x - 1}`);
        let south = next.y < n - 1 && !next.visited.includes(`${next.y + 1}${next.x}`);
        let east = next.x < n - 1 && !next.visited.includes(`${next.y}${next.x + 1}`);
        if (north) {
            let northAlt = Math.abs(grid[next.y][next.x] - grid[next.y - 1][next.x]);
            if (!northAlt) {
                toVisit.unshift(new Coord(next.y - 1, next.x, next.score + northAlt, next.visited.concat(`${next.y - 1}${next.x}`)));
            }
            /*else {
                toVisit.push(new Coord(next.y - 1, next.x, next.score + northAlt, next.visited.concat(`${next.y - 1}${next.x}`)));
            }*/
        }
        if (south) {
            let southAlt = Math.abs(grid[next.y][next.x] - grid[next.y + 1][next.x]);
            if (!southAlt) {
                toVisit.unshift(new Coord(next.y + 1, next.x, next.score + southAlt, next.visited.concat(`${next.y + 1}${next.x}`)));
            }
            else {
                toVisit.push(new Coord(next.y + 1, next.x, next.score + southAlt, next.visited.concat(`${next.y + 1}${next.x}`)));
            }
        }
        if (east) {
            let eastAlt =  Math.abs(grid[next.y][next.x] - grid[next.y][next.x + 1]);
            if (!eastAlt) {
                toVisit.unshift(new Coord(next.y, next.x + 1, next.score + eastAlt, next.visited.concat(`${next.y}${next.x + 1}`)));
            }
            else {
                toVisit.push(new Coord(next.y, next.x + 1, next.score + eastAlt, next.visited.concat(`${next.y}${next.x + 1}`)));
            }
        }
        if (west) {
            let westAlt = Math.abs(grid[next.y][next.x] - grid[next.y][next.x - 1]);
            if (!westAlt) {
                toVisit.unshift(new Coord(next.y, next.x - 1, next.score + westAlt, next.visited.concat(`${next.y}${next.x - 1}`)));
            }
            /*else {
                toVisit.push(new Coord(next.y, next.x - 1, next.score + westAlt, next.visited.concat(`${next.y}${next.x - 1}`)));
            }*/
        }
    }
    return rounds;
}

/* WIP - works on basic tests up to 4 x 4 but then times out. Using unshift instead of push (i.e. making it bootleg DFS instead of BFS) got the failing tests to return numbers rather than Infinity, but
not the right ones (and comes with an additional performance cost.) Tried to balance it by using unshift only if the selected path didn't come with an altitude change, but it still times out. Probably need
to find a way to cut down on the number of paths explored where it makes no difference. Actually. Unless following a path of no altitude changes, it shouldn't backtrack at all (i.e. no moving north).
Update - that does seem to be the right path as disallowing moving north or west unless there's no altitude change has allowed it to pass another couple tests before running into the timeout.  */