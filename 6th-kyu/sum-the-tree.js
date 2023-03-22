/* Given a node object representing a binary tree with the properties value, left and right, write a function that sums all the values including the root. */

//P: A Node
//R: An integer

/*
Argh ow my brain why do I keep doing these
- The function needs to visit all nodes and keep track of which ones it's visited
- For each node, add the current value to an accumulator and any non-null branches to toVisit
- Return when toVisit is empty, profit?
*/


function sumTheTreeValues(root){
    const nodes = []
    const sumNodes = node => {    
        if (node) {
            sumNodes(node.left)
            nodes.push(node.value)
            sumNodes(node.right)
        }
        return nodes
    }
    return sumNodes(root).reduce((a, b) => a + b, 0)
}

/* Yeah so forget everything I said above, god knows how you'd get that to work. Looked up a freeCodeCamp article on binary trees
the code of which didn't even work (they initialised the array inside the recursive function so it only ever held one element), but
was able to figure it out from there. For reference, this would have also worked: */

function sumTheTreeValues(root) {
    return !root ? 0 : root.value + sumTheTreeValues(root.left) + sumTheTreeValues(root.right);
  }