/* Given two arrays a and b, subtract b from a, i.e. remove all elements from a that are present in b but keep the original order of the remaining elements intact.
Example: 
arrayDiff([1,2,2,2,3],[2]) == [1,3]
*/

//P: Two arrays (of numbers based on sample tests, but who knows)
//R: One array

/* This seems like a pretty straightforward case of filtering a by elements not present in b.
Not sure how that is going to behave if a is empty, might have to add a check for it. */

function arrayDiff(a, b) {
    return a.filter(e => !b.includes(e))
}

/* Yep, that's all it is. The difficulty on these does seem to be a bit all over the place. */