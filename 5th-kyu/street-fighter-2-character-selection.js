/* Given an array representing the character options on the start screen of a fighting game, a position giving a coordinate of where on that list we
are starting, and "moves" representing what buttons the player is pressing to move the cursor, return the list of characters the cursor will move over. */

//P: An array of arrays of strings, an array of numbers, and an array of strings
//R: An array of strings

/*
- This is a continuation of a similar kata, with the introduction of empty strings that have to be handled correctly
- The cursor loops around when moved off the screen horizontally (and should skip any empties in the grid), but simply stops when
    this is attempted vertically
- I completed the previous kata but before I was saving these, so that code is at the bottom
- The way I see it, I can reuse that code and just need to account for the empty string. THe fact that the grid might not have 3 rows should be irrelevant
    - For up and down, it just needs to be an "and" - index going up/down isn't out of bounds AND element there isn't the empty string
    - For left and right, add a while loop - while element at that index is falsy, decrement(left)/increment(right) the index unless it's already
     at min(left)/max(right)
*/




function superStreetFighterSelection(fighters, position, moves){
    let [row, pos] = [position[0], position[1]]
    let charList = []
    if (!moves.length) {return charList}

    const updateCursorPos = str => {
        if (str == "up") {
            row = row - 1 < 0  || !fighters[row - 1][pos] ? row : row - 1
        }
        if (str == "down") {
            row = row + 1 > fighters.length - 1 || !fighters[row + 1][pos] ? row : row + 1
        }
        if (str == "left") {
            pos -= 1
            while (!fighters[row][pos]) {
                if (pos < 0) {
                    pos += fighters[row].length
                }
                else {
                    pos--
                }
            }
        }
        if (str == "right") {
            pos += 1
            while (!fighters[row][pos]) {
                if (pos > fighters[row].length - 1) {
                    pos = 0
                }
                else {
                    pos++
                }
            }
        }
    }

    const getChar = () => fighters[row][pos]

    for (let move of moves) {
        updateCursorPos(move)
        charList.push(getChar())
    }

    return charList
  }



function streetFighterSelection(fighters, position, moves){
    let [row, pos] = [position[0], position[1]]
    let charList = []
    if (!moves.length) {return charList}

    const updateCursorPos = str => {
        if (str == "up") {
            row = row - 1 < 0 ? row : row - 1
        }
        if (str == "down") {
            row = row + 1 > fighters.length - 1 ? row : row + 1
        }
        if (str == "left") {
            pos = pos - 1 < 0 ? pos - 1 + fighters[row].length : pos - 1
        }
        if (str == "right") {
            pos = pos + 1 > fighters[row].length  - 1 ? pos + 1 - fighters[row].length : pos + 1
        }
    }

    const getChar = () => fighters[row][pos]

    for (let move of moves) {
        updateCursorPos(move)
        charList.push(getChar())
    }

    return charList
}