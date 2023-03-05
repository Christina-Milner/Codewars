/* Given a Node class for linked lists with a "data" and "next" property, write a function append() that takes two linked lists as parameters and 
appends the second to the first and returns the head of the new list. If both lists are null, return null. If one list is null and the other isn't,
return the one that isn't. */

//P: Two Nodes
//R: A Node

/* 
- Check for either being null and return directly if so
- Write recursive helper that takes in two Nodes and sets the first Node's next to the second Node if it is currently null (and moves on to the
    next one if it isn't)
- Return head
*/

function Node(data, next = null) {
    this.data = data;
    this.next = next;
  }
  
function append(listA, listB) {
    if (!listA || !listB) {
      return listA || listB
    }
    const appendIt = (node1, node2) => {
      if (!node1.next) {
        node1.next = node2
      }
      else {appendIt(node1.next, node2)}
    }
    appendIt(listA, listB)
    return listA
  }

/* I still don't quite understand how these linked list shenanigans work, but I seem to be figuring out how to work them regardless.
For reference, slightly simplified solution:
function Node(data) {
  this.data = data;
  this.next = null;
}

function append(a,b) {
  if(!a)return b;
  a.next=append(a.next,b);
  return a;
}
 */