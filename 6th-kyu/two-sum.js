/* Given an array of numbers and a number, find two different items in the array that add up to  the target value and return their indices as an array.
There may be multiple solutions, in that case any one of them is fine. The input is always valid. */

//P: An array of numbers and a number
//R: An array of two numbers

/*
- Hmm, sounds like two nested for loops to me. One loops over the input array's indices starting at 0 and ending at length - 2, the other starts at 1 and ends at length - 1.
- If the sum matches, return the two indices as an array
- I'm not positive having the loops offset like that will prevent getting the same index twice if n / 2 is in the array. If not, I'll just have both loops 
    start at 0 and add an (if i does not equal j) check before returning.
*/

function twoSum(numbers, target) {
    for (let i = 0; i <= numbers.length - 2; i++) {
        for (let j = 1; j <= numbers.length - 1; j++) {
            if (numbers[i] + numbers[j] == target) {
                return [i, j]
            }
        }
    }
  }