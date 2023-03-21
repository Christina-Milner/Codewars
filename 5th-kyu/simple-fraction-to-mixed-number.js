/* Given a string representing a fraction x/y, return a string representing the corresponding mixed fraction.
Example: Input 42/9, output 4 2/3. Input 6/3, output 2.
If there's only an integer or only a fraction, return just that with no extra spaces. Throw an error on dividing by zero.
Do not modify the input. */

//P: A string
//R: A string

/*
- Split input string by the "/" and convert elements to numbers to get the numerator and denominator
- Check if denominator is zero, throw error if so
- Check if numerator is zero, return "0" if so
- Integer part should be covered by integer dividing the numerator by the denominator
- Remaining fraction is (numerator - integer * denominator) / denominator
- Now must check if it can be further simplified
- Iterate from half the denominator (integer division) down to 2 to check if there is a number both are divisible by, if so, do that
- Return template string of integer result + remaining fraction result.
*/

function mixedFraction(s){
    let [num, denom] = [Number(s.split('/')[0]), Number(s.split('/')[1])]
    if (!denom) {
        throw new Error("No division by zero!")
    }
    if (!num) {
        return "0"
    }
    const sign = num > 0 && denom > 0 || num < 0 && denom < 0 ? "" : "-"
    num = Math.abs(num)
    denom = Math.abs(denom)
    const int = Math.floor(num/denom)
    num = num - int * denom

    for (let i = Math.floor(denom / 2); i > 1; i--) {
        if (num % i == 0 && denom % i == 0) {
            num = num / i
            denom = denom / i
            break
        }
    }
    return int ? num ? `${sign}${int} ${num}/${denom}` : `${sign}${int}` : `${sign}${num}/${denom}`
  }
