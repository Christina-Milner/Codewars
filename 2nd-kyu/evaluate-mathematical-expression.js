/* Given a mathematical expression as a string, return the result. (eval() is disabled.)
Must support the 4 basic arithmetic operations including floating-point division and multiple layers of brackets, as well as observe the order of operations.
Negative numbers will never have whitespace between them and the preceding "-", otherwise, the whitespace can be whatever. */

//P: A string
//R: A number

/*
- Did something kind of like this before, but can't find it anymore.
- For God's sake, this is one of those where you can't look at any of the input by setting the function to simply console.log it because it stops after the first failed test.
    I hate you. I hate you so much. Tempted to not do this just for that reason alone.
- Anyway. We're going to need a bit of RegEx to extract stuff, but I'm thinking run a loop that keeps going until the string is not NaN when processed as a number
- Is there any drawback to stripping whitespace, or do I need to preserve a distinction between prefix - and operator -?
- Strip whitespace (split by /s+/ and put back together)
- Replace "--" with "+" and "+-" with "-" (or maybe do this a bit further down the line)
- Look for parentheses. If found, recursively chuck their contents back into this function
- Look for num*num and num/num patterns and replace those with what they evaluate to
- String should now just be a row of numbers connected by - and +. 
- Initialise value to 0
- Add first group of numbers if no "-" at very start, otherwise subtract
- keep recursively slicing off numbers from the front and adding or subtracting as appropriate
*/

function calc(expression) {
    let cleaned = expression.split(/\s+/).join('')
    if (!isNaN(cleaned)) {return Number(cleaned)}
    cleaned = cleaned.replace(/\+-/g, "-").replace(/--/g, "+")

    let result = 0

    while (cleaned.includes("(")) {
        let parentheses = cleaned.match(/\(([0-9\+-\/\*]*)\)/)
        if (parentheses) {
            cleaned = cleaned.replace(parentheses[0], calc(parentheses[1]))
        }
    }
    cleaned = cleaned.replace(/\+-/g, "-").replace(/--/g, "+").replace(/\/\+/g, "/")
    while (cleaned.includes("/")) {
        let division = cleaned.match(/([\d|\.]+)\/(-?[\d|\.]+)/)
        if (division) {
            cleaned = cleaned.replace(division[0], Number(division[1]) / Number(division[2]))
        }
    }
    while (cleaned.includes("*")) {
        let multiplication = cleaned.match(/([\d|\.]+)\*(-?[\d|\.]+)/)
        if (multiplication) {
            cleaned = cleaned.replace(multiplication[0], Number(multiplication[1]) * Number(multiplication[2]))
        }
    }
    while (cleaned) {
        let num = cleaned.match(/([+|-]?)([\d|\.]+)/)
        if (num[1] === "-") {
            result -= Number(num[2])
        } else {
            result += Number(num[2])
        }
        cleaned = cleaned.replace(num[0], "")
    }
    return result   
}

/* Whoop! Occurred to me as I was coding it that I wanted to structure the loop slightly differently. Troubleshooting was mostly
needing to replace out sequences of double operators again and making sure parentheses matching was non-greedy. */