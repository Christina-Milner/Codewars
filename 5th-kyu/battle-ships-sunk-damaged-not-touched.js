/* We're playing Battleship. There's an array board depicting the game board, made up of subarrays representing the rows, with numbers. A 0 is an 
empty space, any other number is a boat (boats are 1-4 spaces long). There's another array attacks, comprised of subarrays giving the x and y coordinates
of each attack (Y0 is the bottom row for reasons). Given these two, return an object with the properties "sunk" (how many boats were sunk outright),
"damaged", "notTouched", and "points", where the points are damaged (not sunk) boats * 0.5, sunk boats * 1, and untouched boats * -1. */

//P: Two arrays of arrays of numbers
//R: An object

/*
First of all: Boats can be placed diagonally? What the hell?
- Reverse the game board so the Y coordinate makes sense (it does from a math graph perspective but not from a "top row is array[0]" one)
- [x, y] in the attacks now directly corresponds to board[y][x]
- Flatten board and turn into an object mapping each ship number to the length of that ship (probably best to ignore 0)
- Make helper function that returns the target of an attack and map attacks to their targets
- Replace lengths in above object: number of times ship appears in attack array == length? Sunk
    - Ship does not appear in attack array? Untouched
    - Ship does appear, but less often than its length? Damaged
- Create new object with desired return attributes, count values of previous object for first 3 and do appropriate math for points
*/

function damagedOrSunk (board, attacks){
    board = board.reverse()
    const attackTarget = ([x, y]) => board[y - 1][x - 1]
    const targets = attacks.map(e => attackTarget(e))

    let boats = {}
    const tiles = board.reduce((a, b) => a.concat(b), [])
    for (let num of tiles) {
        if (!num) {continue}
        else if (num in boats) {continue}
        else {boats[num] = tiles.filter(e => e == num).length}
    }

    for (let boat in boats) {
        let hits = targets.filter(e => e == boat).length
        if (hits == 0) {boats[boat] = "notTouched"}
        else if (hits < boats[boat]) {boats[boat] = "damaged"}
        else if (hits == boats[boat]) {boats[boat] = "sunk"}    // could leave this as "else", but just in case I missed something
    }

    let result = {
        sunk: 0,
        damaged: 0,
        notTouched: 0,
        points: 0
    }

    for (let state of Object.values(boats)) {
        if (state in result) {
            result[state] = Object.values(boats).filter(e => e == state).length
        }
    }

    result.points = result.sunk + result.damaged * 0.5 - result.notTouched

    return result
  }

/* Had to subtract 1 from x and y as the example coordinate grid is 1-indexed and clean up minor syntax derps, but otherwise that went
entirely according to plan! */