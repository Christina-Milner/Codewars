/* Given a Node class for linked lists with a "data" and "next" property, write a function GetNth that takes a Node and an index as parameters and returns the Node
at that index position. If the index does not exist, throw an error. */

//P: A Node and an index
//R: A Node 

/*
Recursion, let's go. If accumulator matches the index, spit out the current Node. If not, increment it by one and recursively call on this Node's next.
If it's lower but current node is null, throw an error. */

function Node(data) {
    this.data = data;
    this.next = null;
  }
  
function getNth(node, index, acc = 0) {
    if (!node) {throw 'Nope'}
    if (index == acc) {return node}
    return getNth(node.next, index, acc + 1)
}

