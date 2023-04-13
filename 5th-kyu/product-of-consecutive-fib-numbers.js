/* Given a number, return an array of [num1, num2, true] or [num1, num2, false] where num1 and num2 are consecutive elements of the fibonacci sequence
and their product is the given number. If those do not exist, pick the first two where the product is greater than the input number. The boolean indicates
whether the product of the two is actually the given number, or not.
Example:
productFib(714) # should return (21, 34, true), 
                # since F(8) = 21, F(9) = 34 and 714 = 21 * 34
*/

/*
- Write a helper that creates an array of fibonacci numbers up to a certain value
    - It starts with [0, 1] and then pushes in the sum of the penultimate and last elements until the condition is met

- In the example, the numbers are 21 and 34 and the square root of the input is 26(ish)
- Wild guess: Can stop populating array at the first number that is bigger than the input's square root and just need to check
    if it has the correct product when combined with the previous number.
- If that doesn't work, go up to halfway between square root and number and iterate over the array to find pair
- Depending on how previous steps work out, closest match is probably the pair around the square root, or we find it via iteration
- Actually, don't need a helper for the fib array as it'll only be run once
*/


function productFib(prod){
    let fibArr = [0, 1]
    while (fibArr[fibArr.length - 1] <= Math.sqrt(prod)) {
        fibArr.push(fibArr[fibArr.length - 1] + fibArr[fibArr.length - 2])
    }
    if (fibArr[fibArr.length - 1] * fibArr[fibArr.length - 2] == prod) {
        return [fibArr[fibArr.length - 2], fibArr[fibArr.length - 1], true]
    } else {
        while (fibArr[fibArr.length - 2] * fibArr[fibArr.length - 1] < prod) {
            fibArr.push(fibArr[fibArr.length - 1] + fibArr[fibArr.length - 2])
        }
        return [fibArr[fibArr.length - 2], fibArr[fibArr.length - 1], false]
    }
  }

/* Yep, the logic "number pair around the square root must be it" was solid for the ones where the condition is met, just needs to go up
higher if it's not. But for reference, this would have been a much simpler and more concise way of doing it: */

function productFib(prod){
    let [a, b] = [0, 1];
    while(a * b < prod) [a, b] = [b, a + b];
    return [a, b, a * b === prod];
  }