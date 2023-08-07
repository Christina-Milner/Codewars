/* Given a number, return a string of that number, but with dashes before and after each odd digit (but not at the start or end). If the number is negative, remove the negative sign. If the number is not an integer, return the string 'NaN'. */

//P: A number
//R: A string


/*
- If String of number is NaN or its Math.floor() is something other than itself, return 'NaN'
- Split string of absolute value of input
- Use reduce rather than map to get the dashes in, as otherwise double dashes between odd numbers is going to be a problem
- If index is 0, put in current element and a dash only if it is odd
- If index is length - 1, put in current element, preceded by a dash only if it is odd and if current acc does not end in a dash
- Anything else, put in current element surrounded by dashes unless acc ends in a dash

*/



function dashatize(num) {
    if (isNaN(String(num)) || Math.floor(num) !== num) {
        return 'NaN'
    }
    return String(Math.abs(num)).split('').reduce((acc, cur, idx, arr) => {
        if (!acc) {
            return Number(cur) % 2 === 0 || arr.length === 1 ? cur : cur + "-"
        }
        if (idx == arr.length - 1) {
            return Number(cur) % 2 === 0 || acc[acc.length - 1] === "-" ? acc + cur : acc + "-" + cur
        }
        return Number(cur) % 2 === 0 ? acc + cur : acc[acc.length - 1] === "-" ? acc + cur + "-" : acc + "-" + cur + "-"
    }, "")
  }