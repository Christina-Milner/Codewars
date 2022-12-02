/* There is a school with N doors and N students. At the start, all doors in the school are closed. The first student opens all the doors.
Every subsequent student (the i-th student) changes the status of every i-th door, with the last student only changing the status of the nth door.
Return the number of doors that are still open after all the students have arrived. */

//P: A number (of students and doors)
//R: A number

/* There may very well be some kind of math hack to this, but I'll be solving it iteratively.
Create an array with N elements that'll all be 0 to start with. 0 = closed, 1 = open, so at the end we can sum this array to get the result.
Return 0 if given number is 0.
For simplicity, I'll make a toggle helper that returns 1 if the input is 0 and 0 if the input is 1.
Then for i going from 1 to N, use the toggle on every array element where index % i is 0.
Sum the array to obtain the result. */

// First draft based on the above that passed fixed tests, but timed out on the random ones:

/* 
function doors(n){
  if (n == 0) {return 0}
  let allDoors = Array(n).fill(0)
  const toggle = n => n == 0 ? 1 : 0
  for (let i = 1; i <= n; i++) {
    allDoors.forEach((e, idx, arr) => {
      if ((idx + 1) % i == 0) {arr[idx] = toggle(arr[idx])}
    })
  }
  return allDoors.reduce((a, b) => a + b, 0)
}
*/

/* Going to have to try to find a math logic behind it after all ...
A door will be shut if it is interacted with an even number of times, and open if it is interacted with an odd number of times (including the first one that opens everything)
4 in the example is open because it is interacted with by 1, 2 and 4.
3 is shut because it is interacted with by 1 and 2.
So... find the number of divisors for each index (counting from 1) and assign it 0 if that number is odd and 1 if it is even?
That still sounds like nested for loops... but let's see. */

// Took several ominous seconds on the random tests, but it works!

function doors(n){
    if (n == 0) {return 0}
    let allDoors = Array(n).fill(0)
    for (let i = 1; i <= n; i++) {
      let divisors = []
      for (let j = 1; j <= i; j++) {
        if (i % j == 0) {divisors.push(j)}
      }
      if (divisors.length % 2 == 0) {
        allDoors[i] = 0
      } else {
        allDoors[i] = 1
      }
    }
    return allDoors.reduce((a, b) => a + b, 0)
  }

/* Note after submitting solution: returning the (rounded down) square root of n would've done the trick.
Let's say I totally knew that but wanted to actually find an algorithm. */
