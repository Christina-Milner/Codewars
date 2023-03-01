/* Given a Node class that takes data as a parameter and has the properties data and next, write a function that
 returns the number of nodes in a list (taking the head as parameter), and one that counts the occurrences of an integer in a linked list (taking the head and data
    as parameters). */

//P: A Node for the length function, a Node and an integer for the count function
//R: A number in both cases

/* 
- Length screams recursion. Return the acc when next is null, otherwise increment acc and call the function on the next node.
- Count can then presumably work the same way, except it only increments the acc when current data equals the data parameter
*/

function Node(data) {
    this.data = data;
    this.next = null;
  }
  
function length(head, acc = 0) {
    if (head == null) {return acc}
    return length(head.next, acc + 1)
}

function count(head, data, acc = 0) {
    if (head == null) {return acc}
    if (head.data == data) {acc++}
    return count(head.next, data, acc)
}