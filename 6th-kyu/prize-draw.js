/* Given two arrays strArr and numArr as well as a number, assume the following:
    - The strings in strArr are sorted by a convoluted method involving their lengths, the positions of their letters in the alphabet, and their weights which are in numArr
    - This produces their "winning number", if those are equal, go alphabetically
    - Return the participant at rank n after the sorting.
If there are fewer participants than n, return "Not enough participants", if the string array is empty, return "No participants".
*/

//P: An array of strings, an array of numbers and a number
//R: A string

/*
- Check for the edge cases first
- Write a helper that splits an input string and sums up the values of its letters
    - String to lower case, ascii codes - 96
- Copy string array and sort by that helper plus length of string times weight at current index
- Return entry at position n - 1 (as ranks start at 1)
*/

function rank(str, numArr, n) {
    if (!str.length) {
        return "No participants"
    }
    let strArr = str.split(',')
    if (strArr.length < n) {
        return "Not enough participants"
    }
    const sumLetterValues = str => {
        return str.toLowerCase().split('')
            .map((char, idx) => str.toLowerCase().charCodeAt(idx) - 96)
            .reduce((acc, cur) => acc + cur, 0)
    }
    let participants = {}
    for (let i = 0; i < strArr.length; i++) {
        let person = strArr[i]
        participants[person] = (sumLetterValues(person) + person.length) * numArr[i]
    }

    let sortedParticipants = Object.keys(participants).sort((a, b) => participants[a] == participants[b] ? a.toLowerCase().localeCompare(b.toLowerCase()) : participants[b] - participants[a])
    return sortedParticipants[n - 1]
}

/* 
So! Solved. Main issue was char code being pulled from str rather than str.toLowerCase(). Oops. Figured that out when I saw that "Elizabeth" was
getting assigned -27 for the first character.

*/
