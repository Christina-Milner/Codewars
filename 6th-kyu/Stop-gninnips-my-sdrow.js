/* Given a string consisting of only letters and spaces, return the string with all words of 5  or more letters reversed. */

//P: A string
//R: A string

/*
- Split by spaces
- Map:
    - Elements with length less than 5 stay as they are
    - The others get split again to use Array.reverse() and put back together
- Join by spaces and return
*/



function spinWords(string){
    return string.split(' ')
            .map(word => {
                if (word.length <= 4) {return word}
                return word.split('').reverse().join('')
            })
            .join(' ')
}