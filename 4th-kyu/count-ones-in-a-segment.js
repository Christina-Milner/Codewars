/* Given a lower and upper number bound, return how many ones the binary representations of those two numbers and all the ones in between contain.
 4 and 7 should return 8 because it's 4/100 - 5/101 - 6/110 - 7/111, so total of 8 1s. 
 Upper bound can go into the billions, so iterating over all the values is a non-starter. */

 //P: Two numbers
 //R: A number


/*
- I will probably regret engaging with this one, but I'm curious how you would do it now
- So, a power of 2 in binary is 1 + 1 less 0 as the power (16 = 2^5 = 10000)
- The numbers between it and the next power of 2 (which adds a digit) are all permutations of the last digits, from all 0s to all 1s
- So I feel like in that span from one power inclusively to the next exclusively, there's:
    - Higher power - lower power 1s (the first digit is always one)
    - Remaining digits are half ones on average?
        - Yeah that checks out, the 4-digit binary numbers come up to 12 1s ignoring the first digit, so 3 / 2 * 8 (the number of them)

- At lower numbers, easy to actually count the ones by doing array reduce. Can confirm that (nextPow - currentPow) + (nextPow - currentPow) * (pow/ 2) gives accurate results for
    currentPow = 2 ** x, nextPow = 2 ** (x + 1), and pow = x
- So take log 2 of left and right
- Iterate over powers of 2 between them (log rounded up for lower bound and down for upper bound) and apply the above formula
- Use the reduce method to get the ones from lower bound to next power and from last power to upper bound

*/


function countOnes(left, right) {
    const lower = Math.ceil(Math.log2(left))
    const upper = Math.floor(Math.log2(right))
    let result = 0
    if (upper > lower) {
        for (let i = lower; i < upper; i++) {
            let span = 2 ** (i + 1) - 2 ** i
            result += span + span * (i / 2)
        }
        let missing = []
        for (let i = left; i < 2 ** lower; i++) {
            missing.push(i.toString(2))
        }
        for (let i = 2 ** upper; i <= right; i++) {
            missing.push(i.toString(2))
        }
        result += missing.reduce((acc, cur) => acc + cur.split('').filter(e => e == 1).length, 0)
        return result
    }
    let missing = []
    for (let i = left; i <= right; i++) {
        missing.push(i.toString(2))
    }
    return missing.reduce((acc, cur) => acc + cur.split('').filter(e => e == 1).length, 0)
}

/* Problem is the log2 of left and right is very often only apart by something like 0.3, making most of my thought process moot.
    Code as it was *sometimes* produced erroneous results and then timed out.
    With the added if block so it just straight up does iteration if there's no powers of 2 to skip through, it doesn't seem to be
    producing any incorrect results, but of course it times out before even getting to the huge tests. 
    Hmm.
    Left: 878603, right: 955274
    Result is 843350
    Left in binary is  11010110100000001011
    Right in binary is 11101001001110001010
    The difference between the two is 76671, which is 10010101101111111 in binary
    The actual number we're looking for is 11001101111001010110 in binary
    11010110100000001011 (9 1s)
    11101001001110001010  (10 1s)

    */