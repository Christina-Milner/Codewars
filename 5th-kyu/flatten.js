/* Given any number of arguments that can be whatever, return an array of those elements with any arrays flattened into their elements (no matter how deeply nested). */

//P: literally anything
//R: An array

/*
- Iterate over the arguments array and push anything that isn't also an array into a result array
- Elements that are arrays require some kind of recursive call on them to flatten them out
- Let's see if I can remember how to add an accumulator argument to the end when the previous arguments aren't specified
*/


function flatten(...args) {
    let result = []
    const flattener = (arr, acc = []) => {
        if (!arr.length) {
            return acc
        }
        let first = arr.shift()
        if (!Array.isArray(first)) {
            acc.push(first)
        } else {
            acc = acc.concat(flattener(first))
        }
        return flattener(arr, acc)
    }
    for (let arg of args) {
        if (!Array.isArray(arg)) {
            result.push(arg)
        }
        else {
            result = result.concat(flattener(arg))
        }
    }
    return result
  }

/* That works, but I feel like that should've been doable without the helper. It misbehaved when I tried to make the outer function recursive, though. Let's see.
Aaah, I think the problem was passing the array into the recursive call instead of using the spread operator. Also, should've used reduce. Doh. */
