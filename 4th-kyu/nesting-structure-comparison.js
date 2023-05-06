/* Complete the array method sameStructureAs() so that it returns true if the input array has the same length and structure as the array the method is called on
and false otherwise. A function isArray() is provided.
Examples: 
 // should return true
[ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );          
[ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] );  

 // should return false 
[ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );  
[ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] );  

// should return true
[ [ [ ], [ ] ] ].sameStructureAs( [ [ [ ], [ ] ] ] ); 

// should return false
[ [ [ ], [ ] ] ].sameStructureAs( [ [ 1, 1 ] ] );   
*/

//P: An array
//R: A boolean

/*
- If input array isn't same length as this, instant false
- Otherwise, create copies of both
- Iterate over copies
    - If one element is an array and the other isn't, return false
    - If both aren't, keep going
    - If both are arrays, check if length is equal
    - If not, false
    - If so, run on elements of subarrays
- So, a recursive function of some sort
- Also, we only need to make copies if we're going to use shift or pop (which I thought I was going to), but not if just iterating over them
*/


Array.prototype.sameStructureAs = function(other) {
    if (this.length !== other.length) {
        return false
    }
    for (let i = 0; i < this.length; i++) {
        let el = this[i], el2 = other[i]
        if (isArray(el) && !isArray(el2) || !isArray(el) && isArray(el2)) {
            return false
        }
        if (isArray(el) && isArray(el2)) {
            if (!el.sameStructureAs(el2)) {
                return false
            }
        }
    }
    return true
}
