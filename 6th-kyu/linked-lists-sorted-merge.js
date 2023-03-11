/* Given a Node class for linked lists with a "data" and "next" property, write a function sortedMerge that takes in two already sorted lists
and merges them into one, once again sorted in increasing order. If one of the input lists is null, the output should be the other list, even if it
is also null. */

//P: Two Nodes
//R: A Node

/*
- From what I've seen looking at others' solutions in the previous kata, I don't need to explicitly check for null, it'll sort itself out
- With the lists pre-sorted, this seems like a good case for recursion.
- Parameters are the two lists and the third, which starts as null
- If both the first two lists are null, return the third
- Otherwise, check if first or second data is smaller.
    - If third is null, recursively call the function with .next of whichever list the node was from and third being that Node
    - Otherwise, third.next is the recursive call
*/

function Node(data, next = null) {
  this.data = data === undefined ? null : data;
  this.next = next;
}

function sortedMerge(first, second) {
    if (!first) {
        return second
    }
    if (!second) {
        return first
    }
    if (first.data <= second.data) {
        return new Node(first.data, sortedMerge(first.next, second))
    }
    else {
        return new Node(second.data, sortedMerge(first, second.next))
    }
}

/* Didn't follow my PREP, because I very quickly ran into the "wait, how does the recursive call correctly set .next" problem.
Instead just adapted the solution I'd admired on shuffleMerge. */