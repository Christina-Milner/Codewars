/* A number is a k-prime if it has k prime factors (2 * 2 counting as 2), so prime numbers are 1-primes.
    Write a function countKprimes() that takes in k, start, and end, and returns an array of numbers between start and end inclusively and are k-primes.
    Write a function puzzle() that takes in n and returns how many solutions there are to a + b + c = num, where a is a 1-prime, b is a 3-prime and c is a 7-prime.
*/

//P: countKprimes: 3 numbers, puzzle: a number
//R: countKprimes: an array of numbers, puzzle: a number


/*
- Prime factorisation: basically same as checking for prime number (iterate up to sqrt and check if divisible), except when you find a divisor, you divide by it and recursively repeat
    until you do have a prime
- So the "k" would be an accumulator starting out as 1 (primes are 1-primes, not 0-primes) and then incremented on every round of division
- So, for countKprimes: filter array of numbers from start to end by the k-prime helper returning the right thing
- Don't put this helper inside the function as puzzle will need it too

- might be a good idea to also stick a memo in the global space and save the number of prime factors stuff has there
- For puzzle, probably best to first check if there's any 7-primes lower than the number given, and then work from there


*/

let memo = {}

function findDecomp(num) {
    if (num in memo) {return memo[num]}
    return primeDecomp(num)
}

function primeDecomp(num, k = 1, originalNum = num) {
    let divisor
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            divisor = i
            break
        }
    }
    if (divisor) {
        return primeDecomp(num / divisor, k + 1, originalNum)
    }
    memo[originalNum] = k
    return k
}


function countKprimes(k, start, end) {
    return Array.from({length: end + 1 - start}, (_, i) => start + i).filter(num => findDecomp(num) === k)
}
function puzzle(s) {
    let result = 0
    let sevens = countKprimes(7, 128, s)
    for (let number of sevens) {
        let threes = countKprimes(3, 8, s)
        for (let number2 of threes) {
            let ones = countKprimes(1, 2, s)
            for (let number3 of ones) {
                if (number + number2 + number3 === s) {
                    result++
                }
            }
        }
    }
    return result
}