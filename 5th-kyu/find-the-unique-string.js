/* Given an array of more than 3 strings, return the only string to contain a character the others don't.
Example:
findUniq([ 'Aa', 'aaa', 'aaaaa', 'BbBb', 'Aaaa', 'AaAaAa', 'a' ]) === 'BbBb' */

//P: An array of strings
//R: A string

/*
I feel like I'm missing something here because this seems pretty straight-forward.
- Split all the strings in the array
- Iterate over the characters to find the unique one
- Then find that character in the original non-split array
?
(After first attempt)
- Hmm, no, that doesn't quite work as the character can be contained more than once in the result string,
so it's not unique in the overall array of characters
- New plan: Iterate over each string and add its characters to an object
    - Add them to a temp array as well and only add to the object if not present in that yet
    - May have to use a [char, count] array format instead of an object as not sure a space is allowed as a key
    - Increase count by one if already present in the object from another string
    - Then look for the character with value 1

- That passed some, but failed the 'Tom Marvolo Riddle', 'I am Lord Voldemort', 'Harry Potter' => 'Harry Potter' test so I guess
    it's meant to be case insensitive despite the instructions not saying anything about that (the uppercase M is unique, but only Harry Potter has a h in it)
*/

function findUniq(arr) {
    let charMap = {}
    for (let string of arr) {
        let charsSeen = []
        for (let char of string) {
            if (!charsSeen.includes(char.toLowerCase())) {
                charsSeen.push(char.toLowerCase())
                char.toLowerCase() in charMap ? charMap[char.toLowerCase()] += 1 : charMap[char.toLowerCase()] = 1
            }
        }
    }
    const wantedChar = Object.keys(charMap).find(e => charMap[e] == 1)
    return arr.find(e => e.includes(wantedChar) || e.includes(wantedChar.toUpperCase()))
}

/* Presto! Could get rid of the "or" in the last line by creating a regex pattern with the "i" flag instead, but not sure that extra
line would hugely add value. */