/* Given an integer n, find the length of the smallest list of perfect squares that add up to n. Performance is going to be an issue.

Examples:
17 => 2 (16 + 1)
15 => 4 (9 + 4 + 1 + 1)
16 => 1 (16 is a perfect square)
*/

//P: A number
//R: A number


/*
- I may be wrong, but from the examples ... the square root of 17 is 4 point something, and the square root of 15 is 3 point something. Rounding these down
    to integer and then squaring them gives the first number in the sequence.
- Obviously, if the square root and its rounded down value are equal, we have a perfect square and can stop
- Wait. Is this just a recursive function where you subtract the square of the square root rounded down and keep going until what remains is
     a perfect square? Let's find out.
- No, it is not - in the case of e.g. 18, starting at 16 yields 3, but we can use 9 + 9 instead. Hm, how to account for that?
- Is it as simple as checking, hey, is half of this a perfect square by any chance?
*/

function sumOfSquares(n) {
    console.log(n)
    return Math.min(sumHelper1(n), sumHelper2(n));
}

function sumHelper1(n, acc = 1) {
    console.log("helper1", n, acc)
    let roundedSquare = Math.floor(Math.sqrt(n)) ** 2;
    if (roundedSquare == n) {
        return acc
    }
    return sumHelper1(n - roundedSquare, acc + 1);
}

function sumHelper2(n, acc = 1) {
    console.log("helper2", n, acc)
    let lowerSquare = (Math.floor(Math.sqrt(n)) - 1) ** 2;
    if (n % lowerSquare == 0) {
        return n / lowerSquare;
    }
    if ((n - 1) % lowerSquare == 0) {
       return Math.floor(n / lowerSquare) + 1;
    }
    return sumHelper2(n - lowerSquare, acc + 1);
}

/* ^as far as I got, passes fixeds but fails various bigger tests. Going to forfeit and have a look at solutions as I don't have hours to spend on katas.
Here is the most legible of the existing solutions: */

function isSquare(n) {
    const _sqrt = parseInt(Math.sqrt(n));
    return _sqrt * _sqrt === n;
  }
  
  function sumOfSquares(n) {
    // If n is a perfect square, return 1.
    if (isSquare(n)) {
      return 1;
    }
  
    // The result is 4 if n can be written in the
    // form of 4^k*(8*m + 7).
    while (n % 4 === 0) {
      n = n / 4;
    }
    if (n % 8 === 7) {
      return 4;
    }
  
    // Check whether 2 is the result.
    const _sqrt = parseInt(Math.sqrt(n));
    for (let i = 1; i <= _sqrt; i++) {
      if (isSquare(n - i * i)) {
        return 2;
      }
    }
  
    return 3;
  }

/* Solution is based on mathematical rules I didn't know. Huh. This also means this number never gets bigger than 4? Wild. */

