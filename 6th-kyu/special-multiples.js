/* Given two numbers num1 and num2, return the number of numbers up to num2 that are divisible by the first num1 primes. */

//P: Two numbers
//R: a number

/* First we yoink a list of prime numbers off Wikipedia or something; too bad this doesn't say how big any of the numbers can get. 
We slice the first num1 elements off that list and then iterate (going from the highest number in that sublist up to num2 in steps of that number),
checking if each number is divisible by all of them.
Orrr we just create an array of all those numbers, then filter by divisibility and return the length. */

/*
function countSpecMult(n, mxval) {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].slice(0, n)
    return Array(mxval - primes.slice(-1) + 1)
      .fill(primes.slice(-1)[0])
      .map((e, i) => e + i)
      .filter(e => {
        for (let num of primes) {
          if (e % num !== 0) {return false}
        }
        return true
    }).length
}

This works, but it's too slow as there's a [4, 100000000] test where it times out.
Okay, duh. Got my numbers brain working for once - we can just multiply all the primes with each other and then integer divide mxval by that. */

function countSpecMult(n, mxval) {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,].slice(0, n)
    const product = primes.reduce((a, b) => a * b, 1)
    return Math.floor(mxval / product)
}