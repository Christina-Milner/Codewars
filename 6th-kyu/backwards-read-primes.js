/* Given the inclusive boundaries num1 and num2, return all numbers between num1 and num2 that are primes and are still primes if you read them backwards. */

//P: Two numbers
//R: An array of numbers

/*
- Update the helper I usually use to check for a number being prime (iterate up to square root, check if cleanly divisible) to also check the reverse of the number
- Iterate over the range from num1 to num2 or filter it

*/



function backwardsPrime(start, stop){
    const primeBothWays = num => {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false
            }
        }
        const backwards = Number(String(num).split('').reverse().join(''))
        if (backwards === num) {return false}
        for (let i = 2; i <= Math.sqrt(backwards); i++) {
            if (backwards % i === 0) {
                return false
            }
        }
        return true
    }
    let range = Array.from({length: stop + 1 - start}, (_, i) => i + start)
    return range.filter(num => primeBothWays(num))
  }