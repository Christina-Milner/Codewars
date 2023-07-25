/* Given a number, check whether it is a "narcissistic number", defined as being the sum of each of its digits to the power of the number of its digits. */

//P: A number
//R: A boolean

/* 
- Convert number to string, remember its length
- Split, map back to number, and take each digit to the power of the length
- Check if this matches original number

*/


function narcissistic(value) {
    return String(value).split('').reduce((acc, num, _, arr) => acc + Number(num) ** arr.length, 0) === value
}