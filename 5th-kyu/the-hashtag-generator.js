/* Given a string, turn it into a hashtag. That means:
    - Remove spaces
    - Every word is capitalised
    - Starts with a hashtag
If the input or result is an empty string, or the hashtag would end up being longer than 140 chars, return false. */

//P: A string
//R: A string

/*
- Trim string to get rid of leading and trailing spaces
- Check for empty here
- Split string by spaces using regex so it doesn't matter how many
- Map elements to uppercase the first letter
- Join together and add hashtag
- Return result if up to 140 in length, otherwise false
*/


function generateHashtag(str) {
    const trimmed = str.trim()
    if (!trimmed) {return false}
    const hashtag = "#" + trimmed.split(/\s+/).map(str => str[0].toUpperCase() + str.slice(1)).join('')
    return hashtag.length <= 140 ? hashtag : false
}