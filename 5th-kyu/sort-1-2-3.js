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




function sortByName(ary) {
    const digits = {
        1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
        6: "six", 7: "seven", 8: "eight", 9: "nine"
    };
    const powersOfTen = {
        2: "hundred", 3: "thousand", 6: "million"
    };
    const teens = {
        10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen",
        16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen"
    };
    const tens = {
        2: "twenty", 3: "thirty", 4: "forty", 5: "fifty",
        6: "sixty", 7: "seventy", 8: "eighty", 9: "ninety"
    };

    const numToWord = (num, acc = []) => {
        if (!num) {
            return acc.join(' ');
        }
        for (let i = 6; i >= 0; i--) {
            if (num > 10 ** i) {
                const int = Math.floor(num / 10 ** i);
                const rest = num % 10 ** i;
                if (i == 0) {
                    acc.push(digits[int]);
                }
                else if (i == 1) {
                    if (num < 20) {
                        acc.push(teens[num]);
                        num = 0;
                        return numToWord(num, acc);
                    }
                    else {
                        acc.push(tens[int]);
                    }
                }
                else if (i in powersOfTen) {
                    acc.push(digits[int]);
                    acc.push(powersOfTen[i]);
                }
                else if (i == 4) {
                    acc.push(tens[int]);
                    acc.push("thousand");
                }
                else if (i == 5) {
                    acc.push(digits[int]);
                    acc.push("hundred thousand");
                }
            }
            /* WIP ^ streamline above and then here, make recursive call to modulo */
        }
    }


  }