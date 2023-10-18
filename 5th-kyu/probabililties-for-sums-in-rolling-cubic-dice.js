/* Given two numbers x and y, return the probability (as a decimal, not rounded) of rolling a sum of x with y dice. (The dice are apparently assumed to be d6.) */

//P: Two numbers
//R: A number

/*
- There are 6 ** number of dice total possibilities
- Create arrays of all the combo possibilities
    - Can't directly do this with nested for loops as we don't know how many loops, but...
    - Start with an array of arrays of all the numbers from 1 to 6
    - Then replace it with each of its elements + all permutations of 1 to 6
    - Until number of elements is the total possibilities
- Filter possibilities by those with correct sum (reduce) and divide the number of those by the total possibilities

*/


function rolldiceSumProb(sum, dice){
    const total = 6 ** dice;
    let base = [[1], [2], [3], [4], [5], [6]];
    while (base.length < total) {
        let temp = [];
        for (let combo of base) {
            for (let i = 1; i <= 6; i++) {
                temp.push(combo.concat(i));
            }
        }
        base = temp;
    }
    return base.filter(combo => combo.reduce((acc, cur) => acc + cur, 0) == sum).length / total;
}