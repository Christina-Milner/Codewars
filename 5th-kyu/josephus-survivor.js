/* Given a n (number of people) and k (every kth person gets eliminated every round), return the number of the survivor. */

//P: Two numbers
//R: A number


/* 
- This is closely related to the "josephus permutation" kata I've already done, but I'll try and see if I can do it without referring back to my previous code
- Also this one apparently includes big numbers that may end up making array-based solutions too slow

- I seem to remember the solution to the previous one ended up being much less complicated than I thought.
- Let's have a look at n = 7, k = 3.
    - First, the two numbers that are divisible by 3 get booted. Logical.
    - The next is 2 (because if you're counting to 3, 7 is 1 and then it wraps around). 
        - How else to determine this? 3 - 7 % 3 ?
    - Next is 7 (2 + 3 in the sequence that remains ... how to keep track of this without using an array?)

- Hmm. Maybe there is a pattern here that means we don't actually have to do all these individual steps. 4 is 1 + k as well as n - k as well as k + n % k
- With n = 11, k = 19 and 10, none of that works. 

- I'll code it the way I can think of it and then have a peek at my previous solution if that turns out to be too slow
- Make an array of n
- Recursive function keeps running until that array only has one thing left in it
- Recursive function takes a parameter that's default 0 that keeps track of the shift on rounds after the first
- Ugh but that is going to lead to problems because the second it cuts out 3, it's not going to remember the next one needs to be 6 (i.e. iterating over an array while taking stuff out of it = bad)
- What if we actually just generate the array on each round and leave out the numbers that would get offed? Do this by including a parameter for the array length
*/

function josephusSurvivor(n, k) {
    let items = Array.from({length: n}, (_, i) => i + 1)
    let result = [];
    let index = 0;
  
    while (items.length > 0) {
      index = (index + k - 1) % items.length;
      result.push(items.splice(index, 1)[0]);
    }
  
    return result[result.length - 1];
  }

/* Nah, struggled for a bit, then just grabbed my code from Josephus permutations and adapted it to this scenario. The fact it's array-based is apparently not a problem. */