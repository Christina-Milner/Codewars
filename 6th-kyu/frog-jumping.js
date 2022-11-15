/* Given an array containing integers (unclear from description whether the string "Frog" is also in it, but doesn't look like), return how many jumps it would
take the frog to leave the array if each integer represents how many indices it's moving to the right or left. Return -1 if it doesn't get out. */

//P: An array of integers
//R: A number

/* Some variant of looping over the numbers and checking if the current index plus or minus the current number is out of bounds.
Some kind of counter that increments each time.
Keep track of which indices we have been to and return -1 if we return to one already seen to catch the [1, -1] infinite loop scenario.
It is dawning on me as I'm setting up all these helper variables that a recursive function can probably do this more elegantly. */


/* Update - I realised what the problem with this was while sitting on the sofa watching Netflix later in the evening.
Breaking news - 0 is falsy.*/


function solution(a) {

    const frogJumper = (arr, idx = 0, count = 0) => {
      if (idx < 0 || idx > arr.length - 1) {return count}
      else if (count > arr.length) {return -1}
      else if (arr[idx] == 0) {return -1}
      else {return frogJumper(arr, idx + arr[idx], count + 1)}
    }
    
    return frogJumper(a)
  }