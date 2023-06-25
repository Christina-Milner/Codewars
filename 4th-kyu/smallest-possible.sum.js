/* Given an array of numbers, imagine that as long as there's a number in there that is bigger than another, you subtract the smaller one from the bigger one
and keep doing this until no longer possible. Return the sum of the array once in that state. Performance will be an issue. */

//P: An array of numbers
//R: A number

/*
- So, any attempt at actually doing what the description suggests (doing the subtraction operations until no longer possible) isn't going to fly performance-wise
- I've played around a bit with the tests and come to the conclusion that the number the array will converge on (i.e. this multiplied by array length is the result) is the lowest
    number in the array if all others are divisible by it, otherwise 1
    - Examples: [1, 21, 55] expects 3 (converges on 1)
    - [3, 13, 23, 7, 83] expects 5 (converges on 1)
    - [4, 16, 24] expects 12 (converges on 4)
- Hmm, except this one: [30, 12] expects 12  - converges on 6, not 12. So, lowest number in the array unless that then also shares a divisor with the others.
- But a "lowest common denominator" approach would expect this to converge on 3. But, 30 isn't actually divisible by 12. 6 is the modulo of that division, as well 
    as the highest common denominator.
- But regardless of which of those two ends up being the relevant one, how to do this in not-quadratic time? Can I get away with sorting it once and then iterating over it?
- Would work like this:
    - Sort it by ascending
    - Iterate over it, checking for each element if divisible by the lowest
    - If none encountered that aren't, return lowest
    - If an element isn't, check for greatest common denominator
        - If not found, return 1
        - Otherwise continue iteration with that being the number to check for

*/




function solution(numbers) {
    /*  The array will converge on its lowest element if all others are divisible by it, otherwise on the greatest common denominator,
        and on 1 if one doesn't exist. Multiplying this by the array length gives you the result.
        Sorting the array once means we don't have to keep checking elements against all the others. */    
    const sorted = numbers.slice().sort()
    let minToCheck = sorted[0]

    /*  We can find the greatest common denominator without iterating out the wazoo by checking if both numbers are divisible by the
        modulo of their division, and if not, repeating the process with the modulo of the smaller number and the modulo
        Abort this process once the modulo becomes bigger than the remaining number */
    const findDenominator = (num1, num2) => {
        let candidate = num1 % num2
        if (num1 % candidate === 0 && num2 % candidate === 0) {
            return candidate
        }
        if (candidate > num2) {
            return 0
        }
        return findDenominator(num2, candidate)
    }

    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] % minToCheck === 0) {
            continue
        }
        if (findDenominator(sorted[i], minToCheck)) {
            minToCheck = findDenominator(sorted[i], minToCheck)
            continue
        }
        // If this fires, we've found a number that isn't divisible by the lowest number in the array and shares no denominators with it,
        // so it will converge on 1
        return numbers.length
    }
    return numbers.length * minToCheck
}

/* Yay, it works, and it just eked through on performance! Adding comments to the code as I don't include my PREP in the post to Codewars but want to share the thought process. */
/* Ok, looking at other solutions, I slightly overcomplicated this - "find the greatest common denominator" would have encompassed all the scenarios. And apparently the whole
modulo thing to find said denominator is common knowledge (I had to discover this by playing around with a few theoretical scenarios). It would've only needed this: */

const gcd = (a, b) =>
  b ? gcd(b, a % b) : a;

const solution = numbers =>
  numbers.length * numbers.reduce(gcd);