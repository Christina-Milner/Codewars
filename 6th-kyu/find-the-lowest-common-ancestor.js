/* Given a Node that is the root of a tree and has an id, up, down, left and right property, return the lowest common ancestor of two Nodes. A Node is
its own LCA, Nodes in the same branch have one of the two as LCA, and Nodes in different branches have the pivot node where they join as LCA.*/

//P: Two Nodes
//R: A number (the ID of a Node)


/*
- This is a 6th kyu? Oof. I really should stop sorting by new.
- I'm mildly confused. The function I'm writing doesn't take in the root as a parameter, so where do I get it from?
- (Console logging input arguments) Ok no, the input isn't numbers, it's actually Nodes, updating above
- Ok, so, if node1.id == node2.id, we return that and are done
- Call .down on first node and keep calling right until hitting null - if second node id is in there, first node is the LCA
- That process needs to be repeated for all of first node's other children
- Calling .up on first node and calling right until hitting null finds all siblings - if second node is in there, the up node is the LCA
- 
*/



// PRELOADED
/*
class Node {
  constructor(id) {
    this.id = id;
    this.up = this.down = this.left = this.right = null;
  }
}
*/

function LCA(node1, node2) {
    console.log(node1.id, node2.id)
    if (node1.id === node2.id) {
        return node1.id
    }
    let children = []
    let child = node1.down
    while (child) {
        children.push(child)
        child = child.right
    }
    if (children.find(node => node.id === node2.id)) {
        return node1.id
    }
    let siblings = []
    let parent = node1.up
    let sibling = parent.down
    if (parent) {
        while (sibling) {
            siblings.push(sibling)
            sibling = sibling.right
        }
    }
    if (siblings.find(node => node.id === node2.id)) {
        return parent.id
    }
  }

/* Nope, not getting it. Forfeiting and looking at solutions: */

function LCA(node1, node2) {
	const visited = new Set([node1.id]);

        let currentNode = node1;

        while (currentNode !== null) {
                visited.add(currentNode.id);
                currentNode = currentNode.up;
        }

        currentNode = node2;

        while (!visited.has(currentNode.id)) {
		currentNode = currentNode.up;
	}

        return currentNode.id;
}

/* Mind blown. If we just keep going up from both nodes, we will eventually find a common point and can ignore the siblings.
Slightly more elaborate solution: */

function LCA(node1, node2) {
    //if LCA is itself (Test condition 1)
    if(node1.id === node2.id) return node1.id
    
    //if node1 or node2 is the root node
    if(node1.up == null) return node1.id
    if(node2.up == null) return node2.id
    
    //Ancestor-Descendant relationship (Test condition 2)
    let tempNode
    //assume node1 is the ancestor
    tempNode = node2
    while(tempNode.up != null){
        if(tempNode.id === node1.id) return node1.id
        tempNode = tempNode.up
    }
    //assume node2 is the ancestor
    tempNode = node1
    while(tempNode.up != null){
        if(tempNode.id === node2.id) return node2.id
        tempNode = tempNode.up
    }
    
    //Siblings relationship (Partially fulfills Test condition 3)
    if(node1.up.id === node2.up.id) return node1.up.id
    
    //Uncle/Aunt-Nephew/Niece or Cousins relationship (Test condition 3)
    let tempNode1 = node1
    let tempNode2 = node2
    while(tempNode1.up != null || tempNode2.up != null){
      //Steps up node1's branch by a level
      if(tempNode1.up != null) tempNode1 = tempNode1.up
      if(tempNode1.id === tempNode2.id) return tempNode1.id
      if(node1.up.id === node2.up.id) return node1.up.id
      //Steps up node2's branch by a level
      if(tempNode2.up != null) tempNode2 = tempNode2.up
      if(tempNode1.id === tempNode2.id) return tempNode2.id
      if(node1.up.id === node2.up.id) return node1.up.id
    }
    return 0
  }