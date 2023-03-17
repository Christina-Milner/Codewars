/* Given an array of integers and a single value, return the first pair of integers you can find reading the array from the left that add up to the sum. (Tie break
    is which pair's second value has the lower index.) There will be negative numbers and duplicates, and the function shouldn't time out with very large arrays.*/

//P: An array of integers and an integer
//R: An array of 2 integers or undefined

/* 
- That last note in the description basically means this can't run in quadratic time.
- But we would want to iterate over the array and then for each element, check if the corresponding partner is in the rest of the array (and where). Hmm.
- Create a "seen" array that gets populated with the elements of the original as we iterate over it (adding duplicates no more than twice) and then check if the current element is the match to any of the ones in "seen"? But worst-case,
that's still quadratic, no? Let's find out.
*/



function sumPairs(ints, s) {
    let seen = []
    for (let int of ints) {
        for (let num of seen) {
            if (int + num == s) {
                return [num, int]
            }
        }
        if (seen.filter(e => e == int).length < 2) {
            seen.push(int)
        }
    }
    return undefined
  }

