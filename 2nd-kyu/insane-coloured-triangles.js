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
/* So, day after.
I'd discovered before I called it a day that the problem with the bigger tests was that the factorials just turn into Infinity, and that's why it becomes NaN.
Bit of experimentation suggests that sequence of sums is symmetric and we'd only have to do it for half the ks if we could extract the extra multiplier somehow, but that doesn't help if factorial(n-1) is Infinity
The first and last one (k = 1 and k = n) always cancel out to 1.
Ok, actually looking at this https://stackoverflow.com/questions/53585022/three-colors-triangles now instead of just the math link ... the top comment seems to be the right answer, but, well, crikey, that's a lot
of code in C (or whatever that is)
Let's see if we can replicate it in JS.
 */
  
function convBase3(n, max, out) {
    let i = 0
    while (i < max && i > 0) {
        out[i] = n % 3
        n /= 3
        i++
    }
    return i
}

// Calculate the binomial coefficient for n < 3

function binomMax2(n, k) {
    if (n < k) {return 0}
    switch (n) {
        case 0:
        case 1:
            return 1
        case 2:
            return k === 1 ? 2 : 1
        // shouldn't happen
        default:
            return 0
    }
}
     
// Lucas's theorem for p = 3

function lucas3(len_n, dig_n, len_k, dig_k) {
    // use modulo product rule:
    // prod[i] % 3 = ((prod[i - 1] % 3) * value[i])      
    let prod = 1;
    for (let i = 0; i < len_n; i++) {
        let n_i = dig_n[i]
        let k_i = i < len_k ? dig_k[i] : 0
    prod = (prod * binomMax2(n_i, k_i)) % 3
    }
    return prod % 3;
}

// Char conversion, I can manage that myself
const intToChar = num => !num ? "R" : num === 1 ? "G" : "B"

const charToInt = str => str === "R" ? 0 : str === "G" ? 1 : 2

// triangle algorithm

function triangle(row) {
    let sum = 0
    const n = row.length

    // calculate digits of n - 1
    const dig_n = new Array(11)
    const len_n = convBase3(n - 1, 11, dig_n)


    for (let k = 0; k < n; k++) {
        // calculate digits of k - 1
        let dig_k = new Array(11)
        let len_k = convBase3(k, 11, dig_k)

        // calculate C(n - 1, k - 1) mod 3
        let cnkMod3 = lucas3(len_n, dig_n, len_k, dig_k)

        // add using the modulo rule
        sum = (sum + cnkMod3 * charToInt(row[k])) % 3
    }

    const sign = (n % 2) * 2 - 1

    const sumMod3 = (3 + (sign * (sum % 3))) % 3
    return intToChar(sumMod3)
}

/* Sadly, that still doesn't work. I'm going to forfeit and check solutions because I need to move on with my life. */
/* I don't understand the solutions, but someone in the comments linked this: https://www.youtube.com/watch?v=9JN5f7_3YmQ
Let's see. */
/* On a triangle of size 10, the two outer corners determine the bottom colour */
/* It's basically Pascal's triangle */
/* 4 is also special. 4 in the first row, 3 colors => 3 ** 4 = 81 triangles. Shortcut works on all of them. */
/* It's 2, 4, 10, 28, 82 -> all a power of 3 + 1 */
/* So you prove that width 4 is special by brute forcing all combos and looking at them (I don't think that's what proof means but ok),
and then all the others are special because they can be broken down into established special ones. */
/* If you colour odd numbers and even numbers in Pascal's triangle, you get that triangle fractal */
/* If  you colour Pascal's triangle based on mod 3, you get the same fractal that you get if you take a giant triangle with the
first row all one colour except one pixel, sort of */
/* Pascal mod 3 rules don't quite match original colour rules (1 & 1 would be 2, not 1) */
/* 2 1 => 0 and 0 0 => 0 already work, but 2 0 and 1 1 need to be 1 rather than 2, and 1 0 and 2 2 need to be 2 rather than 1. 
=> - (a + b) mod 3 rather than (a + b) mod 3 */
/* Ok now comes the actual proof -> abcd => -a-b -b-c -c-d => a + 2b +c  b + 2c + d => -a -3b -3c -d => in mod 3, the 3b and 3c disappear, so -a -d
*/

/* Ok, so the idea is that with a triangle of width (power of 3) + 1, the point is the colour that follows from the two outer corners.
So you have something like (3 ** x + 1) * y - (y - 1) (because 10 is 4 * 3 - 2 because of the overlaps)?
Nah, still don't really get it, but I get the general idea - you'd check if log 3 of row length - 1 is an integer, and if so, you can
just use the outer corners, if not, you break it down into triangles where this does work. */

// And that's how you get something like this. I assume.

function rule(a, b) {
    if (a == b) return a;
    if (a != 'R' && b != 'R') return 'R';
    if (a != 'G' && b != 'G') return 'G';
    if (a != 'B' && b != 'B') return 'B';
  }
  
  function calcWindowSize(row) {
    let size = 1;
    while (size * 3 + 1 < row.length)
      size *= 3;
    return size
  }
  
  function reduce(row, windowSize) {
    return Array(row.length - windowSize).fill()
      .map((_, i) => rule(row[i], row[i + windowSize]));
  }
  
  function triangle(row) {
    return row.length == 1
      ? row[0]
      : triangle(reduce(row, calcWindowSize(row)));
  }

