/* Given an array of integers that will never be empty, sum only consecutive occurrences of the same number. 
Example: [1,4,4,4,0,4,3,3,1] # should return [1,12,0,4,6,1]. */

//P: An array of numbers
//R: An array of numbers


/*
- Kata says bonus points if done on one line, but I take a dim view of CW's obsession with making everything as short as possible - makes it very hard to decipher the solutions for katas I give up on
- My first thought would be to make an object, then iterate over the array and add each number not already present as a key with itself as the value, and if present, add it to the value
- Then return the values of the object - but  that'll mess with the order compared to the original array because of how object keys are strings and a 1 will end up at the top (I miss Python)
- Sooo, what we'll want is a reduce: base value is an empty array, if current is equal to last element of acc, add it, otherwise push it in
- (Updated after first test) - Ok no I didn't think about how that would only work with 2 consecutive numbers because after that, the sum is obviously no longer equal to the next of those numbers
- Bleh, we'll have to stick an extra variable in there to keep track of what the current base number is
*/


function sumConsecutives(arr) {
    let prev = arr[0]
    return arr.reduce((acc, cur, idx) => {
        if (!idx) {
            return acc.concat(cur)
        }
        if (cur === prev) {
            acc[acc.length - 1] += cur
            return acc
        }
        prev = cur
        return acc.concat(cur)
    }, [])
}
