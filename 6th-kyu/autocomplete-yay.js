/* Given an input string and an array of strings, return all strings from the array that start with the input string.
If there are more than 5 matches, return only the first 5, if there are none, return an empty array.
Non-letter characters in the input should be ignored.
The matching should not be case sensitive, but case of the matches should be preserved.
Example: 
autocomplete('ai', ['airplane','airport','apple','ball']) = ['airplane','airport']
*/

//P: A string and an array of strings
//R: An array of strings

/*
- Split the input to filter by letters only and put back together
- Create new regex of that string, with line start in front of it and i flag for case insensitive
- Filter input array by matching that expression
- Return slice of first 5 elements
*/

function autocomplete(input, dictionary){
    let inputCleaned = input.split('').filter(e => e.match(/[a-zA-Z]/)).join('')
    let query = new RegExp(`^${inputCleaned}`, "i")
    return dictionary.filter(e => e.match(query)).slice(0, 5)
}

/* ^ That works, but someone once told me not to use Regex to solve coding problems as that doesn't teach you anything about
algorithms, so I am going to try to see if I can do it without using Regex for funsies. */

function autocomplete(input, dictionary){
    let dictCopy = dictionary.slice()
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    let inputCleaned = input.split('').filter(e => alphabet.includes(e.toLowerCase()))
    for (let i = 0; i < inputCleaned.length; i++) {
        dictCopy = dictCopy.filter(e => e[i] && e[i].toLowerCase() == inputCleaned[i].toLowerCase())
    }
    return dictCopy.slice(0, 5)
}

/* Note for future reference - could have simply replaced the non-letter characters out instead of splitting, filtering and joining
and could have used the startsWith method instead of Regex or the super oldschool way. */