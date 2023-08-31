/* Given a number, return the word for that number as a string, such as 17 => "seventeen". This should work for all numbers between 0 and 999999. */

//P: A number
//R: A string

/*
- Need to think about how numbers are structured and write a map 
- Am thinking with more than one digit, reverse the number so the digits can be more easily matched to powers of 10
    - e.g. 100, having a 1 at index 0 is useless without an if that checks how long the thing is, but if reversed (turn to string first so leading zeroes don't disappear),
    we could simply say "ok a 1 at index 2 is 1 + 'hundred'"
- Actually this feels oddly familiar
- Yeah, reverse the number and save the digits as values of an object with the properties "ones" (index 0), "tens" (index 1), "hundreds" (index 2) ... and would be good
    to repeat the same process for the thousands digits in a separate object (so we only have to write the logic to recognise "seventeen" etc. once)
- Write maps for ones and tens and another separate one for teens
- Put together
*/


function number2words(n){
    if (!n) {return "zero"}
    const oneWords = {
        1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine"
    }
    const teenWords = {
        10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen",
        19: "nineteen"
    }
    const tenWords = {
        2: "twenty", 3: "thirty", 4: "forty", 5: "fifty", 6: "sixty", 7: "seventy", 8: "eighty", 9: "ninety"
    }
    const C = "hundred"
    const M = "thousand"

    const numToObj = num => {
        let obj = {}
        let numStr = String(num).split('').reverse().join('')
        let digits = ["ones", "tens", "hundreds"]
        digits.forEach((e, i) => {
            if (numStr[i]) {
                obj[e] = Number(numStr[i])
            }
        })
        return obj
    }
    const wordifier = obj => {
        let str = ""
        if (obj["tens"] && obj["tens"] === 1) {
            str += teenWords[String(obj["tens"]) + String(obj["ones"])]
            if (obj["hundreds"]) {
                str = oneWords[obj["hundreds"]] + " hundred " + str
            }
            return str
        }
        if (obj["hundreds"]) {
            str += `${oneWords[obj["hundreds"]]} hundred `
        }
        if (obj["tens"]) {
            str += obj["ones"] ? `${tenWords[obj["tens"]]}-` : `${tenWords[obj["tens"]]} `
        }
        if (obj["ones"]) {
            str += `${oneWords[obj["ones"]]}`
        }
        return str.trim()
    }
    if (n <= 999) {
        return wordifier(numToObj(n))
    }
    let thousands = Math.floor(n / 1000)
    let rest = n % 1000
    return `${wordifier(numToObj(thousands))} thousand ${wordifier(numToObj(rest))}`.trim()
  }