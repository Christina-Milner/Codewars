/* Given a string of random characters, decode it into a key by returning a string that's 26 characters long and made up of the number of occurrences
of each letter of the alphabet in the string.*/

//P: A string
//R: A string, 26 characters long, consisting of numbers

/* This seems pretty straightforward? Take the alphabet as a string, split it, map it to the length of the source string filtered by each character, join it and return. 
(I could make the alphabet by making an array of 26 and then mapping it to the unicode codes, but why would I do that when I can google 'lowercase alphabet as a string') */

function decrypt(encryption) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    return alphabet.map(e => encryption.split('').filter(f => f == e).length).join('')
}

