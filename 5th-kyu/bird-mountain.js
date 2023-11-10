/* Given an array of arrays of "^" representing mountains, return the height of the highest peak.
Example:
^^^^^^
 ^^^^^^^^
  ^^^^^^^
  ^^^^^
  ^^^^^^^^^^^
  ^^^^^^
  ^^^^

111111
 12222111
  1233211
  12321
  12332111111
  122211
  1111

=> 3 
*/

//P: An array of arrays of strings
//R: A number

/*
- Kata doesn't explain the rules because apparently that would spoil the algorithm or idk. So, from what it looks like:
    - Top and bottom row are 1s
    - Anything that's got an empty space anywhere next to it is a 1
    - Anywhere adjacent to a 1 is a 2, but in the new top and bottom row (top and bottom of those not filled in yet), they're all 2

- To generalise: the maximum value that can be in a row is its index + 1 if in the first half and length minus index if in the second. 
- Howeverr to have that value, the row also needs to be wide enough like in the example above it could be 4, but it's only 3 because there's only one empty
    square once the 2's have been filled in
- I am not sure I can solve it without actually converting the whole thing to the numbers.
- Make copy of input array and iterate over it
- In row 0, replace all ^s with 1s
- in row 1, replace all ^s that have a space to the up, down, left or right of them with a 1. Replace all others with a 2
- In row 2, follow same process for the 1s, then replace the ^s that have a 1 to their left/right with a 2, then replace the rest with a 3
- If number of rows is even, the num /2th row (index - 1) has the max value and then it goes backwards again, if it's odd, the Math.floor(num /2) row has the max

*/


function peakHeight(mountain) {
    let copy = mountain.map(row => row.slice());
    const hasEmptyNeighbor = (y, x) => {
        if (y > 0 && y < copy.length - 1) {
            if (x > 0 && x < copy[y].length - 1) {
                return (copy[y - 1][x] == " "|| copy[y][x + 1] == " " || copy[y + 1][x] == " " || copy[y][x - 1] == " ");
            }
        }
        // Edges are all 1
        return true;
    }
    for (let y = 0; y < copy.length; y++) {
        for (let x = 0; x < copy[y].length; x++) {
            const cur = copy[y][x];
            if (cur !== "^") {
                continue;
            }
            if (hasEmptyNeighbor(y, x)) {
                copy[y][x] = 1;
                continue;
            }
        }
    }
    console.log(copy.map(row => row.join('')))
    for (let y = 0; y < copy.length; y++) {
        for (let x = 0; x < copy[y].length; x++) {      
        const max = Math.ceil(copy.length / 2);
        let rowMax
        if (copy.length % 2 == 0) {
            if (y <= copy.length / 2) {
                rowMax = y + 1;
            } else {
                rowMax = max - (y - (copy.length / 2));
            }
        }
        else {
            if (y < max) {
                rowMax = y + 1;
            } else {
                rowMax = max - (max - (copy.length - y));
            }

        }
        copy[y] = copy[y].filter(e => e !== " ");
        let counter = 0;
        while (copy[y].includes("^")) {
            const idx = counter % 2 == 0 ? copy[y].indexOf("^") : copy[y].lastIndexOf("^");
            if (!isNaN(copy[y][idx - 1])) {
                copy[y][idx] = Math.min(copy[y][idx - 1] + 1, rowMax);
            }
            else if (!isNaN(copy[y][idx + 1])) {
                copy[y][idx] = Math.min(copy[y][idx + 1] + 1, rowMax);
            }
            counter++;
        }
        for (let x = copy[y].length - 1; x >= 0; x--) {
            let [cur, before, after] = [copy[y][x], copy[y][x - 1], copy[y][x + 1]]
            if (cur == 1) {
                continue;
            }
            else if (after) {
                if (cur > after + 1) {
                    copy[y][x] = after + 1;
                }
            }
        }
        for (let x = 0; x < copy[y].length; x++) {
            let [cur, before, after] = [copy[y][x], copy[y][x - 1], copy[y][x + 1]]
            if (cur == 1) {
                continue;
            }
            else if (before) {
                if (cur > before + 1) {
                    copy[y][x] = before + 1;
                }
            }
        }
    }
    }
    console.log(copy.map(row => row.join('')).join("\n"))
    return copy.map(row => row.filter(el => !isNaN(el)).reduce((acc, cur) => Math.max(acc, cur), 0)).reduce((acc, cur) => Math.max(acc, cur), 0);
  }

