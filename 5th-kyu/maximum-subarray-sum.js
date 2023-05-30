/* Given an array of numbers, return the continuous subarray that yields the maximum possible sum. (If all numbers in the array are positive,
this will be the sum of the entire array). If the array is empty or all numbers are negative, return 0.
Performance will be a factor.
Example: 
maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
should be 6: [4, -1, 2, 1]
 */

//P: An array of numbers
//R: A number

/*
- Check if array is empty and return 0
- Check if all numbers are negative or positive and return 0 or the array sum reduce, respectively
- Hmm. We basically want to look at the sums of all the continuous sequences of positive numbers and then see if any of them
    can be combined such that the gain is more than the loss from including the negatives in between
- So, iterate over the array...
    - If the first element is negative, ignore it. There is no possible benefit to including it.
    - (This goes for any subsequent negative elements as well)
    - Once first positive element has been found, keep a running total as long as elements are positive
    - As soon as a negative number is encountered, save the current running total as well as the corresponding index range (edit: nvm, I don't need the indices as we're returning a number, not a slice)
    - Start adding the negatives in a different total
    - If that total is bigger than previous positive total once encountering another positive number, discard it
    - Start new positive total
*/


const maxSequence = arr => {
    if (!arr.length) {
      return 0;
    }
  
    let maxSum = 0;
    let currentSum = 0;
  
    for (let i = 0; i < arr.length; i++) {
      currentSum += arr[i];
      if (currentSum < 0) {
        currentSum = 0;
      }
      if (currentSum > maxSum) {
        maxSum = currentSum;
      }
    }
  
    return maxSum;
  }

/* Realised I was massively overcomplicating it with the positive and negative streaks. Got there eventually. */