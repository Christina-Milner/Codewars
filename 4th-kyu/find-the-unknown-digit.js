/* You are given an equation/expression as a string in the format number operator number = number. It can contain digits,
the operators +, - and *, =, and "?". ? stands for an unknown digit (which will be the same for every ?, and is never one
 of the digits already present). Return the digit the ? stands for (the lowest possible option if multiple work), or -1 if not possible to solve. */

 //P: A string
 //R: A number

/*
- First step: Create array of the digits from 0 to 9 and splice out any digits already present in the string, leaving the possible solutions.
- Then, we need to extract number 1, number 2, operator and result from the string.
    - Tricky part here is getting the "-" right, which can be prefixes or operators
    - Help I smell Regex
    - Okay, bit of tinkering says match(/(-?[\d\?]+)([\*\+-])(-?[\d\?]+)=(-?[\d\?]+)/) will get me what I need (note first array item will be complete string)
    - Save these as num1, op, num2 and result
- Iterate over potential solution digits
    - Replace ? in all components with digit
    - Check if maths after converting to number and using the appropriate operator checks out
    - If yes, return digit
- Return -1
*/

function solveExpression(exp) {
    // Find list of possible solutions (digits not already contained in expression)
    let possibleDigits = "0123456789"
    for (let digit of possibleDigits) {
        if (exp.includes(digit)) {
            possibleDigits = possibleDigits.replace(digit, "")
        }
    }
    possibleDigits = possibleDigits.split('').map(Number)
    
    // Extract components of expression
    let [num1, op, num2, result] = exp.match(/(-?[\d\?]+)([\*\+-])(-?[\d\?]+)=(-?[\d\?]+)/).slice(1)
    
    const zeroesChecker = str => /^\?{2,}/.test(str) || /^-?\?[\d]+/.test(str)

    // Check for possible solutions
    for (let digit of possibleDigits) {
        // No multiple/leading zeroes
        if (digit === 0 && (zeroesChecker(num1) || zeroesChecker(num2) || zeroesChecker(result))) {
            continue
        }
        let [testNum1, testNum2, testResult] = [num1.replace(/\?/g, String(digit)), num2.replace(/\?/g, String(digit)), result.replace(/\?/g, String(digit))]

        if (op === "*") {
            if (Number(testNum1) * Number(testNum2) === Number(testResult)) {
                return digit
            }
        }
        if (op === "+") {
            if (Number(testNum1) + Number(testNum2) === Number(testResult)) {
                return digit
            }
        }
        if (op === "-") {
            if (Number(testNum1) - Number(testNum2) === Number(testResult)) {
                return digit
            }
        }
    }
    return -1
 }

/* Just needed to iron out the zeroes issue, otherwise all good! */