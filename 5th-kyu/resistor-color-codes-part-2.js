/* Given a string indicating a resistance in ohms, such as "330 ohms", return the colours the appropriate transistors' bands would have. 
There is a colour chart here: https://en.wikipedia.org/wiki/Electronic_color_code#Resistor_color-coding
Basic codes are: 0: black, 1: brown, 2: red, 3: orange, 4: yellow, 5: green, 6: blue, 7: violet, 8: gray, 9: white
First two bands indicate first two digits, third indicates power of 10 - so 47 would be yellow (4) violet (7) black (0, because 10 ^ 0).
Usually there is also a fourth band indicating tolerance (this is always gold and we're doing it for reasons).
Ohms values over 1000 will be given in the format "4.7k ohms", over a million will be as in "1M ohms".
*/

//P: A string
//R: A string

/*
- First I need to find out whether there are combinations of M, k and normal values, or if it'll all be like the sample tests with "330k ohms" or "2M ohms".
    It would be very convenient if the letter was always the last thing (once the " ohms" has been removed, which we're obviously going to do)
    - Looks like I don't need to take any such mixes into account, and also I will be upvoting this kata on principle for letting me see rather than aborting
        after the first failed test.
- So! Get rid of the " ohms"
- If what remains can be parsed as a number, fine, do so, otherwise slice off the last character and check whether it's "k" or "M"
- Make an object map of the colors and convert the number as string to the two digits before converting to an actual number
- Iterate over numbers from 0 to check what power of 10 is necessary for these numbers to become the same

*/


function encodeResistorColors(ohmsString) {
    const colors = {
        0: "black", 1: "brown", 2: "red", 3: "orange", 4: "yellow",
        5: "green", 6: "blue", 7: "violet", 8: "gray", 9: "white"
    };
    // Input string without " ohms"
    let useful = ohmsString.split(' ')[0];
    // If last character is not a digit, find out whether it is k or M and save appropriate value
    let factor;
    if (isNaN(useful[useful.length - 1])) {
        factor = useful[useful.length - 1] == "k" ? 1000 : 1000000;
        useful = useful.slice(0, -1);        
    }
    // A second string to track the value of the resistor bands we're selecting
    let digitString = "";
    // Result array for the actual resistor bands
    let result = [];
    // Ignoring any decimal points, take the first two digits and put them in the new string,
    // and the corresponding color in the result array
    useful.replace(/\./, "").split('').forEach((digit, idx) => {
        if (digit in colors && idx < 2) {
            digitString += digit;
            result.push(colors[digit]);
        }
    })
    // "1k ohms" and the like will be missing one ring if we don't check length and add a black for 0 here
    // Digitstring needs to be adjusted or the power of 10 will be off
    if (result.length < 2) {
        result.push("black");
        digitString += "0";
    }
    // If a "k" or "M" was present, the original number gets multiplied accordingly
    if (factor) {
        useful = String(Number(useful) * factor);
    }
    // Find the correct power of 10 for the two number strings to have matching values
    for (let i = -5; i < 10000; i++) {
        if (Number(digitString) * 10 ** i == Number(useful)) {
            result.push(colors[i]);
            break;
        }
    }
    result.push("gold"); // Because it said so
    return result.join(' ');
}