/* Given a word that's been encrypted by replacing its first letter with its character code and swapping the second and last letters, decipher it. */

//P: A string
//R: A string

/*
- Split string by spaces
- For each word, use regex to replace numbers with the string from char code
- Split the individual words as can't directly modify a string with str[1] = something else
- Save last letter to temp, replace it with letter at index 1, then replace letter at index 1 with temp
- Put word back together, put string back together
*/


function decipherThis(str) {
    return str.split(' ')
        .map(word => {
            let num = word.match(/\d+/)[0]
            return word.replace(num, String.fromCharCode(Number(num)))
        })
        .map(word => {
            let wordArr = word.split('')
            const temp = wordArr[wordArr.length - 1]
            wordArr[wordArr.length - 1] = wordArr[1]
            wordArr[1] = temp
            return wordArr.join('')
        })
        .join(' ')
} 