/* Write a function that takes in a string in PascalCase and returns it in snake_case. The input can also be a number, in which case that number should be returned as a string. */

//P: A string or a number
//R: A string

/*
- If input is anything other than a string (one of the sample tests provided by someone in the discussions includes null), just return it as a string
- First, need to insert an underscore before any capital letters other than the one at the very start - could do RegEx, but map is simpler
- Then change everything to lowercase
*/


function toUnderscore(string) {
    if (typeof(string) !== "string") {
        return String(string)
    }

    return string.split('')
        .map((letter, idx) => idx !== 0 && /[A-Z]/.test(letter) ?  "_" + letter : letter)
        .join('')
        .toLowerCase()
}