/* Given a Roman numeral (that will always be valid), return its value as a numeric decimal integer. */

//P: A string
//R: A number


/*
- Make a hashmap indicating what each letter is worth
- Iterate over the string and add these values to a total
- If the value following the current one is one that is bigger, subtract the current one instead
- If that previous step doesn't work, hardcode the 40/90 values in the hashmap
*/




function solution (roman) {
    const values = {
        M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1
    };
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
        const cur = values[roman[i]]
        if (roman[i + 1] && values[roman[i + 1]] > cur) {
            result -= cur;
        }
        else {
            result += cur;
        }
    }
    return result;
}