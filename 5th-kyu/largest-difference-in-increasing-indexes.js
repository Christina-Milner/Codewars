/* Given an array of numbers, return the largest difference in indices j - i such that array[i] <= array[j] (or, based on sample tests, 0 if this is not possible).
Do not sort or otherwise modify the array.
*/

//P: An array of numbers
//R: A number


/*
- Hm. I hope this accepts solutions in quadratic time, because best I can think of is for each i, iterate over all the possible js and update a variable that stores the largest difference found.
- Alternative would be to create a copy of the array where each element is put into a subarray that also includes its original index, and then sort by value first and by index second or something,
    but that seems more muddled than the first approach
- If it won't pass solutions that run in quadratic time... we'll cross that bridge when we get to it.
*/



function largestDifference(data) {
    let maxDiff = 0
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (data[j] >= data[i] && j - i > maxDiff) {
                maxDiff = j - i
            }
        }
    }
    return maxDiff
  }