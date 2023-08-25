/* Given a number N, return the sum of all digits of all numbers from 1 to N, inclusively. */

//P: A number
//R: A number

/*
- Ok, the obvious (to me) would be:
    - Make array of numbers from 1 to N
    - Smoosh together as string
    - Split and sum up components
- But this is one of the things where I'm immediately sus there's probably a math hack to make it more efficient
- Two-digit numbers are 45 (sum of 1 to 9) * (tens digit) + (range of 1 to tens digit - 1) * 10 (each) + ones digit. If I'm not mistaken.
- Like 24 should be 2 * 45 + 10 + 4. 
- But it's 120. Oh. I forgot the tens digit of the incomplete tens range, which is ones digit + 1 * tens digit. And rather than adding the ones digit,
    you'd have to sum the range from 1 to it. Now it adds up!
- If there's a hundreds digit, you have (hundreds digit + 1) * 10 * 45 + (hundreds digit + 1) + ...

... I don't think this is actually going to be more efficient in any way. Original idea it is.
*/



function twistedSum(n) {
    return Array.from({length: n}, (_, i) => i + 1).join('').split('').reduce((acc, cur) => acc + Number(cur), 0)
  }