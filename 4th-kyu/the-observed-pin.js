/* Given a number someone was observed typing into a keypad with this layout:
1 2 3
4 5 6
7 8 9
  0
Return all combinations that might possibly be the right PIN, assuming the person didn't see right and every number could also be
any of its horizontally or vertically adjacent numbers (as strings, in an array). */

//P: A string containing a number
//R: An array of strings

/*
- Create object that maps each digit to all its adjacent keys
- Figure out how to get all the combinations. Hmmm.
- Only way I can think of of doing this is nesting as many for loops as there are digits in the PIN, but 
    apart from the fact that I don't know how to make a variable number of for loops, that would be guaranteed to time out 
- Example is 1357, where:
    - The 1 could be 1, 2 or 4
    - The 3 could be 2, 3 or 6
    - The 5 could be 2, 5, 4, 6 or 8
    - the 7 could be 4, 7 or 8
- Slice first digit off PIN and make array of what it could be, like [1, 2, 4]
- If nothing left, done, return
- Otherwise, replace array with nested loop that creates all combinations of first and next digit
- Repeat until nothing left
*/

function getPINs(observed) {
    const options = {
        "1": ["1", "2", "4"],
        "2": ["1", "2", "3", "5"],
        "3": ["2", "3", "6"],
        "4": ["1", "4", "5", "7"],
        "5": ["2", "4", "5", "6", "8"],
        "6": ["3", "5", "6", "9"],
        "7": ["4", "7", "8"],
        "8": ["5", "7", "8", "9", "0"],
        "9": ["6", "8", "9"],
        "0": ["0", "8"]
    }

    const combine = (numStr, arr = []) => {
        if (!numStr) {
            return arr
        }
        if (!arr.length) {
            return combine(numStr.slice(1), options[numStr[0]])
        }
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < options[numStr[0]].length; j++) {
                newArr.push(arr[i] + options[numStr[0]][j])
            }
        }
        return combine(numStr.slice(1), newArr)
    }
    return combine(observed) 
}

/* I love when a plan comes together. Only thing I  needed to fix was I'd forgotten "0" in the map.*/