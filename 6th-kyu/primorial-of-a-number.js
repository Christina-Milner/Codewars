/* This is like factorial, but only prime numbers get multiplied. So primorial(3) is 30 because 2 * 3 * 5. */

//P: A positive integer
//R: A positive integer

/* Factorial works with a recursive function where you return the accumulator on n = 1, then recursively call the function on n - 1, acc * n.
That won't work here as we don't want to actually multiply by the n that's passed in.

- Initialise array with 1 in it
- While array has fewer than n elements:
    - Iterate from 1 upwards
    - Check if isPrime (write helper for this)
    - If not, continue
    - If yes, push into array
- Return array reduced to the product of its elements
*/

function numPrimorial(n) {
    const isPrime = num => {
      if (num == 1) {return true}
      for (let i = 2; i < num; i++) {
          if (num % i == 0) {return false}
      }
      return true
    }
  
    let result = []
    let i = 1
    while (result.length < n) {
        i++
        if (isPrime(i)) {result.push(i)}    
    }
    return result.reduce((a, b) => a * b, 1)
}

/* Had to initialise the array empty rather than with 1 in it or the count was off, but should've figured that from the example.
In the process I learned that function declarations only get hoisted if you use the function keyword. Which makes sense, declaring it
as a const makes it like any other variable, but I'd never thought about it before. */