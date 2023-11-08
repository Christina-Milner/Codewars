/* Given an array of numbers (or empty), return the array sorted in the order it would be in if it were words instead of numbers.
Example

    Input: 1, 2, 3, 4
    Equivalent names: "one", "two", "three", "four"
    Sorted by name: "four", "one", "three", "two"
    Output: 4, 1, 3, 2
*/

//P: An array of numbers
//R: An array of numbers

/*
- Right, so will need to sort the array with a sorting function that compares the word value for each number
- Getting the word value will be kind of like Roman numerals
- Iterate over powers of 10 from however high these tests go down to 2
- If power of 10 fits in current number, add the result of integer division and the appropriate tens word ("thousand" etc.) to result
- (Use separate helper to do this conversion)
- Recursively run function on modulo
- So need 2 map objects: One that maps 1 to "one", 2 to "two" etc. and one that maps powers of 10 to the appropriate word
- Kata says "and" shouldn't make a difference so to heck with it
*/




function sortByName(arr) {
    const powersWords = {
        2: "hundred", 3: "thousand", 6: "million"
    };

    const powersOfTen = [6, 3, 2, 1, 0];
    const numbers = {
        0: "zero",
        1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
        6: "six", 7: "seven", 8: "eight", 9: "nine",
        10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen",
        16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty", 30: "thirty", 40: "forty", 50: "fifty",
        60: "sixty", 70: "seventy", 80: "eighty", 90: "ninety"
    };

    const numToWord = (num, acc = []) => {
        if (!num && !acc.length) {
            return numbers[num];
        }
        if (!num) {
            return acc.join(' ');
        }

        for (let power of powersOfTen) {
            if (num >= 10 ** power) {
                const int = Math.floor(num / 10 ** power);
                const rest = num % 10 ** power;
                if (int == 1 && power == 1) {
                    acc.push(numbers[num]);
                    return numToWord(0, acc);
                }
                if (int * 10 ** power in numbers) {
                    acc.push(numbers[int * 10 ** power]);
                    return numToWord(rest, acc);
                }
                if (int in numbers) {
                    acc.push(numbers[int]);
                    acc.push(powersWords[power]);
                    return numToWord(rest, acc);
                }
                // If it's not in there, we're dealing with a "hundreds" problem
                let hundredsInt = Math.floor(int / 100);
                acc.push(numbers[hundredsInt]);
                acc.push("hundred");
                return numToWord(num - hundredsInt * 100 * 10 ** power, acc);
            }
        }
    }

    return arr.slice().sort((a, b) => numToWord(a).localeCompare(numToWord(b)));

  }