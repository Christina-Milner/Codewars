/* Given an array of integers, turn it into a tree. First element becomes its root node, second element the root's left branch, third element the root's right branch,
fourth the left node's left child, and so on. 
The class is provided:
var TreeNode = function(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
};

*/

//P: An array of numbers
//R: A TreeNode

/* 
- Hmmm. This kind of thing normally ends up being recursive, but that leads to the problem that we'd end up with the last child node, but want to return the root.
- Let's see. Declare a TreeNode with the array's first element as the value.
- Empty array apparently expects undefined so check for that
- Root is now current node. As long as there are more array elements, check if current left is present
    - If no, it goes there, if yes, check if current right is there, same thing
- Once current has a right and left, its left becomes current and the same thing repeats
- But how to then move back up and over to the right branch instead of descending another level?
- Gotta pass the "pending" branch in somehow
*/



function arrayToTree(array) {
    let copy = array.slice()
    let root
    if (!array.length)  {return root}
    root = new TreeNode(copy.shift())
    let current = [root]
    while (copy.length) {
        let currentNode = current[0]
        if (!currentNode.left) {
            currentNode.left = new TreeNode(copy.shift())
        }
        else if (!currentNode.right) {
            currentNode.right = new TreeNode(copy.shift())
        }
        else {
            let temp = current.shift()
            current.push(temp.left, temp.right)
        }
    }
    return root
}

/* I thought that else block would need something more and was fully prepared to upload this as WIP as I have limited time, but ... it actually works just like that. Yay! */