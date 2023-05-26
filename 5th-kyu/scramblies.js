/* Given two strings, return true if part of the first string's characters can be rearranged to form the second, otherwise false.
Only lowercase letters and no punctuation will be used. Performance matters. */

//P: Two strings
//R: A boolean

/*
- I would say iterate over the second string and check if the count of each of its letters is the same or greater in the first? But maybe that's not good enough for the performance? Let's see.

*/


function scramble(str1, str2) {
    const letters = Array.from(new Set(str2.split('')))
    return letters.every(e => str1.split('').filter(f => f === e).length >= str2.split('').filter(g => g === e).length)
  }


/* That took 11 something seconds when the timeout limit is at 12, but I'll take it. */