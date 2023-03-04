/* Given a Node class for linked lists with a "data" and "next" property, write a function InsertSort() that rearranges nodes in a linked list so they are sorted in
increasing order. The head node will be null, a single node, or a list, and if one of the former two is passed in, the same thing should be returned. */

//P: A Node (or null)
//R: A Node

/*
- Add next to Node class definition
- If head or head.next are falsy, return head
- Add data values of list to array, sort array in descending order (so we can use pop rather than unshift)
- Create new linked list with head being the last array item and using pop to add the next value as next until array is empty, then it is null
- Return head
*/

function Node(data, next = null) {
    this.data = data;
    this.next = next;
  }
  
function insertSort(head) {
    if (!head || !head.next) {return head}
    let values = []
    const addValueToArr = node => {
      if (!node) {return}
      values.push(node.data)
      addValueToArr(node.next)
    }
    addValueToArr(head)
    values.sort((a, b) => a - b)
    const arrToList = (arr, prevNode = null) => {
      if (!arr.length) {return prevNode}
      let node = new Node(arr.pop(), prevNode)
      return arrToList(arr, node)
    }
    return arrToList(values)
}

/* This could've been a lot simpler using the "sortedInsert" function from the last kata, but I couldn't quite wrap my head around how that would work.
For reference, this is how: 
function insertSort(head) {
  if(!head) return null;
  let sorted = new Node(head.data);
  while(head = head.next) sorted = sortedInsert(sorted, head.data);
  return sorted;
}
*/