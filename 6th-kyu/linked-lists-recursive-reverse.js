/* Given a Node class for linked lists with a "data" and "next" property, write a function reverse() that recursively reverses the list (in-place).
I gave up on the iterative version of this, but let's see if I can work off its solutions. */

//P: A Node
//R: A Node

/* 
- So, the iterative solutions worked by iterating over a copy of the list and keeping track of the previous node, then updating the list's data and next to prev's data and next.
Recursively, that would mean having both as parameters and returning prev once current is null as the base case.
Then just do the same thing and reassign? */

function Node(data, next = null) {
    this.data = data === undefined ? null : data;
    this.next = next;
  }
  
  function reverse(head) {
    let prev = null
    const reverseIt = (cur, prev = null) => {
        if (!cur) {return prev}
        return reverseIt(cur.next, new Node(cur.data, prev))
    }
    return reverseIt(head)
  }

/* Lol except in this case it didn't need to be modified in-place, it wanted a return. No need to specify that in the description or anything. Ok then.
(Prev variable is now useless as that was for reassigning head's properties at the end, but I've submitted to Codewars like this so it stays.) */