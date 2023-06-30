/* Given a number n, return the nth element in the Fibonacci sequence (first 2 elements are 0 and 1). */

//P: A number
//R: A number

/* 
- Yes, yes, Fibonacci is old news, but a) it's been a long day and b) I want to see if I can manage this recursively, I think at some point I forgot how that works
- Otherwise you'd just use an object with the ns as the keys and the fib values as the values, which also has the advantage of not exploding with very high numbers
- So, recursive function has to take in the current n, the current number and the previous number, so it'd start with 1, 1, 0. Can check for n = 0 outside of it or inside, doesn't matter.
- Then each call increments n and adds the last two together to make the current number, and makes the current current number the previous number
- Base case is n has reached the specified n
*/



function nthFibo(n) {
    if (n === 1) {return 0}
    const fibHelper = (count = 2, current = 1, prev = 0) => {
        if (count === n) {return current}
        return fibHelper(count + 1, current + prev, current)
    }
    return fibHelper()
}

/*
- So, I meant check for n = 1, not n = 0. Obviously. Zero-indexing melts the brain.
- Come to think of it, I don't think this implementation would even explode. It's the ones with two recursive calls on each call that do. But I forget what those even look like. Or am I thinking of something else?
Ah yes, thank you, second top-voted solution.
function nthFibo(n) {
  return n < 2 ? 0 : n == 2 ? 1 : nthFibo(n-1) + nthFibo(n-2);
}
THAT is how you get it to explode.
*/