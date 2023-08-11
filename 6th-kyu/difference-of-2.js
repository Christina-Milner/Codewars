/* Given an array of integers, return all pairs of integers in it that have a difference of 2, sorted by ascending value. */


//P: An array of numbers
//R: An array of arrays of numbers

/*
- Sort input by ascending
- Iterate over, checking for each number whether that number +2 is also included in the array
    - If we do that by using includes(), this runs in quadratic time, but shouldn't matter for this kata
    - More efficient would be to check if the next one is the current one +2, if lower, check the one after that, if higher, move on
- Push pair into result array if yes
- Return result array

*/



function twosDifference(input) {
    const sorted = input.slice().sort((a, b) => a - b)
    let result = []
    for (let i = 0; i < sorted.length; i++) {
        let num = sorted[i]
        if (sorted[i + 1] === num + 2 || sorted[i + 2] === num + 2) {
            result.push([num, num + 2])
        }
    }
    return result
}
