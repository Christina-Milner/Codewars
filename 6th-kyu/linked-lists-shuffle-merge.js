/* Given a Node class for linked lists with a "data" and "next" property, write a function shuffleMerge() that takes in two Nodes and returns a new list created
by alternating elements of those two. Once one list runs out, append the rest of the other. If one list is null, return the other (including if both are null). */

//P: Two Nodes
//R: A Node

/*
- This sounds like I can either recycle front back split with minor adjustments, or solve it recursively with a helper that takes in the first list, the second list,
the new list (default null), and a counter or toggle that keeps track of which one we're currently meant to be adding to. Let's try recursion.
- Recycle the block that checks if one of the lists is null from "alternating split" - this needs to be outside the recursive function or it's going to cause
problems as the input lists get whittled down
- Recycle append
- Otherwise, call a recursive function with the 4 previously mentioned parameters
    - if the toggle is "one", create a new Node from the first list's data, make it the third list if null or append it if not
    - Then recursively call the function with first.next, second, new, "two"
    - If it is "two", same thing as above but with the second list
    - If first and second are null, return third
    - If first is null, append the entirety of second to third and set second to null
    - If second is null, append entirety of first to third and set first to null

*/
function Node(data) {
    this.data = data === undefined ? null : data;
    this.next = null;
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

function shuffleMerge(first, second) {
    if (!first || !second) {
        return first || second
    }

    const shuffleElements = (list1, list2, newList = null, toggle = 0) => {
        if (!list1 && !list2) {
            return newList
        }
        else if (!list1) {
            newList = append(newList, list2)
            return newList
        }
        else if (!list2) {
            newList = append(newList, list1)
            return newList
        }

        if (!toggle) {
            if (!newList) {
                newList = new Node(list1.data)
            } else {
                newList = append(newList, new Node(list1.data))
            }
            return shuffleElements(list1.next, list2, newList, 1)
        } else {
            if (!newList) {
                newList = new Node(list2.data)
            } else {
                newList = append(newList, new Node(list2.data))
            }
            return shuffleElements(list1, list2.next, newList, 0)
        }
    }
    return shuffleMerge(first, second)
  }

/* So apparently this was all this would have taken:
function Node(data = null, next = null) {
  this.data = data;
  this.next = next;
}

function shuffleMerge(first, second) {
  if (first == null) return second;
  if (second == null) return first;
  return new Node(first.data, shuffleMerge(second, first.next));
}

I feel a little dumb. But my solution does work ... */