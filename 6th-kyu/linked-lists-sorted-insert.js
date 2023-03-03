/* Given a Node class for linked lists with a "data" and "next" property, write a function SortedInsert() that takes the head of a linked list and the data for a new Node
as parameters and inserts the node at the appropriate place in the (pre-sorted) list. */

//P: A Node and a number
//R: A Node

/* 
- Add next parameter to the Node class (default value null)
- If the head is null, it becomes the new node
- If not, compare its data to the data to be inserted
    - If data to be inserted is smaller than current head, head becomes a new Node with current head as next
- If not, recursively call function until this is the case
*/

function Node(data, next = null) {
    this.data = data;
    this.next = next;
  }
  
function sortedInsert(head, data) {
    if (!head) {
        head = new Node(data)
    }
    else if (data < head.data) {
        head = new Node(data, head)
    } else {
        head.next = sortedInsert(head.next, data)
    }
    return head
}