/* Write a function once() that takes another function as its argument and returns a version of that function that can only be called once. Subsequent calls
should have no effect/return undefined.
Example: 
logOnce = once(console.log)
logOnce("foo") // -> "foo"
logOnce("bar") // -> no effect
*/

//P: A function
//R: A function

/*
- A 6th kyu where I don't really know right off the bat how to do it, this is new
- First idea: Put the input function in an array in the outer function. Have the inner function return array.pop(). 


*/


function once(fn) {
    let fns = [fn]
    return (...args) => fns.length ? fns.pop()(...args) : undefined
  }

/* Yup. Had to tinker with it a bit to get the syntax right (using spread operator so it behaves correctly with multiple parameters, needing to include the ternary as pop()() will otherwise throw errors when array is empty),
but that was the general idea. */
/* Noting this down for reference as while it doesn't matter whether one uses my array solution or a true/false flag to mark whether the function has been called, the use of apply is interesting: */

function once(fn) { 
    let x = false;
        return function(...arguments) { 
            if (!x) { 
                x = true;
                return fn.apply(this,arguments);
            }
        }
    }