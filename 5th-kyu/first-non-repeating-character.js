/* Given a string, return its first letter that is not repeated. The comparison should treat uppercase and lowercase as the same, but the
return should respect the actual casing. 
Example: The input 'sTreSS' should return 'T'
Says to "see sample tests" to see what should be returned when no such letter is found, but sample tests don't contain that scenario. Thanks. Assuming empty string.
*/

//P: A string
//R: A string

/*
- Convert string to lowercase and split into array
- Filter by elements that, if filtered by, result in a length of 1
- Take first element of resulting list - if indexOf for this is -1, uppercase it
- Return it or "" if nothing available
*/



function firstNonRepeatingLetter(str) {
    let result = ""
    const lowercaseLetters = str.toLowerCase().split('')
    const uniques = lowercaseLetters.filter(letter => lowercaseLetters.filter(letter2 => letter2 === letter).length === 1)
    if (uniques.length) {
        result = str.indexOf(uniques[0]) !== -1 ? uniques[0] : uniques[0].toUpperCase()
    }
    return result
  }