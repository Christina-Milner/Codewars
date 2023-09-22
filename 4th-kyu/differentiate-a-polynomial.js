/* Given a polynomial as a string and a number, evaluate the expression with that number as the value of x. 

differentiate("12x+2", 3)      ==>   returns 12
*/

//P: A string and a number
//R: A number


/* 
- GOing to dig around for the previous katas about polynomials and recycle my regex
- Although, is it even necessary? To ensure order of operations, we could first split the string by + or -
- Then iterate... yeah, that is going to be easier with regex. Iterate over the resulting items and evaluate
    - If item can be converted into a number, ignore for now 
    - then ^, so if x^(digits) is contained, replace with the value of x to the power of those numbers
    - If previous step was done or an x is still floating around in the string, do the multiplication with whatever else is still there
    - Replace these values back into the original string, which should now just be a chain of numbers and +/-
    - Match -?\d+ and replace out, adding/subtracting from total as appropriate until string is gone

// WHOOPS - didn't notice until I looked at the examples again partway through that I was not doing what the problem asked.
- Ok, deriving. Can still split up by -/+
- Any items that don't contain an x get the boot
- The ones that do get the coefficient multiplied by the exponent and the exponent reduced by one
- THEN you stick in x

*/



function differentiate(equation, point){
    let result = 0
    while (equation) {
        let term = equation.match(/([-+]?)(\d*)(x?)\^*(\d*)/)
        let [str, neg, coeff, theVar, power] = [term[0], term[1], term[2], term[3], term[4]]
        if (theVar) {
            let temp
            if (power) {
                temp = (point ** (power - 1)) * power
                if (coeff) {
                    temp *= coeff
                }
            }
            else {
                temp = coeff ? coeff : 1
            }
            if (neg && neg == "-") {
                result -= Number(temp)
            } else if (!neg || neg == "+") {
                result += Number(temp)
            }
        }
        equation = equation.replace(str, "")
    }
    return result
}