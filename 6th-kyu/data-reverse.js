/* Given an array of zeroes and ones representing a stream of data, assume it is made up of blocks of data comprising 8 elements each and return it
with the order of those reversed (not the order of the elements itself).
Example:
11111111  00000000  00001111  10101010
 (byte1)   (byte2)   (byte3)   (byte4)
=> 
10101010  00001111  00000000  11111111
 (byte4)   (byte3)   (byte2)   (byte1)
 */

//P: An array of zeroes and ones
//R: An array of zeroes and ones

/*
- Make a for loop iterating from 1 to the array length divided by 8 (may need a check for empty array here)
- For each multiple of 8, splice a "#" into the array at the corresponding index
- Join the array, split by "#" and reverse
- Map to turn strings back into numbers
*/

function dataReverse(data) {
    // Splice is destructive, let's not modify the input
    let arrCopy = data.slice()

    // Insert a delimiter after each block of 8
    for (let i = 1; i <= data.length / 8; i++) {
        arrCopy.splice(i * 8 + i - 1, 0, "#")
    }

    // Join and split by delimiter
    arrCopy = arrCopy.join('').split('#')

    // This allows for reversing blocks instead of elements
    arrCopy = arrCopy.reverse()

    // Now we join and resplit to get the individual elements back and turn them back into numbers
    return arrCopy.join('').split('').map(e => Number(e))

  }