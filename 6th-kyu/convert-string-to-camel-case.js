/*Given a string that is delimited by underscores or dashes, return it in camelCase. The first letter should only be capitalised if it already was to begin with. */

//P: A string
//R: A string

/*
- Could use regex, but don't want to. Will only use it to split the string.
- Split by _ or -
- Uppercase first letter of every element except the first
- Join
*/

function toCamelCase(str){
    const delimiter = new RegExp(/[-_]/, "g")
    return str.split(delimiter).map((word, idx) => idx === 0 ? word : word[0].toUpperCase() + word.slice(1)).join('')
}
