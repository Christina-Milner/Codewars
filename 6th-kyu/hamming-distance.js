/* Given two strings, return the number of positions where they do not match. */

//P: Two strings
//R: A number

/*
- Can I assume strings are of equal length? (This is one of the annoying test setups where it won't show you anything after the first failed one.) Does
    it even matter?
    - No it does not, as long as we make sure to iterate up to the longer of the two
- Iterate over strings and check if char at that position is the same, if not, increment a total? Struggling to see what else there is to it.

*/


function hamming(a, b) {
    let total = 0;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        if (a[i] !== b[i]) {
            total++;
        }
    }
    return total;
}