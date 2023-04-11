/* Given an integer between 1 and 3999, return its conversion to Roman numerals as a string. */

//P: A number
//R: A string

/*
- I've done Roman numerals on leetcode before, but that was in Python and a while ago, so let's see
- Fundamentally, it's either a while loop or a recursive function grabbing the next highest value in a number to symbol map that can go into the number,
doing an integer division by it, subtracting that from the number value and adding the appropriate number of that symbol to the result string
- I'd solved the problem of 4 being IV, not IIII, by hard-coding the 4 and 9 values into the map last time, let's see if that can be done differently
- Iterate over the string at the end and replace any occurrences of 4 of the same num with num + <next higher num>?
*/

function solution(number){
    const conversion = {
        "M": 1000,
        "CM": 900,
        "D": 500,
        "CD": 400,
        "C": 100,
        "XC": 90,
        "L": 50,
        "XL": 40,
        "X": 10,
        "IX": 9,
        "V": 5,
        "IV": 4,
        "I": 1
    }
    let result = ""
    while (number > 0) {
        for (let letter in conversion) {
            if (conversion[letter] <= number) {
                result = result + letter.repeat(Math.floor(number / conversion[letter]))
                number = number - Math.floor(number / conversion[letter]) * conversion[letter]
                break
            }
        }
    }
    return result
  }

/* Nope, had to give up on not hardcoding the 90/40 values. Most of the other solutions did the same thing, but here's an interesting one that didn't. Replacing them out after the
fact wasn't going to work because of how IIII -> IV, but VIIII -> IX works. */

function solution(number){
    const thousands = Math.floor(number / 1000)
    const hundreds = Math.floor(number / 100) % 10
    const tens = Math.floor(number / 10) % 10
    const ones = number % 10

    return (
        'M'.repeat(thousands) +
        romanizeDigit(hundreds, 'C', 'D', 'M') +
        romanizeDigit(tens, 'X', 'L', 'C') +
        romanizeDigit(ones, 'I', 'V', 'X')
    )
}

function romanizeDigit(digit, one, five, ten) {
    if (digit < 4) {
        return one.repeat(digit)
    } else if (digit < 5) {
        return one + five
    } else if (digit < 9) {
        return five + one.repeat(digit - 5)
    } else {
        return one + ten
    }
}