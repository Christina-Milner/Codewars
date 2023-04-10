/* Given an array of at least 2 letters in only either upper or lower case, return the letter that is alphabetically missing. */

//P: An array of strings
//R: A string

/*
Could plug in the alphabet as a constant and compare against it, but let's do it via the ascii codes. 
Need to look for the two elements whose ascii codes are nonsequential and return the string from the missing ascii code. */

function findMissingLetter(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i + 1] && array[i + 1].charCodeAt(0) !== array[i].charCodeAt(0) + 1) {
            return String.fromCharCode(array[i].charCodeAt(0) + 1)
        }
    }
}