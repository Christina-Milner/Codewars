/* Write a function that encrypts a string by replacing the first letter of each word with its ASCII code and swapping the second letter with the last letter.
No need to take special characters into account. */

//P: A string
//R: A string

/*
- Split string by space to deal with words individually
- Replace first letter with its charCodeAt
- If word is at least 3 letters long, swap second and last letter (can do this by slicing)
*/

const encryptThis = function(text) {
    const wordEncrypter = str => {
        if (str.length > 2) {
            let second = str[1], last = str[str.length - 1]
            str = str[0] + last + str.slice(2, str.length - 1) + second
        }
        return str.charCodeAt(0) + str.slice(1)
    }
    return text.split(' ').map(e => wordEncrypter(e)).join(' ')
  }

/* Realised pretty quickly that I had to do the letter swap first, otherwise the Ascii code for the first letter potentially being multiple digits
throws a monkey wrench into the works. Otherwise pretty straightforward. */