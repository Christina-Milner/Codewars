/* Given a number n (always greater than 0), return the possible combinations of a and b where a * b equals the sum of all numbers from 1 to n with a and b 
excluded. Return an empty array if there is no such combination. */

//P: A number
//R: An array of subarrays of numbers, or empty array

/* 
- Surely there must be some sort of mathematical rule to this that means I don't have to brute force all the possible combinations. It'll likely time out if I do that.
- But let's think about how we'd brute force it, regardless
- Nested iteration over the array of numbers from 1 to n, checking if arr[i] * arr[j] equals the sum of the array minus arr[i] minus arr[j]
- If a match is found, push both combinations in and sort by ascending first value later
- Can probably stop at either n/2 or square root of n, will have to test to find out
*/


function removeNb (n) {
    let sum = n * (n + 1) / 2
    let ceil = Math.floor(Math.sqrt(sum))
    let result = []
    for (let i = 1; i <= ceil; i++) {
        let j = (sum + 1) / (i + 1) - 1
        if (Math.floor(j) == j && j <= n && i * j == sum - i - j) {
                result.push([i, j])
                result.push([j, i])
            }
        
    }
    if (result.length) {
        result.sort((a, b) => a[0] - b[0])
    }
    return result
}

/* Math is hard */