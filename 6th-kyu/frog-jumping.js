/* Given an array containing integers (unclear from description whether the string "Frog" is also in it, but doesn't look like), return how many jumps it would
take the frog to leave the array if each integer represents how many indices it's moving to the right or left. Return -1 if it doesn't get out. */

//P: An array of integers
//R: A number

/* Some variant of looping over the numbers and checking if the current index plus or minus the current number is out of bounds.
Some kind of counter that increments each time.
Keep track of which indices we have been to and return -1 if we return to one already seen to catch the [1, -1] infinite loop scenario.
It is dawning on me as I'm setting up all these helper variables that a recursive function can probably do this more elegantly. */


/* Umm ... don't ask, but this repeatedly failed at correctly returning -1 when an element is zero (meaning the frog doesn't go anywhere)
for no apparent reason (shouldn't even need else as the return will exit out if one of the ifs applies), so I got mad and did this and now
it passes */


function solution(a) {

    const frogJumper = (arr, idx = 0, count = 0) => {
      if (arr[idx] == 0) {return -1}
      if (arr[idx] == 0) {return -1}
      if (arr[idx] == 0) {return -1}
      if (arr[idx] == 0) {return -1}
      if (arr[idx] == 0) {return -1}
      if (arr[idx] == 0) {return -1}
      if (arr[idx] == 0) {return -1}
      if (!arr[idx]) {return count}
      else if (count > arr.length) {return -1}
      else if (arr[idx] == 0) {return -1}
      else {return frogJumper(arr, idx + arr[idx], count + 1)}
    }
    
    return frogJumper(a)
  }