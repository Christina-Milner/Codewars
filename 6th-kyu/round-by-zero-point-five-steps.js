/* Given a number, round it to the next .5, so 4.2 = 4 and 4.3 = 4.5. Numbers of .25 that are exactly halfway should be rounded up. */

//P: A number
//R: A number

/* 
- Remembering the kata where we had to replicate Math.round() methods, careful with negative numbers here
- Take absolute value of number modulo 1, as well as absolute value of integer division of number by 1
- Smaller than 0.25: Number stays the same. Greater than or equal to 0.75: Number + 1. Anything else: Number + 0.5
- Stick sign back on if number was negative to begin with
- This is assuming -4.75 is intended to be rounded to -5 rather than -4.5 - instructions aren't terribly clear on that and there's no sample tests
for negatives. If -4.75 is intended to be rounded up to -4.5, can skip a bunch of the extra steps in between.
*/

function solution(n){
    const int = Math.floor(Math.abs(n))
    const remainder = Math.abs(n % 1)
    if (!remainder) {
        return n
    }
    let result = remainder < 0.25 ? int : remainder >= 0.75 ? int + 1 : int + 0.5
    return n < 0 ? -result : result
  }

/* I'd assumed correctly and this works, but apparently Math.round(n * 2) / 2 would've done the trick in a much simpler fashion. */