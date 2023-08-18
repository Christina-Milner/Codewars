/* Given a n x n 2-dimensional array where 0s are empty squares and there is one mine indicated by a 1, return the row, column coordinates of the mine. */

//P: An array of arrays of numbers
//R: An array of numbers

/*
- Ok, this is not hard at all in principle, but how to most elegantly extract the "coordinates" of the one 1?
- The obvious solution would be iterating over the array's rows and pushing the current row's index into a result array if it contains a non-falsy element,
    then iterating over that row and doing the same thing with the element's index
- Can we turn that whole process into a reduce? 
    - Initial value would be the empty array
    - If current element has all falsy elements, return accumulator
    - If not, return [current index, indexOf...]
- It's a pity indexOf doesn't accept a callback like find does, otherwise this would just be [indexOf(this thing in array), indexOf(the thing in subarray)]
- Could map the array to join the rows so it becomes an array of strings instead of a 2D array, then use indexOf(find thing with 1), indexOf(1 inside string), but that
    doesn't scream "elegant"
*/




function mineLocation(field){
     return field.reduce((acc, cur, idx) => {
        if (cur.every(e => !e)) {return acc}
        return [idx, cur.indexOf(1)]
     }, [])
  }