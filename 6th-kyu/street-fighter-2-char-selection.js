/* You are given an array of arrays of strings representing rows of characters on the character selection screen of Street Fighter 2.
Given the original position of the selection cursor and a list of its moves, return the list of characters that were hovered over.
The left/right scroll wraps around, but top/bottom does not.
No moves should return []; the cursor sitting on Ryu to start with apparently does not count. */

//P: An array of arrays of strings, and an array of strings
//R: An array of strings

/* 
- Initialise a list of chars as an empty array
- If the list of moves is empty, return it
- Make a subfunction that takes a string and a pair of array indices [row, idx] as input and returns the appropriate next element in the array
    - "up" -> decreases row by one or returns current values if that would go out of bounds
    - "down" -> increases row by one or returns current values if that would go out of bounds
    - "right" -> increases idx by one, subtract length of the subarray if out of bounds
    - "left" -> decreases idx by one, add length of subarray if < 0
- Hmm. In order to be able to iterate over the moves list and have the current [row, idx] available to the subfunction, I need to declare those 
 outside it and update them on each turn. Which means they don't need to be parameters.
 - Iterate over the "moves" list and 
    - Update row and idx to the current element's indices
    - Push the subfunction's return to the list of chars
- Return the list of chars
*/

function streetFighterSelection(fighters, position, moves){
    let [row, pos] = [position[0], position[1]]
    let charList = []
    if (!moves.length) {return charList}
    
    const cursorMove = str => {
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
      return fighters[row][pos]
    }
    
    for (let move of moves) {
      charList.push(cursorMove(move))
    }
    
    return charList
  }

/* Works! I am a little unhappy with how updating row and pos is basically a hidden side effect of cursorMove, though.
Sooo... have refactored it to this: */

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

/* Still gives me the urge to turn it into some kind of recursive function that has the row, idx variables contained within itself,
but if I do that, I need to add pushing to charList to it as a side effect, so... nah. It's fine. */