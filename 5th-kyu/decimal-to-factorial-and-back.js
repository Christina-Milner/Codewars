/* Assume a system of writing out numbers in a base system depending on factorials, such that: 
463 = 341010 because 463 = 3×5! + 4×4! + 1×3! + 0×2! + 1×1! + 0×0!
To extend the range of numbers that can be encoded like this past 10!-1, the letters A-Z are used as well.
Write two functions, one that converts a decimal number into a factorial based one, and one that does the reverse. */

/*
P: Decimal to factorial: A number
    Factorial to decimal: A string
R: Decimal to factorial: A string
    Factorial to decimal: A number
*/

/*
- Decimal to Factorial:
    - Have to find the largest factorial that will fit in the number, somehow
    - Write a helper that does the factorials. Maybe keep the memo outside in a global var as tests will need it over and over
    - Alphabet characters are the number they represent + 54 in terms of char code (11 = A, etc.)
    - Find largest number whose factorial fits into given number, then do something much like conversion to Roman numerals - iterate down from largest
        and keep checking if subsequent factorials fit into the rest
    - Am going to see if I can get this working before thinking about how to do the reverse    
Ok, basic tests for dec to fact are passing. Let's think about the reverse:
    - Reverse the string
    - Each digit now represents itself * factorial of its index
    - Letters should be handled correctly by how I set up the factorial helper
    - Wait no, letters are the multiplier, not the factorial part, need to convert that in here
    - Just do a map and reduce
*/
let memo = {0: 1}

function factHelper(num) {
    if (isNaN(num)) {
        num = num.charCodeAt(0) - 55
    }
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


function dec2FactString(nb) {
    if (nb === 1) {return "10"}
    let largestFact
    for (let i = 1; i <= nb; i++) {
        if (factHelper(i) > nb) {
            largestFact = i - 1
            break
        }
    }
    let resultStr = ""
    for (let i = largestFact; i >= 1; i--) {
        let digit = Math.floor(nb / factHelper(i))
        if (digit > 9) {
            digit = String.fromCharCode(digit + 55)
        }
        resultStr += digit
        nb = nb % factHelper(i)
    }
    resultStr += "0"
    return resultStr
}

function factString2Dec(str) {
    return str.split('').reverse().map((digit, idx) => {
        if (isNaN(digit)) {
            digit = digit.charCodeAt(0) - 55
        }
        return digit * factHelper(idx)
    })
    .reduce((acc, cur) => acc + cur, 0)
}

/* Am very confused by the fact that the top solutions by other people don't seem to be calculating the factorial at all. */