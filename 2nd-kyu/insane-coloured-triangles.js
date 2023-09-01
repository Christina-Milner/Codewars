/* This is the same thing as the 7th kyu kata "coloured triangles", fundamentally - copying problem description from there: */
/*
Given a string consisting of R, G, and B, return the colour that will be at the tip/bottom of a triangle where two adjacent same colours will produce that same colour again, whereas two differing colours
will produce the missing third colour.
Example: 
R R G B R G B B
 R B R G B R B
  G G B R G G
   G R G B G
    B B R R
     B G R
      R B
       G
*/
/* The catch appears to be that the input string can get quite large and this mustn't time out. */

//P: A string
//R: A string

/*
- Step 1 is copying my previous solution and seeing what happens
- It times out from "Medium random test" onwards.
- Hmm. I am not sure that code as it is can be made hugely more efficient. There must be some pattern or logic that avoids having to
actually calculate each row.
- Tempting to use existing code up to a certain input length, otherwise make the answer a coin toss and click attempt until I get lucky NGL
- Ok, it's actually a math problem: https://math.stackexchange.com/questions/2257158/three-color-triangle-challenge
- Got some help on how to read that
- So... I need to, say:
    - Define R, G and B as numbers, say 0, 1 and 2 respectively (and replace the input row elements with them)
    - Then I have -1 to the power of (length - 1) times
    - (n - 1 over k - 1) = (n-1)! / [(k-1)! * (n-k)!], times the element at k. Add all of these up for each value of k from 1 to n
    - This will get me a number result that I then have to convert back into the color I want

*/

let factorials = {0: 1, 1: 1}

const factorial = num => {
    if (num in factorials) {return factorials[num]}
    for (let i = 2; i <= num; i++) {
        factorials[i] = factorials[i - 1] * i
    }
    return factorials[num]
}


function triangle(row) {
    const strToNum = {R: 0, G: 1, B: 2}
    const numToStr = {0: "R", 1: "G", 2: "B"}

    let rowNums = row.split('').map(e => strToNum[e])
    let n = rowNums.length
    let combinatorics = Array.from({ length: n }, (e, i) => i + 1).map(k => factorial(n - 1) / (factorial(k - 1) * factorial(n - k)) * rowNums[k - 1]).reduce((acc, cur) => acc + cur, 0);
    let crazyMath = (-1) ** (n - 1) * combinatorics
    console.log(crazyMath)
    return numToStr[(crazyMath % 3 + 3) % 3]
}

/* Still WIP - works on basic tests, produces NaN on bigger tests. */
/* Frankly, I should have bailed on this as soon as I realised it was actually a math challenge, because I don't understand any of this
and I don't see how it helps my coding at all. */
 
  
   
    
     
      
