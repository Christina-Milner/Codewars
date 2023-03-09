/* Given a Node class for linked lists with a "data" and "next" property and a Context object with a "first" and "second" property, write a function
alternatingSplit that takes in a Node (linked list) and returns a Context object containing two new linked lists created by alternately taking elements 
out of the original one. Return an error if the Node passed in is null or a single node.
Example:  If the original list is a -> b -> a -> b -> a -> null then one sublist should be a -> a -> a -> null and the other should be b -> b -> null.
*/

//P: A Node
//R: A Context object with a Node each as its first and second property

/*
- Hmm. Use recursion, a while loop, or converting the list to an array? Let's try recursion
- Example 1 -> 2 -> 3 -> 4 -> 5 -> null, should turn into 1 - 3- 5 - null and 2- 4 - null
- Function that takes in 3 Nodes (the original list, new sublist 1, new sublist 2, both the latter null by default) and a counter (0 by default)
    - Take data of first parameter, so 1
    - Counter is even, so it goes into first sublist. 
    - Create new Node with data 1 and next currently null
    - recursively call function on 1.next, new node, list2 (still null), counter 1
    - This process repeats except it now goes into list 2, so new Node(2, null) gets placed in list 2
    - We hit 3. This now needs to be made the .next of the head in list 1, but the head stays what the function is called on
    - We hit 4, same thing as previous step but it becomes .next of the head of list 2
    - We hit 5. How do we attach it to the right place in list 1 when we need to return the head at the end?
    - I suppose i use the append function from a previous kata?
    - Base case is we reach null: Should be able to just return as the new Nodes we've been creating have a .next of null by default
*/

function Node(data, next = null) {
    this.data = data;
    this.next = next;
  }
  
function Context(first, second) {
    this.first = first;
    this.second = second;
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

function alternatingSplit(head) {
    if (!head || !head.next) {
        throw new Error("Nope")
    }
    const distributeNodes = (original, list1 = null, list2 = null, count = 0) => {
        if (!original) {
            return new Context(list1, list2)
        }
        let listToAppend = count % 2 == 0 ? list1 : list2
        let node = new Node(original.data)
        listToAppend = append(listToAppend, node)
        if (count % 2 == 0) {
            return distributeNodes(original.next, listToAppend, list2, count + 1)
        } else {
            return distributeNodes(original.next, list1, listToAppend, count + 1)
        }
        
    }
    return distributeNodes(head)
  }