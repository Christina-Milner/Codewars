/* We have squares squished into a rectangle. An input of 5 means there's actually 6 squares (numbered from 0 to 5), with widths 1, 1, 2, 3, 5, and 8, and the sum of
their perimeters is 4 * (sum of all of that stuff), which is 8.
Return the sum of perimeters for any given number of squares. The kata helpfully points out that Fibonacci might be of help here.
*/

//P: A number
//R: A number

/*
- 0 is actually 1 square so it's 4
- So we want the first n + 1 (or n if going by index I guess ow my head) elements of the Fibonacci sequence without the initial zero, summed up and then multiplied by 4
- Is it possible to do this without actually creating an array of Fibonacci values?
- Use an object rather than an array - prefill with 0: 1 and 1: 1 so the same stuff doesn't keep having to get recalculated
- Iterate up to n and fill object with fibonacci numbers
- Sum object values and multiply by 4
*/


function perimeter(n) {
    let fib = {0: 1, 1: 1}
    if (!n) {return 4}
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2]
    }
    return Object.values(fib).reduce((acc, cur) => acc + cur, 0) * 4
}