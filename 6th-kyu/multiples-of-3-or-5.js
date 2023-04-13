/* Given a number, return the sum of all integers below that number that are divisible by either 3 or 5. Return 0 if the number is negative. */

//P: A number
//R: A number

/* 
- Check for negative
- Create array of numbers up to, but not including, the input
- Filter by divisible by 3 or 5
- Reduce to obtain sum
*/


function solution(number) {
    if (number < 0) {
        return 0
    }
    let numArr = Array.from({length: number - 1}, (_, i) => i + 1)
    return numArr.filter(e => e % 3 == 0 || e % 5 == 0).reduce((a, b) => a + b, 0)
}