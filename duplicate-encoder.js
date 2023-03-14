/*Given a string, convert it to a new string where any character that appears only once in the original becomes "(" and any character that appears more than once becomes ")",
ignoring capitalisation. */

//P: A string
//R: A string

/*
- Convert to lowercase to ensure capitalisation gets ignored
- Split string and map:
    - If array filtered by current element has a length > 1, return ")"
    - Otherwise, return "("
- Rejoin
*/

function duplicateEncode(word){
    return word.toLowerCase()
        .split('')
        .map((e, _, arr) => {
            if (arr.filter(f => f == e).length > 1) {
                return ")"
            }
            return "("
        })
        .join('')
}
