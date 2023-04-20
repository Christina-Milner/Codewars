/* Given an array arr and a number n, return the first n elements of a fibonacci-like sequence that starts with the array numbers as a seed and then 
each subsequent element is the sum of the previous (array length) elements. [1, 1] would produce the Fibonacci sequence. */

//P: An array of numbers and a number
//R: An array of numbers

/*
- If n is smaller than or equal to the length of the signature, we're done
- Otherwise, next element is the sum of the previous l elements, where l is the length of the signature
- So, copy signature
- Then while length of that is less than n, keep pushing in the sum of the appropriate slice
*/


function Xbonacci(signature,n){
    if (signature.length >= n) {
        return signature.slice(0, n)
    }
    let sequence = signature.slice()
    const l = signature.length
    while (sequence.length < n) {
        sequence.push(sequence.slice(-l).reduce((a, b) => a + b, 0))
    }
    return sequence
}