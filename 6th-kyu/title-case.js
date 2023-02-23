/* Given a string and an optional second string, return the first string in title case. That means all words have their first letter capitalised and all the rest
in lowercase, unless they are contained in the second, space-delimited string of insignificant words. The insignificant words are always in lowercase, unless they
are the first word of the string, which is also in uppercase. */

//P: A string and an optional second string
//R: A string

/*
- Make a helper function that converts a word to title case by concatenating the first letter to uppercase and the rest to lowercase
- Split both strings by spaces
- Map the first string to title case unless the element is contained in the second and not at index 0, then join
*/

function titleCase(title, minorWords) {
    const titleCasify = str => str[0].toUpperCase() + str.slice(1).toLowerCase()
    const titleAllLower = title ? title.split(' ').map(e => e.toLowerCase()) : []
    const minorAllLower = minorWords ? minorWords.split(' ').map(e => e.toLowerCase()) : []
    return titleAllLower.map((e, i) => {
        if (!(minorAllLower.includes(e)) || i == 0) {
            return titleCasify(e)
        }
        return e
    }).join(' ')
}

/* Forgot in PREP that I'd also have to convert both arrays to all lowercase in order for comparisons to work, but that occurred to me pretty quickly.
Minor additional modification needed to correctly handle empty input/lack of a minorWords list. */