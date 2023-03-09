/* Given a Node class for linked lists with a "data" and "next" property, write a function frontBackSplit() that takes in source, front and back as parameters and doesn't return anything, but modifies front and back
to the correct lists - splitting the original list in half (if odd, extra element goes in the front).  Throw an error if any of the arguments are null or the source list has fewer than 2 elements. */

//P: 3 Nodes
//R: Nothing

/*
- First problem - if the original source input has fewer than 2 elements, we want to throw an error, but while distributing the list, we do need to deal with the last 2 elements. I guess we don't do recursion here.
- Check for null first (including source.next will cover the <2 elements case)
- Find out length of source node - could do the array hack again, but a recursive function that increments a counter and returns it when it hits null will do (base this on .next rather than .data or null gets counted)
- Initialise a variable for the length of the first list, set to 0
- Nest 2 while loops:
    - Outer while loop runs while source isn't null
    - While firstList variable is less than half the original list length rounded up:
        - If front.data is falsy, replace front with new node of current data
        - Otherwise, append it (recycling append from previous kata again)
    - Once variable has reached that value, do the same thing for back.
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
  
function frontBackSplit(source, front, back) {
    if (!source || !front || !back || (source && !source.next)) {
        throw new Error("Nope!")
    }
    const countElements = (node, acc = 0) => {
        if (!node) {return acc}
        return countElements(node.next, acc + 1)
    }

    const firstHalfLength = Math.ceil(countElements(source) / 2)
    let firstHalfcur = 0
    while (source) {
        while (firstHalfcur < firstHalfLength) {
            if (!front.data) {
                front.data = source.data
            }
            else {
                front = append(front, new Node(source.data))
            }
            firstHalfcur++
            source = source.next
        }
        if (!back.data) {
            back.data = source.data
        }
        else {
            back = append(back, new Node(source.data))
        }
        source = source.next
    }
  }

  /* Ayyyyy! The counter needed to be based on !node rather than !node.next after all. 
  Biggest issue was I was getting the right values into front and back but the tests couldn't read them because of object references and scoping and whatever.
  Dawned on me after reading the discussions that I needed to modify the blank Node passed in rather than replace it with a new one. Why overwriting from the second step
  onwards works is beyond me. */