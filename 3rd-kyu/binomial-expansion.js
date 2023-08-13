/* Write a function that, given a string in the form (a + b)^n, performs binomial expansion and returns the appropriate string, like (a+b)^2 => a^2+2ab+b^2.
Terms with the coefficient zero are not included, coefficients of one are not included, coefficients of -1 are written as just the minus sign, powers of 1 are not written out
and powers of 0 mean "only the coefficient is included" (???). */

//P: A string
//R: A string

/*
- First, touching up on some math: https://mathsathome.com/the-binomial-expansion/ - I know a^2 + 2ab + b^2 but not what happens with larger powers, this explains it
- Next, we must use regex to extract a, b and n. This is vaguely reminiscent of that kata with the stone tablets or whatever it was. Get back to that in a moment.
- Then we apply the appropriate formula based on the power
- Finally, put everything back together into the result string and make sure to observe the rules on what powers and coefficients are ignored

- Ok, back to the top, the regex. It helps that the element with a letter seems to always be the first one.
- str.match(/\((.*)[+|-](.*)\)\^(\d)/) will get me the 3 separate elements, will have to do some subsequent wizardry to get the components of the first one
- Actually, I need to capture -/+, too. So: str.match(/\((.*)([+|-])(.*)\)\^(\d)/) 
- If n is 0, return 1
- If n is 1, return a + operator + b (original expression sans brackets and exponent)
(Going to code up to this point before continuing)
- str.match(/(.*)([a-z])/) will get the letter variable and its coefficient out of a
- Now, if it was guaranteed the powers only go up to 4 or 5, I could hardcode the formulae, but I suspect that might not be the case (this is one of those annoying ones where you can't see most of the tests if they're failing)
- Generalising the formula rule gets a little tricky though as I don't particularly want to add coding out pascal's triangle to this and I can't really read the algebra notation
- It is the sum from k = 0 to n of a ^n - k * b ^ k, prefixed by ... n!/k!(n-k)! ? 
- So in the example of (a + b)^4, it'd be 4! / 0! * 4! (cancels out as 1) times a^4b^0, 4!/1!*3! (cancels out as 4... right?) * a^3b, 4!/2!*2! = 6 times a^2b^2, 4!/3!*1! (cancels out as 4 again?) times a*b^3, and 4!/4!*0! (1 again) times b^4?
- Yep, that's correct, we can work with that. And obvio if the coefficient is negative, it alternates between + and - as the even powers become positive 



*/
function expand(expr) {
    let components = expr.match(/\((.*)([+|-])(.*)\)\^(\d+)/)
    let [a, operator, b, n] = [components[1], components[2], components[3], components[4]]
    if (n === "0") {return "1"}
    if (n === "1") {return a + operator + b}
    n = Number(n)
    let result = ""
    let [coeff, x] = [a.match(/(.*)([a-z])/)[1], a.match(/(.*)([a-z])/)[2]]

    let factorials = {0: 1, 1: 1}
    const factorial = n => {
        if (n in factorials) {return factorials[n]}
        for (let i = 2; i <= n; i++) {
            factorials[i] = factorials[i - 1] * i
        }
        return factorials[n]
    }

    if (coeff === "-") {coeff = "-1"}
    if (operator === "-") {b = "-" + b}

    for (let k = 0; k <= n; k++) {
        if (k === 0) {
            result += !coeff || Math.pow(Number(coeff), n) === 1 ? `${x}^${n}` : Math.pow(Number(coeff), n) === -1 ? `-${x}^${n}` : String(Math.pow(Number(coeff), n))+`${x}^${n}`
        }
        else if (k === n) {
            const last = Math.pow(Number(b), n)
            result += last < 0 ? String(last) : last === 0 ? "" : "+" + String(last)
        }
        else {
            const prefix = (factorial(n)/(factorial(k) * factorial(n - k)))
            const num = coeff ? Math.pow(Number(b), k) * prefix * Math.pow(Number(coeff), n - k) : Math.pow(Number(b), k) * prefix
            console.log("Num ", num)
            if (num === 0) {result += ""; continue}
            else if (num < 0) {result += "-"}
            else {result += "+"}
            if (num === 1) {
                if ((n - k) === 1) {
                    result += `${x}`
                } else {
                    result += `${x}^${n - k}`
                }
            }
            else {
                if (n - k === 1) {
                    result += `${num}${x}`
                } else {
                    result += `${num}${x}^${n - k}`
                }
            }
        }
    }
    result = result.replace(/--/g, "-")
    return result
}

/* Right, not hard in principle, but debugging it to make sure the powers and coefficients of 1 don't make it into the result was a nightmare and a half. 
I was correct in assuming there would be powers higher than 5, which caused some issues as I'd originally just replaced out any powers of 1, but had to rethink that approach
when double-digit powers appeared in the random tests. I *could* have tried to adapt the regex so it would only catch singular ones, but I thought preventing the ones from
making it into the result in the first place was a better way to do it. No such qualms with double minuses, though. */