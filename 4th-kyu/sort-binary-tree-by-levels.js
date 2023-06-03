/* Given a binary tree built like this:
class Node { 
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left  = left;
    this.right = right;
  }
}
return an array of its values by levels, i.e.:
       1
    2    5
  3  4  6  7
  would return [1, 2, 5, 3, 4, 6, 7]

If root is null, return an empty array. */

//P: A Node
//R: An array

/*
- I remember enough DSA to know this is a breadth-first search, but unfortunately not what that means
- I want to push the root's value into a result array and have both its branches somehow flagged as "up next"
- And this is probably going to be recursive because it usually is with trees
- Hm. Push root value into result array, push non-null branches into another array
- Shift elements from that array, pushing their values into result array and their branches into the current array
- Stop when that array is empty and return result array
- This doesn't actually sound recursive. Let's see.
*/


function treeByLevels(rootNode) {
    let result = []
    let toCheck = []
	if (!rootNode) {return result}
    result.push(rootNode.value)
    toCheck.push(rootNode.left, rootNode.right)
    while (toCheck.length) {
        const current = toCheck.shift()
        if (current) {
            result.push(current.value)
            toCheck.push(current.left, current.right)
        }
    }
    return result
}

/* Mildly astonished that's all there is to it. Yay! */