/* Write a function that takes in a string, and a string of text to search for, and returns how many times the latter is contained in the former.
It takes an optional third parameter "allowOverlap" that is set to true by default. If this is changed to false, overlapping instances of the search string
should not be counted. */

//P: Two strings and a boolean
//R: A number

/*
- Working hypothesis: Doing a global regex search for the search string will produce the overlap allowed number of results, doing it with overlap = false 
    you have to search for them one at a time and replace them out with something else. Let me do some tests in the browser console to confirm.
    - Hm, no, the global search doesn't do overlaps. 'aaa' will match 'aa' only once. Hmmph.
    - OK, fine, other way around then. Overlap off is global regex search, otherwise keep looking for the substring and replacing it out until no longer present
*/


function searchSubstr(fullText, searchText, allowOverlap = true) {
    if (!searchText) {return 0}
    if (!allowOverlap) {
        let regex = new RegExp(searchText, "g")
        return fullText.match(searchText)?.length || 0
    }
    let result = 0
    for (let i = 0; i <= fullText.length - searchText.length; i++) {
        if (fullText.slice(i, i + searchText.length) === searchText) {
            result++
        }
    }
    return result
}


/* Right, the substitution plan was severely flawed, but nothing a good ol' for loop can't solve. */

/* Ok, this is an interesting solution as it contains a regex version of dealing with the overlap. Saving for future reference: */

function searchSubstr(fullText, searchText, allowOverlap) {
    return fullText && searchText ? fullText.match(new RegExp(allowOverlap ? `(?=${searchText})` : searchText, `g`) || []).length : 0;
  }