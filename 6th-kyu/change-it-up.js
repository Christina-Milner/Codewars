/* Given a string, 1) replace every letter with the letter following it in the alphabet (wrapping from z to a), 2) make any vowels capital letters 3) make any consonants
lowercase letters.
Example: "Cat30" -> "dbU30" */

//P: A string
//R: A string

/* 
- Akshully. Given the capitalisation rules in step 2 and 3, the capitalisation in the original string doesn't matter at all. So only need constants for
the lowercase alphabet and vowels
- Set string to lowercase and split into array
- Map letters to one letter shifted over (indexOf in the alphabet string + 1, or 0 if that's 26)
- Regex replace vowels to uppercase if I can manage that in one attempt, otherwise map again
*/

function changer(str) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    return str.toLowerCase().split('').map(e => {
        if (alphabet.includes(e)) {
            return alphabet[alphabet.indexOf(e) + 1] ? alphabet[alphabet.indexOf(e) + 1] : alphabet[0]
        }
        return e
    }).join('')
    .replace(/[aeiou]/g, m => m.toUpperCase())
}

/* Woo, regex worked, so don't need the vowels constant */