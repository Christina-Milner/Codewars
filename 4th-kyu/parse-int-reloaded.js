/* Write a function that can convert a number written as a string into the corresponding integer, such as "two hundred forty-six" => 246. The function must be able
to handle zero to one million, all strings passed in will be valid numbers, and the word "and" (as in "one hundred and twenty-four") will sometimes be present and
sometimes not. */

//P: A string
//R: A number

/*
- Will be some variant of mapping the various  number words to digits as a string and then converting to number at the end
- Check leftmost word first to see how long the number will be, but if leftmost word is a 1-10 number (like in "one hundred"), both words need to be considered
    - This will allow correct placement of zeroes
- Filter out any "and" to begin with, they don't add any information
- Put number words into arrays or maybe an object designating what digit they represent
*/


function parseInt(string) {
    let cleanStrArr = string.replace(/-/g, " ").split(' ').filter(e => e !== "and")
    if (string === "zero") {
        return 0
    }
    const words = {
        "million": 7,
        "thousand": 4,
        "hundred": 3,
    }
    const tens = {
        "ninety": 9,
        "eighty": 8,
        "seventy": 7,
        "sixty": 6,
        "fifty": 5,
        "forty": 4,
        "thirty": 3,
        "twenty": 2,
        "ten": 1
    }

    const teens = {
        "nineteen": 19,
        "eighteen": 18,
        "seventeen": 17,
        "sixteen": 16,
        "fifteen": 15,
        "fourteen": 14,
        "thirteen": 13,
        "twelve": 12,
        "eleven": 11
    }

    const ones = {
        "nine": 9,
        "eight": 8,
        "seven": 7,
        "six": 6,
        "five": 5,
        "four": 4,
        "three": 3,
        "two": 2,
        "one": 1
    }
    let number = {
        "millions": 0,
        "hundred thousands": 0,
        "ten thousands": 0,
        "thousands": 0,
        "hundreds": 0,
        "tens": 0,
        "ones": 0
    }
    let rounds = 0
    let loops = 0
    while (cleanStrArr.length) {
        let next = cleanStrArr.pop()
        // Last two digits
        if (!rounds) {
            if (next in teens) {
                number["tens"] = 1
                number["ones"] = Number(String(teens[next])[1])
                rounds++
            }
            else if (next in ones) {
                number["ones"] = ones[next]
                if (cleanStrArr[cleanStrArr.length - 1] in tens) {
                    let getTens = cleanStrArr.pop()
                    number["tens"] = tens[getTens]
                }
                rounds++
            }
            else if (next in tens) {
                number["tens"] = tens[next]
                rounds++
            }
            else {
                cleanStrArr.push(next) // Not ones or tens at the end, not dealing with it here
                rounds++
            }
            continue
        }
        // Hundreds
        if (rounds == 1) {
            if (next == "hundred") {
                let amount = cleanStrArr.pop()
                number["hundreds"] = ones[amount]
            }
            else {
                cleanStrArr.push(next)
            }
            rounds++
            continue
        }
        // Thousands
        if (rounds == 2) {
            if (next == "thousand") {
                let amount = cleanStrArr.pop()
                if (amount in ones) {
                    number["thousands"] = ones[amount]
                    if (cleanStrArr[cleanStrArr.length - 1] in tens) {
                        let nextDigit = cleanStrArr.pop()
                        number["ten thousands"] = tens[nextDigit]
                    }
                }
                else if (amount in tens) {
                    number["ten thousands"] = tens[amount]
                }
            }
            else {
                cleanStrArr.push(next)
            }
            rounds++    // Deal with hundreds of thousands next
            continue
        }
        loops++
        if (loops > 5) {break}
    }
    return Number(Object.values(number).join(''))
  }