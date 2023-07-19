/* Assume (1 / n!) * (1! + 2! + ... + n!)
Does that value head towards zero because of the 1/n!, or towards infinity because of the sum of factorials?
Return the result of this expression for the given n, truncated to 6 decimal places. */

//P: A number
//R: A number

/*
- Need to handle big numbers and factorials get out of control, so simply calculating the expression is a non-starter
- This is one of those things that's going to be more of a math solution than a coding one
- So, AFAIK, multiplying everything in that second bracket by 1 / n! is the same as dividing each item in that bracket by n!
- And 1 / 5 + 2 / 5 + 3 / 5 + 4 / 5 + 5 / 5 is (1 + 2 + 3 + 4 + 5) / 5
- Wild take: this is going to converge on 1, as n! / n1 is 1 and everything that gets added to it gets progressively smaller
- Hmm. 5! / 10! is just 1 / (6 * 7 * 8 * 9 * 10), right? The in common ones cancel each other out?
- (n - 1)! / n! should then be 1 / n? Yes.
- So we have 1 + 1 / n + 1 / (n - 1) * n + 1 / (n - 2) * ( n - 1) * n + ... + 1 / n!
- That still smells like a nested for loop which isn't going to be good enough
- Although, with the factorial values memoized it might work?
*/

let memo = {0: 1}

function factHelper(num) {
    if (num in memo) {
        return memo[num]
    }
    const recursiveFinder = (start = 1, acc = 1) => {
        if (!(start in memo)) {
            memo[start] = acc * start
        }
        if (start === num) {
            return acc * num
        }
        return recursiveFinder(start + 1, acc * start)
    }
    return recursiveFinder()
}

function going(n) {
    if (n > 170) {n = 170}
    let result = 1
    let factorial = factHelper(n)
    for (let i = 1; i < n; i++) {
        result += memo[i] / memo[n]
        
    }
    return String(result).length > 6 ? Number(String(result).slice(0, 8)) : result
}

/* Forfeiting this as I can't figure out how to get around the issue of the factorial being Infinity at 171 and higher and I'm now too tired to figure out math.
I have done a kata about accurately getting large factorials, but that was based on getting the result as a string. I don't see how that would help. 
I suppose I could add a division operation working the same way to it, but I am willing to bet there is a way simpler way to do this that I am missing so 
I don't feel like coding all of that out. */
/* Yep, sure glad I didn't do all of that. This was how to do this: */

function going(n) {
    let result = 1, a = 1;
  
    while (n > 1) {
      a *= 1 / n;
      result += a;
      n--;
    }
  
    return Math.floor(result * 1e6) / 1e6;
  }

