/* Given a Node class for linked lists with a "data" and "next" property, and a Context class with a source and a dest property, write a function moveNode() that takes
a source linked list and a destination linked list and moves the first node of the source list to the destination list and returns a Context object with the new source and
destination. If the source list is empty, throw an error. */

//P: Two Nodes
//R: A Context object

/*
- Check for falsy source and throw error if present
- New source is the head node's .next
- New destination is a new Node with the moved node's data and the old destination as .next
*/

function Node(data, next = null) {
    this.data = data;
    this.next = next;
  }
  
  function Context(source, dest) {
    this.source = source;
    this.dest = dest;
  }
  
  function moveNode(source, dest) {
    try {
        const data = source.data
        source = source.next
        dest = new Node(data, dest)
        return new Context(source, dest);
      }
    catch {
        throw new Error()
    }
  }