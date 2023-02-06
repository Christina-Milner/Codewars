/* Given this sequence: 
f(0) = 0
f(1) = 1
f(2) = 1
f(3) = 2
f(4) = 4;
f(n) = f(n-1) + f(n-2) + f(n-3) + f(n-4) + f(n-5)

And a number n, return how many odd numbers there are in the sequence of f(0) to f(n) (only counting the 1 once).
Keep performance in mind.
 */

//P: A number
//R: A number

/* 
I'm thinking a recursive function not too different from fibonacci, but initialise a Map outside the function so it doesn't have to keep calculating
the same values. 
That won't work, though, as Map objects order stuff by order of insertion.
Actually, no, I'd misinterpreted - I assumed that f(n-1) ... f(n-5) part was a roundabout way of saying "all the elements up to n", but it's only the last 5, 
hence "Penta".
I am thinking make an array of the numbers up to 1, map the first 4 elements to the first 4 listed above and everything else to the sum of the previous five, 
but not sure of the performance on that. Have to see it work first.
Nope, dumb idea, as the "arr" in map is the old one, not the one we're currently building, it doesn't work like that.*/

function countOddPentaFib(n) {
    let pentaFibArr = [0, 1, 1, 2, 4]
    for (let i = 5; i <= n; i++) {
        let numStr = String(pentaFibArr[i - 1] + pentaFibArr[i - 2] + pentaFibArr[i - 3] + pentaFibArr[i - 4] + pentaFibArr[i - 5])
        pentaFibArr.push(Number(numStr[numStr.length - 1]))
    }
    return n > 1 ? pentaFibArr.filter(e => e % 2 !== 0).length - 1 : pentaFibArr.filter(e => e % 2 !== 0).length
}

/* This was a good lesson in not seeing "-acci" and immediately going "ah yes fibonacci recursive function" but thinking about what was actually required.
Initially, it passed the test for n = 45 and failed all the others, which was a proper head-scratcher until I realised it was literally returning the same
number for all the bigger ones, making it highly likely it was something about handling the large numbers involved that had broken it. */
