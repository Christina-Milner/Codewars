/* Given a number, return it as a string with comma separators every 3 digits, such as  100000  ->     "100,000". */

//P: A number
//R: A string

/*
- Turn number into string, split to array and reverse
- Now add a comma after every index where (i + 1) % 3 === 0
- Reverse back and join
*/


function groupByCommas(n) {
    return String(n).split('').reverse().map((digit, idx) => idx && idx % 3 === 0 ? digit + "," : digit).reverse().join('')
}

/* Idx, not idx + 1, because I can't count. */