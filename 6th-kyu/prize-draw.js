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
            .map((char, idx) => str.charCodeAt(idx) - 96)
            .reduce((acc, cur) => acc + cur, 0)
    }
    let participants = {}
    for (let i = 0; i < strArr.length; i++) {
        let person = strArr[i]
        participants[person] = (sumLetterValues(person) + person.length) * numArr[i]
    }
    console.log("n: ", n)
    console.log("participants: ", participants)
    console.log("weights: ", numArr)
    let sortedParticipants = Object.keys(participants).sort((a, b) => participants[a] == participants[b] ? a.localeCompare(b) : participants[b] - participants[a])
    console.log("sorted: ", sortedParticipants)
    return sortedParticipants[n - 1]
}

/* 
??? Trickier than it looks. Only passes about half the randoms and I'm out of time.
Initial thought process didn't account for a few things, such as idx not being available for sort() (hence the object solution),
or the fact that the participants are actually passed in as a string, not an array. 
n:  2
participants:  { Willaim: 324, Liam: 28, Daniel: 114, Alexander: 122 }
weights:  [ 6, 4, 6, 2 ]
sorted:  [ 'Willaim', 'Alexander', 'Daniel', 'Liam' ]

expected 'Alexander' to equal 'Daniel'

I have no idea why Daniel is meant to come first there unless there's an error in the score calculation, but I feel like too many are passing for that to be the case?
Locale compare might still need a bit of tweaking as this wants upper and lowercase to be treated the same, but that's not the problem here.
Anyway, mystery for another day.
*/
