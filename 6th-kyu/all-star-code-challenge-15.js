/* Given a string, return an array of all versions of that string with the first letter rotated to the end, that is the same length as the input string and 
ends with the input string. Example:
rotate("Hello") // => ["elloH", "lloHe", "loHel", "oHell", "Hello"]
An empty string should return an empty array.*/

//P: A string
//R: An array of strings

/* 
- Create empty result array
- If input is falsy, return it
- Set a string to the input string with the first letter shifted back
- Run a while loop that repeats that process and pushes the result into the array until the current string equals the input string
- return array
*/

function rotate(str){
    let result = []
    if (!str) {
        return result
    }
    let first = str.slice(1) + str[0]
    while (first !== str) {
        result.push(first)
        first = first.slice(1) + first[0]
    }
    result.push(str)
    return result
}