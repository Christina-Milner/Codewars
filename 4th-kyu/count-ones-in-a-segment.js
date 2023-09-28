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

        function countOnes(left, right) {
    for (let i = 0; i <= 10; i++) {
        let power = 2 ** i
        let next = 2 ** (i + 1)
        let bins = []
        for (let i = power; i < next; i++) {
            bins.push(i.toString(2))
        }
        console.log("From: ", power, "To: ", next, (next - power) + (next - power) * (i / 2), bins.reduce((acc, cur) => acc + cur.split('').filter(e => e == 1).length, 0))
    }
}
- At lower numbers, easy to actually count the ones by doing array reduce. Can confirm that (nextPow - currentPow) + (nextPow - currentPow) * (pow/ 2) gives accurate results for
    currentPow = 2 ** x, nextPow = 2 ** (x + 1), and pow = x
- So take log 2 of left and right
- Iterate over powers of 2 between them (log rounded up for lower bound and down for upper bound) and apply the above formula
- Use the reduce method to get the ones from lower bound to next power and from last power to upper bound

*/


 function countOnes(left, right) {
  
 }