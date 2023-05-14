/* Given a Node that is the beginning of a linked list (with the next property and getNext() method to access the next Node), return the length of the loop.
Node A, next = A - Loop is 1
Node A => B => C => A - Loop is 3
A => B => C => D => E => C - Loop is still 3, ignore the dangly bit.
*/

//P: A Node
//R: A number

/*
- Did a bit of console logging to have a look at those Node objects as the class definition isn't provided. They don't seem to have a "name" property
    or anything other than "next", really
- First test is A with A.next also being A. Console.log for node == node.next comes up as true, so we can use that
- So, could initialise a variable as 1, return it when current node equals next, and increment it as we move down the chain
- But that wouldn't adress the (ahem) "dangly bits" correctly - it would go into an infinite loop as it never loops back to the Node we started with
- Can we push the nodes into an array? Push every node in as we see it - if we encounter a next that's already present in the array, slice off whatever came
    before it and return the length of the array? Let's see.
*/


function loop_size(node){
    let nodesSeen = []
    let current = node
    while (true) {
        let next = current.next
        nodesSeen.push(current)
        if (nodesSeen.includes(next)) {
            nodesSeen = nodesSeen.slice(nodesSeen.indexOf(next))
            break
        }
        current = current.next
    }
    return nodesSeen.length
}

/* Above passes fixeds but fails on large random test. New attempt after asking for some help: */

function loop_size(node){
    let slowPointer = node
    let fastPointer = node.next
    while (true) {
        if (slowPointer == fastPointer) {
            let count = 1
            slowPointer = slowPointer.next
            while (slowPointer !== fastPointer) {
                slowPointer = slowPointer.next
                count++
            }
            return count
        }
        slowPointer = slowPointer.next
        fastPointer = fastPointer.next.next
    }
    return 0
}