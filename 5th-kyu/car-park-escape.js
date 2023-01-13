/* Given an array of arrays of numbers representing levels of a parking garage, where 2 is your starting position, 1 is the staircase required to get to ground level, and the exit is always in the bottom right corner,
return an array showing the quickest route to get out, using strings that indicate where to move and by how far, like R4 or D1.
Example: 
carpark = [[1, 0, 0, 0, 2],
           [0, 0, 0, 0, 0]];
result = ["L4", "D1", "R4"];
*/

//P: An array of arrays of numbers
//R: An array of strings

/*
First off: The ground floor has no staircase? 'kay. Going to try to not think about that too hard.
I think this looks more complicated than it is.
Question is, are there garages with underground levels where one might have to go up. In the sample tests there aren't, and the instructions only mention R, L and D, so let's say no.
- The difference in indices between the "level" that has the 2 and the ground level is how far we have to go down. If I reverse the input, I can just use the starting level's index.
- Difference in indices between the 2 and the 1 is initial horizontal movement. 1 - 2 is positive => move right, 1 - 2 is negative => move left
- On ground level, must move length of subarray - 1 - index of staircase to the right
So!
- Move to staircase first, then down, then to exit
*/

/*function escape(carpark) {
    carpark = carpark.reverse()
    const startLevel = carpark.find(e => e.includes(2))
    let down = carpark.indexOf(startLevel)
    let toStairs = startLevel.indexOf(1) - startLevel.indexOf(2)
    let out = carpark[carpark.length - 1].length - 1 - carpark[carpark.length - 1].indexOf(1)

    let route = []
    if (toStairs < 0) {
        route.push("L" + Math.abs(toStairs))
    } else {
        route.push("R" + toStairs)
    }
    if (down) {route.push("D" + down)}
    if (out) {route.push("R" + out)}
    
    return route
  }
  */

/* Leaving that there as that WOULD probably have worked beautifully ... EXCEPT THE STAIRCASE CAN APPARENTLY BE ON DIFFERING SIDES OF THE BUILDING FROM LEVEL TO LEVEL. OH MY GOD.
HOW. WHY. 
Anyway, that complicates it enough that I'd rather start from scratch. */

function escape(carpark) {
    let moves = []
    let [x, y] = [carpark.find(e => e.includes(2)).indexOf(2), carpark.indexOf(carpark.find(e => e.includes(2)))]
    while (x < carpark[0].length - 1 || y < carpark.length - 1) {
        if (carpark[y].includes(1)) {
            let move = carpark[y].indexOf(1) - x
            if (!move) {
                moves.push("D1")
                y++
            } else {
                move = move > 0 ? "R" + move : "L" + Math.abs(move)
                moves.push(move)
                x = carpark[y].indexOf(1)
                moves.push("D1")
                y++
            }
        } else {
            let move = "R" + (carpark[y].length - 1 - x)
            moves.push(move)
            x = carpark[0].length - 1
        }
    }

    const addMoves = (str1, str2) => str1[0] + (Number(str1[1]) + Number(str2[1]))
    moves = moves.reduce((a, b) => {
        if (!a.length) {return [b]}
        if (a[a.length - 1][0] == b[0]) {
            return a.slice(0, -1).concat(addMoves(a[a.length - 1], b))
        }
        return a.concat(b)
    }, [])
    return moves
}

/* 
Had a not so amusing time trying to debug this (it was originally passing fixeds but failing randoms), when there isn't enough buffer to console.log the input array.
Ended up being a sloppy line to filter 0 square moves (if x.includes("0")) that a) wasn't necessary anymore and b) was filtering all sorts of stuff it shouldn't have
with bigger arrays. Fun times.
I still hate katas that don't display each test result individually, just a giant block (and a Passed: 0 at the top even though some of them ARE passing).
 */