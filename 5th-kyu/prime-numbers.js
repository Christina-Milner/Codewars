/* Write a function isPrime that takes a number and returns a boolean indicating whether or not it is a prime number.
Also write a function getPrimes() that takes in a start and finish and returns a sorted array of all primes in that range (inclusively).
Start and end may be input the wrong way around just because. */

//P: A number / Two numbers
//R: A boolean / An array of numbers

/*
- Cheating a little as I have written an isPrime helper for more interesting problems dozens of times but a) a kata is a kata and b) not my fault the difficulty on these is all over the place
- So, isPrime iterates up to the square root of a number and returns false if it finds something it is cleanly divisible by, otherwise true
- For getPrimes, have to use Math.max or min to find which way around the start and finish numbers actually are (which means we're also renaming the parameters)
    - Then create the array of length end - start + 1, elements are index + start, and filter it by isPrime


*/

function isPrime(number) {
    if (number == 0 || Math.abs(number) == 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
  }
  
  function getPrimes(num1, num2) {
    const [start, finish] = [Math.min(num1, num2), Math.max(num1, num2)];
    return Array.from({length: finish + 1 - start}, (_, i) => i + start).filter(num => isPrime(num));
  }