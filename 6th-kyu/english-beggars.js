/* You are given an array arr of numbers representing amounts given to beggars and an integer num that is the number of beggars. Assuming each beggar gets one offering
in turn (so with 3 beggars and 5 elements, the first beggar takes the 1st and 4th, the second takes the 2nd and 5th, and the 3rd only gets the 3rd), return an array
of how much each beggar gets. */

//P: An array of integers and an integer
//R: An array of integers

/*
Hmm. This kata is tagged "queues" and "recursion", but won't the modulo do? In the given example, taking modulo 3 of each index + 1 (we want to start with 1)
would return the correct beggar for the element to go to, except when it's 0, in which case it goes to beggar 3.
- Initialize array of length n and fill with 0
- Do a forEach on the values - add each value to resultArr[index % num or num]. Scratch the "+1" part as beggar #1 is at the 0 index. No wait, I do have to use
  +1 because otherwise index 0 goes to beggar num when it should be going to beggar 1. Hmm. Do I subtract one after assigning the beggar, or do I just put
  a dummy first element into the result array that I get rid of at the end?
- Can I use or inside those square brackets? Let's find out.
*/

function beggars(values, n) {
    let result = Array(n + 1).fill(0)
    values.forEach((e, i) => result[(i + 1) % n || n] += e)
    result.shift() // modulo strat works with indexing from 1, so index[0] is a dummy element that gets removed here
    return result
  }

/* This had me puzzling for a few minutes over what seemed to be VERY bizarre behaviour (why in the hell is it trying to add stuff to indices that are out of bounds
    when n is 1 and therefore the modulo should always be 0 and the resulting index 1)... but it just needed the parentheses around the addition, derr.
    Looking at solutions, it seems I overcomplicated this and adding values[i] to result[i % n] would've been sufficient. I guess my brain doesn't work
    well with "Beggar 1, Beggar 2, Beggar 3" vs. array[0], array[1], array[2].
    One person did actually solve this recursively, but unfortunately in a manner that is all but illegible to me. */