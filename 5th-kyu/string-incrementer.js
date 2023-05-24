/* Given a string, affix a "1" to it if it does not already end on a number, otherwise increment the number, taking care to handle leading zeroes
correctly. */

//P: A string
//R: A string

/*
- /[\d]$/.test(str) will show if the string already ends with a number (note sample test that's got a number randomly stuck in the middle of one - this is to be ignored)
- .match(/[\d]+$/) will find any numbers at the end
- If it doesn't actually end with a number, stick 1 onto it and done
- If it does - keep track of how long whole number sequence is
    - Keep track of how long sequence converted to number is
    - Difference is leading zeroes that need to be stapled back on
    - Check if number has gotten longer after adding 1, if so, subtract one leading zero
    - Replace match sequence with diff number of leading zeroes + Number + 1
*/

function incrementString(str) {
    if (!/[\d]+$/.test(str)) {
        return str + "1"
    }
    const endingNum = str.match(/[\d]+$/)[0]
    const newNum = Number(endingNum) + 1
    const diff = endingNum.length - String(newNum).length >= 0 ? endingNum.length - String(newNum).length : 0

    return str.replace(/[\d]+$/g, "0".repeat(diff) + String(newNum))
}