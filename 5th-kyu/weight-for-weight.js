/* Given a list of numbers as a string (with variable amounts of spaces), return that string spaced normally (I assume?) and with the numbers sorted by the sum of their
digits. In cases where this is a tie, use string alphabetical sorting (180 before 90). THe list can be empty. */

//P: A string
//R: A string


/*
- First get rid of leading and trailing whitespace with trim
- Then split the string by a regex for any number of spaces
- Sort the resulting array: If sum of digits the same, use localecompare, otherwise sum of digits
- Thought I'd learned a trick from a past kata using % 9 to add digits, but that doesn't seem to work, use the usual helper
- Put array back together with one space in between
*/


function orderWeight(strng) {
    const sumDigits = numStr => numStr.split('').reduce((acc, cur) => acc + Number(cur), 0)
    return strng.trim()
                .split(/\s+/)
                .sort((a, b) => {
                    if (sumDigits(a) === sumDigits(b)) {
                        return a.localeCompare(b)
                    }
                    return sumDigits(a) - sumDigits(b)
                })
                .join(' ')
}