/* Write the functions push() and buildONeTwoThree() to update and initialize linked lists. Linked lists are given as a Node class definition that accepts a 
data parameter and has a property "next" that is null by default. Push takes head and data as parameters and buildOneTwoThree doesn't take any. */

//P: ??
//R: ??

/* I don't really understand the problem, like what these functions are supposed to return. The use of "8 -> 1 -> 2 -> 3" instead of something that
actually means anything in Javascript in the description does not help.
- Am going to assume push is meant for updating. That means it creates a new Node with the current head as next and data as data? But then why not just put
next in the constructor (with null as default)? And returning a new node isn't really updating anything, is it?
- I have no idea what buildOneTwoThree is supposed to do. ~~Will have to find out via tests.~~ Reading helps -> it should actually create a list with the nodes
 1 -> 2 -> 3 -> null. Why would you hardcode this?
And why wouldn't we define push as a method of the Node class?!
*/

function Node(data) {
    this.data = data;
    this.next = null;
  }
  
  function push(head, data) {
    let list = new Node(data)
    list.next = head
    return list
  }
  
  function buildOneTwoThree() {
    let list = new Node(3)
    list = push(list, 2)
    list = push(list, 1)
    return list
  }

/* Ok, got it. Don't think I've ever been this confused by a 7th kyu before (only did this one because I wanted to do its 6th kyu follow-up, but they go in an order). 
I see the top solutions all rewrote the Node class to add the head as a parameter. Not sure why I thought I couldn't do that. */