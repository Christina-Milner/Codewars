/* Given two numbers a and b as strings (as they can be too large for JS to handle), return the last digit of a ** b. 0 to the power of 0 is 1 for the sake of this. Input is always valid. */

//P: Two strings (of digits)
//R: A number

/*
- My best idea to actually calculate this would be to use the solution for adding big numbers as strings and then looping that to emulate multiplication. But, uh, maybe let's not.
- Am currently checking to see if there are repeating patterns in the powers of numbers:
    - 2 seems to loop through 2, 4, 8, 6 as the last digit (ignoring 2 ** 0 = 1)
    - 3 loops through 1, 3, 9, 7 (not ignoring 3 ** 0)
    - 4 alternates between 4 and 6 (ignoring 4 ** 0)
    - 5 always ends in 5
    - 6 always ends in 6
    - 7 loops through 1, 7, 9, 3 (not ignoring 7 ** 0)
    - 8 loops through 8, 4, 2, 6 (ignoring 8 ** 0)
    - 9 alternates between 1 and 9 (not ignoring 9 ** 0)      
    - 10 obviously always ends in 0
    - 11 ends in 1 up to (and including) power of 15, then 2 x 0, then 8s
    - 12 repeats the 2 pattern (ignoring 12 **0)
    - 13 repeats the 3 pattern up to (including) power of 15, then 0 4 2 4 0 2
    - 14 repeats the 4 pattern, ignoring 14 ** 0, up to power of 19, where  it's 2, and then 0
    - 15 always ends in 5 up to power of 13, then 4 2 0 2 8 0 6
    - 16 always ends in 6
    - 17 repeats the 7 pattern up to 12, then 6, 8, 8, 2, 2, 0, 6, 0
    - 18 repeats the 8 pattern up to 16, then 6 4 0 8
    - 19 repeats the 9 pattern up to 12, then 6, 6, 2, 2, 8, 0, 2, 6 
    - 20 is all zeroes
- WHAT DOES THIS MEAN
- It *seems* like there is a pattern based on the last digit, but that just kind of breaks once a certain size is reached?? (I did use BigInt to get those lists of powers)
- OK googling some of those higher exponents I suspect the pattern actually holds and JS is just too dumb to handle these numbers. So!
- If b is 0 => 1
- If b is 1 -> last digit of a
- If a is 1 -> 1
- If a is 0 and b is anything other than 0 => 0
- If last digit of a is 0, 1, 5 or 6 => last digit of a
- If last digit is 3 => element at index b % 4 in [1, 3, 9, 7]
- Same for 7 and [1, 7, 9, 3]
- If last digit is 2 => element at index (b - 1) % 4 in [2, 4, 8, 6]
- Same for 8 and [8, 4, 2, 6]
- Should then work analogously for 4: (b - 1) % 2 in [4, 6]
- Analogously for 9: b % 2 in [1, 9]
*/

function lastDigit(str1, str2) {  
    if (Number(str2) === 0) {return 1}
    if (Number(str2) === 1) {return Number(str1.substr(-1))}
    if (Number(str1) === 1) {return 1}
    if (Number(str1) === 0) {return 0}

    const lastDigit = str1.substr(-1)
    let options
    switch (lastDigit) {
        case "2":
            options = [2, 4, 8, 6]
            return options[(Number(str2.substr(-2)) - 1) % 4]
        case "3":
            options = [1, 3, 9, 7]
            return options[Number(str2.substr(-2)) % 4]
        case "4":
            options = [4, 6]
            return options[(Number(str2.substr(-2)) - 1) % 2]
        case "7":
            options = [1, 7, 9, 3]
            return options[Number(str2.substr(-2)) % 4]
        case "8":
            options = [8, 4, 2, 6]
            return options[(Number(str2.substr(-2)) - 1) % 4]
        case "9":
            options = [1, 9]
            return options[Number(str2.substr(-2)) % 2]
        default:
            return Number(lastDigit)
    }
}

/* I was on the right track, just hadn't taken into account that b would be large enough that the modulo would become inaccurate.
   Assumed just based on the test I was seeing that I actually only needed the last 2 digits, and turned out to be correct. */