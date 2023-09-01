/* Disclaimer: I would like to attempt the 2nd kyu hard mode version of this but it would seem to make sense to do the lower-level version of the same thing first. */

/* Given a string consisting of R, G, and B, return the colour that will be at the tip/bottom of a triangle where two adjacent same colours will produce that same colour again, whereas two differing colours
will produce the missing third colour.
Example: 
R R G B R G B B
 R B R G B R B
  G G B R G G
   G R G B G
    B B R R
     B G R
      R B
       G
*/

//P: A string
//R: A string

/*
- First, check for string length 1 - if that's the case, return it
- ... this smells like a recursive function where the base case is length 1
- From the initial row, you would create the next one by:
    - Splitting it to array
    - Initialising an empty array
    - Shifting the first element while checking what the next one is and adding the appropriate colour to the result
    - This runs for as long as there are at least 2 elements left
- Since performance is going to be a concern in the harder version, might as well reverse the thing once so we can use pop() instead of shift
- Keep doing this until the input is only 1 char
- This feels awfully hard for a 7th kyu (they're normally more on the level of "know the appropriate array method that does this"), so the 2nd kyu is probably a bad idea
*/



function triangle(row) {
    if (row.length === 1) {return row}
    let map = {
        RR: "R",
        BB: "B",
        GG: "G",
        RB: "G",
        BR: "G",
        BG: "R",
        GB: "R",
        RG: "B",
        GR: "B"
    }
    let rowArr = row.split('').reverse()
    let nextRow = []
    while (rowArr.length >= 2) {
        let next = rowArr.pop()
        nextRow.push(map[next + rowArr[rowArr.length - 1]])
    }
    return triangle(nextRow.join(''))
}