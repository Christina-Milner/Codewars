/* Given an array of lowercase strings with no spaces, remove any consecutive duplicate letters from the strings.
Example: dup(["abracadabra","allottee","assessee"]) = ["abracadabra","alote","asese"]
*/

//P: An array of strings
//R: An array of strings

/*
- Didn't feel like dealing with Regex after the kata I just attempted, so figured splitting the individual strings and using filter would work
*/


function dup(arrOfStr) {
    return arrOfStr
        .map(e => e.split('').filter((e, i, arr) => e !== arr[i + 1]).join(''))
    };