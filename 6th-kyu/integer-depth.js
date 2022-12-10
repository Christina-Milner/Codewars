/* Given a positive integer n, return how many multiples of it are required until all digits from 0 to 9 have been present in the reults, e.g. for 42, the answer is 9.
(42 * 1 has 4 and 2, 42 * 2 = 84 which adds 8, 42 * 3 = 126 which adds 1 and 6, 42 * 4 = 168 which adds nothing, 42 * 5 = 210 which adds 0, 42 * 6 = 252 which adds 5, 
    42 * 7 = 294 which adds 9, 42 * 8 = 336 which adds 3, and 42 * 9 = 378 which adds 7.) */

//P: A positive integer
//R: A positive integer

/* Right, so we want to keep multiplying until a condition is met, that to me screams while loop.
We convert n to a string, split it, and make a set from that to get the unique digits.
Then a while loop that multiplies n with an incrementing i runs until the size of that set is 10. 
Then return i. */

// function computeDepth(x) {
//     let digits = new Set(String(x).split(''))
//     let i = 2
//     while (true) {
//       for (let digit of String(x * i).split('')) {
//         digits.add(digit)
//       }
//       if (digits.size == 10) {break}
//       i++
//     }
//     return i
// }

/* Had to change it to a while true loop (or, well, decided to fix the issue by doing so, anyway) as otherwise i was getting incremented
on the round that completed the set and everything was off by 1. Thought I could fix it by doing ++i instead of i++, but apparently not so (I have
yet to understand what that's for). Adding a check for digits.size to a while loop based on its size seemed
clumsy and subtracting one at the end like a workaround for faulty logic, so here we are. */

/* UPDATE: It occurred to me after submitting this that it would incorrectly produce 2 in cases where the correct answer was 1, e.g. if given
1234567890 as input, which Codewars tests didn't account for (issue submitted). Hence above version commented out and following refactored
solution submitted: */

function computeDepth(x) {
  let digits = new Set()
  let i = 1
  while (true) {
    for (let digit of String(x * i).split('')) {
      digits.add(digit)
    }
    if (digits.size == 10) {break}
    i++
  }
  return i
}