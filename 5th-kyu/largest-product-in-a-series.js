/* Given a string of numbers, return the highest possible product that can be obtained by multiplying 5 consecutive numbers in the sequence. */

//P: A string
//R: A number


/*
- Thought this was going to get all fancy math-y at first, but then thought, why not do this?
    - Split input into array of numbers
    - Map each number to the product of itself and the next 4
    - Find the max of the resulting array

*/



function greatestProduct(input) {
    let products = input.split('').map((num, idx, arr) => Number(num) * arr[idx + 1] * arr[idx + 2] * arr[idx + 3] * arr[idx + 4])
    return products.reduce((acc, cur) => cur ? Math.max(acc, cur) : acc)
}