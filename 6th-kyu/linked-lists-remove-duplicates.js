/* Given a Node class for linked lists with a "data" and "next" property, write a function removeDuplicates() that takes a sorted list (increasing order), deletes
duplicate nodes from the list and returns the head of the resulting list. */

//P: A Node
//R: A Node

/* 
- I could convert the list to an array again and then filter duplicates, but that shouldn't be necessary
- To delete a node, I have to remember the one that came previously. If the current one's data is equal to that one, it gets connected to the next one.
    - Recursively, so it then does the same check
*/

function Node(data) {
    this.data = data;
    this.next = null;
  }
    
  
function removeDuplicates(head) {
  if (!head || !head.next) {
    return head;
  }
  
  let current = head;
  
  while (current.next !== null) {
    if (current.data === current.next.data) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  
  return head;
}

/* Couldn't get this to work with either recursion or the previous "map to array" strategy (max call stack exceeded). Had to do it iteratively, but no idea why that
doesn't blow up. */