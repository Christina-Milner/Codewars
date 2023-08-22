/*Write 3 functions that take in a string of n lines of n characters:
    rot(): Rotates the string 180 degrees
    selfie_and_rot(): has the original string in the upper left and the rotated version in the lower right, with dots to fill out the lines
    oper(): higher-order function that takes in the function and string and returns the result? 
        ("fct is the function of one variable f to apply to the string s (fct will be one of rot, selfie_and_rot)" wat?)
*/

//P: A string / A function and a string in the case of oper()
//R: A string


/*
- Rotate just means reverse the order of the lines (so split by \n and reverse), as well as of the elements within the lines
- selfie and rot: call on rot to get the second string, then pad end for the original string lines, pad start for the rotated ones, and stick together
- ? Will need tests to see what this is meant to do. As it stands I would say function oper(fct, s) {return fct(s)} but surely that can't be it.

*/


function rot(strng) {
    return strng.split('\n')
        .map(line => line.split('').reverse().join(''))
        .reverse()
        .join('\n')
}

function selfieAndRot(strng) {
    return strng.split('\n')
        .map(line => line.padEnd(line.length * 2, "."))
        .join('\n')
        + '\n' +
        rot(strng).split('\n')
            .map(line => line.padStart(line.length * 2, "."))
            .join('\n')
}

function oper(fct, s) {
    // ??? What is the point of this?
    return fct(s)
}