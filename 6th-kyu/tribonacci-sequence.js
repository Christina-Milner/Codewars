/* Given an (always valid) array of 3 numbers as a "signature" and a number n, return the first n elements of the tribonacci sequence - which works like
Fibonacci, except the previous 3 elements are summed to create the next one and the first 3 are the numbers stated in the input array. If n is 0, return an empty array.*/

//P: An array of 3 numbers and a number
//R: An array of numbers

/*
- Fibonacci I would do recursively so that should work here too
- Function takes in n, as well as a, b and c (which are the elements of the signature)
- Base cases - return appropriate one out of a, b and c
- Recursive call - n gets decremented and one out  of a, b, and c (will be a bit of trial and error to see which one) gets replaced with the sum of two of them
- Wait - we're supposed to be returning an array of all of them, not just tribonacci(n). I don't see how that would work with that setup. 
- Instead, return slice of signature if n <= 3 - signature.slice(0, n + 1)
- Else: For loop that starts at 3 and ends at n + 1 and pushes the sum of the previous 3 elements into the array
*/

function tribonacci(signature, n){
    if (n <= 3) {
        return signature.slice(0, n)
    }
    let results = signature.slice()
    for (let i = 3; i < n; i++) {
        results.push(results[i - 1] + results[i - 2] + results[i - 3])
    }
    return results
}

/* Slice to n rather than n + 1, and i < n rather than i <= n + 1. The fact that arrays are zero-indexed but the list we're building is 1-indexed messed with my head.
Slice 0, 1 means you're not including the element at INDEX 1, not not including the first element... */