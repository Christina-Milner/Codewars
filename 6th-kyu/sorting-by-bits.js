/* Given an array of numbers, sort it by how many 1s the number has in binary, going back to the actual values in case of a tie.
The array should be sorted in place. */

//P: An array of numbers
//R: An array of numbers

/*
- Sorting in place should be accomplished if we use the inbuilt sort function
- Make a helper that converts the number to binary (toString(2)) and then checks how many 1s it has (split and either sum or filter)
- sort() then uses this helper and falls back on the values in case of a tie
*/

function sortByBit(arr) {
    const howMany1s = num => {
        return num.toString(2).split('').filter(e => e == "1").length
    }
    arr.sort((a, b) => {
        if (howMany1s(a) == howMany1s(b)) {
            return a - b
        } else {
            return howMany1s(a) - howMany1s(b)
        }
    })
  }