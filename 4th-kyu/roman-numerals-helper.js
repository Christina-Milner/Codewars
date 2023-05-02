/* Complete the class RomanNumerals with the static methods toRoman and fromRoman that take in a number and a string respectively and turn them into the Roman numeral
representation of that number/the number represented by the Roman numeral. */

//P: A number (toRoman), a string (fromRoman)
//R: A string (toRoman), a number (fromRoman)

/*
- I've done both of these problems individually before, this shouldn't be a big deal
- Initialise an object that maps the strings to numbers (including the 4 and 9 values to avoid shenanigans with IIII vs IV and the like)
- toRoman is a recursive function:
    - Finds biggest number from the map that's contained in the current number
    - Pushes the appropriate string into the result n times, where n is the result of integer division of the original number by that number
    - Recursively calls itself on the modulo and terminates once reaching 0
- fromRoman does the same thing in reverse, probably won't have a choice but to make a new object with the mapping reversed (being mindful of the fact
    object keys are strings)
*/

class RomanNumerals {
    static mapNumToLetters = {
        1000: "M",
        900: "CM",
        500: "D",
        400: "CD",
        100: "C",
        90: "XC",
        50: "L",
        40: "XL",
        10: "X",
        9: "IX",
        5: "V",
        4: "IV",
        1: "I"
    }
    static toRoman(num, acc = "") {
        if (!num) {
            return acc
        }
        let map = Object.keys(RomanNumerals.mapNumToLetters).map(e => Number(e))
        map.sort((a, b) => b - a)
        for (let value of map) {
            if (value <= num) {
                let multiplier = Math.floor(num / value)
                let rest = num - multiplier * value
                acc += this.mapNumToLetters[String(value)].repeat(multiplier)
                return RomanNumerals.toRoman(rest, acc)
            }
        }
    }
  
    static fromRoman(str, acc = 0) {
        if (!str) {
            return acc
        }
        let reverseMap = {}
        for (let num of Object.keys(RomanNumerals.mapNumToLetters)) {
            reverseMap[RomanNumerals.mapNumToLetters[num]] = Number(num)
        }
        let romanDigit = ""
        if (str.slice(0, 2) in reverseMap) {
            romanDigit = str.slice(0, 2)
            str = str.slice(2)
        } else {
            romanDigit = str.slice(0, 1)
            str = str.slice(1)
        }
        acc += reverseMap[romanDigit]
        return RomanNumerals.fromRoman(str, acc)
    }
 }
