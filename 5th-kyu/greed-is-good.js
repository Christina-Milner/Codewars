/* Given an array of 5 dice rolls, return a "Greed" dice game score, based on the following rules:
 Three 1's => 1000 points
 Three 6's =>  600 points
 Three 5's =>  500 points
 Three 4's =>  400 points
 Three 3's =>  300 points
 Three 2's =>  200 points
 One   1   =>  100 points
 One   5   =>   50 point

 One die can only be counted once, and the input shouldn't be mutated (duh). */

 //P: An array of numbers
 //R: A number

/*
- How to keep dice that form a triplet from being counted again when we score the rest?
- Make copy of array and sort it by how many instances of each number there are in it, so 2 4 4 5 4 would turn into 4 4 4 5 2 (or 2 5 I don't care)
- If there are at least 3 of first element, calculate appropriate score and slice 3 off
- Resort and check again
- Once no more triplets remain, just count the 1s and 5s
*/


 function score(dice) {
    let copy = dice.slice()
    const sortByFrequency = arr => arr.sort((a, b) => arr.filter(roll => roll == b).length - arr.filter(roll => roll == a).length)
    sortByFrequency(copy)
    let result = 0
    while (copy.some(num => copy.filter(e => e == num).length >= 3)) {
        if (copy.filter(e => e == copy[0]).length >= 3) {
            result += copy[0] == 1 ? 1000 : copy[0] * 100
        }
        copy = copy.slice(3)
        sortByFrequency(copy)
    }
    result += copy.filter(e => e == 1).length * 100
    result += copy.filter(e => e == 5).length * 50
    return result
  }

/* Why the hell is it called "some" and not "any" in JS?? Anyway, that was only fix that needed to be made. */