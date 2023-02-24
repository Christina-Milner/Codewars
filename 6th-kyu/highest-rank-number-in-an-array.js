/* Given an array of numbers, return the number which is most frequent. If there is a tie, return the largest number. */

//P: An array of numbers
//R: A number

/*
- Write sort function that compares by frequency (filter length) first and value descending second
- Sort copy of array and return first element
*/

function highestRank(arr){
    const sortMe = (a, b, arr) => {
        if (arr.filter(e => e == a).length == arr.filter(e => e == b).length) {
            return b - a
        }
        return arr.filter(e => e == b).length - arr.filter(e => e == a).length
    }
    return arr.slice().sort((a, b) => sortMe(a, b, arr))[0]
}