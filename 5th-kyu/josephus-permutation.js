/* Given an array (of whatever) and a number n, repeatedly remove every nth element of the array and put it into a new array, then return the new array.
Example: [1,2,3,4,5,6,7], 3
Third element is 3 -> goes out first
Next 3rd element is 6 -> goes out next
We then loop around, so 7, 1, 2 -> 2 goes out next
And so on, result: [3,6,2,7,5,1,4]

It is not entirely clear from the description whether we should actually be mutating the input array to this ("array/list of items to be permuted"), 
but I assume no. If yes, I'll just iterate over the new array I created and replace the elements of the original array with it. */

//P: An array and a number
//R: An array

/*
- Create new array
- Make copy of old one I guess so we're not mutating it?
- Initialise counter to n
- While old array is not empty:
    - Push element at counter - 1 into new array
    - Splice it out of original array
    - Increment counter by n, making sure to loop around correctly
- Return new array
*/

/* Thought process:

function josephus(items, k) {
    let copy = items.slice()
    let result = []
    let carry = 0
    while (copy.length) {
        let indexes = []
        for (let i = k - 1 - carry; i < copy.length; i += k) {
            result.push(copy[i])
            indexes.push(i)
        }
        if (indexes.length) {
            carry = copy.length - 1 - indexes[indexes.length - 1]
        }
        for (let idx of indexes.reverse()) {
            copy.splice(idx, 1)
        }
      
        if (copy.length == 1) {
            result = result.concat(copy)
            copy = []
        }
        else if (copy.length && copy.length < k) {
            console.log("ONE LOOP")
            console.log("Copy ", copy, "Result ", result, k % copy.length, carry)
            let remaining = k % copy.length
            let index = remaining ? remaining - 1 : copy.length - 1
            index = index + carry > copy.length - 1 ? index + carry - copy.length : index + carry
            console.log("Index, carry", index, carry)
            result.push(copy[index])
            carry = index
            copy.splice(index, 1)
            console.log("Copy ", copy, "Result ", result, k % copy.length, carry)
        }

    }
    return result
  }

  Actual solution: */

  function josephus(items, k) {
    let result = [];
    let index = 0;
  
    while (items.length > 0) {
      index = (index + k - 1) % items.length;
      result.push(items.splice(index, 1)[0]);
    }
  
    return result;
  }

  /* Looks simple, but this kata was a nightmare and a half */
