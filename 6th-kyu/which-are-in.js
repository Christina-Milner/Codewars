/* Given two arrays of strings, return an array of the strings of array 1 in lexicographical order that are substrings of strings of a2.
Instructions say in some languages, the return array must be without duplicates, but I don't know if JS is one of those. */

//P: Two arrays of strings
//R: An array of strings

/*
- So the obvious solution is to initialise a new array (maybe a Set depending on duplicates condition), iterate over the strings of array 1 and for each of them, 
    iterate over the strings of array 2 and check the substring condition, push into result array if present, then sort and return
- That sounds slow as heck though. Can we just join array 2 together and check against that? Let's see.

*/


function inArray(array1, array2) {
    const array2Str = array2.join(' ')
    let result = new Set()
    for (let str of array1) {
        if (array2Str.includes(str)) {
            result.add(str)
        }
    }
    return Array.from(result).sort((a, b) => a.localeCompare(b))
  }

/* Yes we can!*/