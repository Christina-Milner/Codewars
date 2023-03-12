/* Given a Node class for linked lists with a "data" and "next" property, write a function sortedIntersect that takes in two Nodes sorte din increasing order
and returns the list that forms the intersect of both, with no duplicates.
Example:
var first = 1 -> 2 -> 2 -> 3 -> 3 -> 6 -> null
var second = 1 -> 3 -> 4 -> 5 -> -> 6 -> null
sortedIntersect(first, second) === 1 -> 3 -> 6 -> null

*/

//P: Two Nodes
//R: A Node

/*
Ok, so ... if the current Nodes have equal data, we want to add it to the result list once and move on to the .next of both.
If one is smaller than the other, we don't do anything with the result and move on to the .next of only that list.


*/


function Node(data, next = null) {
    this.data = data === undefined ? null : data;
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

function sortedIntersect(first, second, third = null) {
    if (!first || !second) {return third}
    if (first.data == second.data) {
        if (!third || third.data !== first.data) {
                return sortedIntersect(first.next, second.next, append(third, new Node(first.data)))
            }
        else {
            return sortedIntersect(first.next, second.next, third)
        }
        }
    else if (first.data > second.data) {
        return sortedIntersect(first, second.next, third)
    }
    else {
        return sortedIntersect(first.next, second, third)
    }
}

/* That works, only had to add an extra if block to correctly avoid duplication in case both lists are just the same number over and over. 
I would've liked to write the kind of solution used in sorted merge, avoiding having to use append, but I can't quite wrap my head around it. */