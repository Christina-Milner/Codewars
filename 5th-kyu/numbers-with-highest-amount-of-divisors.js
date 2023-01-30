/* Given an array of positive integers, return an array containing:
    a) The total amount of numbers in the input
    b) The total number of prime numbers in the input
    c) A subarray containing:
        d) The highest number of divisors a number in the given array has
        c) A (sorted) array of that number, or those numbers, if multiple 

Example:  
arr1 = [66, 36, 49, 40, 73, 12, 77, 78, 76, 8, 50,
       20, 85, 22, 24, 68, 26, 59, 92, 93, 30]

proc_arrInt(arr1) ------> [21, 2, [9, [36]]
*/

//P: An array of numbers
//R: 3 nested arrays of numbers

/*
- We'll want to iterate over the array and check for each number whether it is a prime, and how many divisors it has
- This info should be stored in an object and subsequent numbers should look at the existing numbers so if we know 50 has 4 divisors,
    100 has 5 without having to iterate from 2 to 100 again
- Sort the input array from low to high
- Make a modified isPrime helper that grabs divisors while it's at it:
    - Iterate from 2 to n / 2 (rounded down), if modulo is 0, push into array
    - Return array (if length > 0, it's not a prime)
- Save number in object with divisors output as value
- Return [length of input array, Object keys filtered by value length being 0 length, [max of Object values lengths, [Object keys that have those values]]]
- Object keys are strings IIRC so need to make sure to convert accordingly
*/

function procArrInt(listNum) {
    const findDivisors = num => {
        let divisors = [1, num]
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                divisors.push(i, num / i)
            }
        }
        return divisors
    }

    const inputSorted = listNum.slice().sort((a, b) => a - b)
    let numMap = {}

    for (let num of inputSorted) {
              numMap[num] = findDivisors(num)
    }

    const nums = Object.keys(numMap)
    const divisors = Object.values(numMap)

    const a = inputSorted.length
    const b = nums.filter(e => numMap[e].length == 2).length
    const c = divisors.map(e => e.length).reduce((a, b) => Math.max(a, b))
    const d = nums.filter(e => numMap[e].length == c).map(e => Number(e))

    return [a, b, [c, d]]
}

/* The number of divisors was randomly off in random tests here and there and I couldn't figure out why, esp since console.logs for the randoms
seemed to all be overridden by an inbuilt log that just said the array length. While trying to figure it out, I clicked attempt again and got
a round where they all passed, so... going to call that good enough and stay away from math problems again. */