/* You are given a function createFunctions() that is meant to take in a number and return an array of functions each returning their index in the array.
In the current state, it doesn't work. Fix it. */

//P: A number
//R: An array of functions

/* Provided code:
function createFunctions(n) {
  var callbacks = [];

  for (var i=0; i<n; i++) {
    callbacks.push(function() {
      return i;
    });
  }
  return callbacks;
}

*/

/*
- I actually don't have much of a thought process to show here as I just kind of tinkered with it a bit
- When using the function as provided, createFunctions(5) returns an array of 5 functions that each return 5 instead of their index
- I haven't the foggiest why, but thought I'd rewrite it to how I would do this and see if that had the same problem, and, well... it doesn't.
*/

function createFunctions(n) {
    let callbacks = Array.from({length: n}, (_, i) => i)
    return callbacks.map((e, i) => function() {return i})
  }

/* The top solution seems to be using the provided code, but with "var i = 0" replaced with "let i = 0". I mean, we don't use var anymore, full stop, (and the "scopes"
part of the title did have me suspecting it was part of the problem) but I'm bemused as to how that made i become n. */