/* Given an array of numbers, return an object with the properties "pos" and "peaks" whose values are the indexes and numbers of the "peaks"
in the array. A "peak" appears to be a number that is bigger than the numbers on either side of it. In case of a plateau such as 1, 2, 2, 2, 1, 
that does count (the first "2" gets counted), but of course only if the number at the end of the equal numbers is lower. */

//P: An array of numbers
//R: An object

/*
- Initialise object with empty arrays as values to begin with
- Iterate over array by length (to have access to the indices)
- If current number is bigger than those either side, add its value and index to the respective arrays
- If next number is equal, save current number's values in temp arrays
- Wipe temp arrays once number that is not equal to this one is encountered and add values to object arrays if this number is smaller
*/


function pickPeaks(arr){
    let result = {
        pos: [],
        peaks: []
    }
    let tempPos = []
    let tempPeak = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
            result.pos.push(i)
            result.peaks.push(arr[i])
        }
        else if (arr[i] > arr[i - 1] && arr[i] === arr[i + 1]) {
            tempPos.push(i)
            tempPeak.push(arr[i])
        }
        if (tempPeak.length && arr[i + 1] !== arr[i]) {
            if (arr[i + 1] < tempPeak[0]) {
                result.pos.push(tempPos[0])
                result.peaks.push(tempPeak[0])
            }
            tempPos = []
            tempPeak = []
        }
    }
    return result
  }