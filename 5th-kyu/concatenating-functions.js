/* Write a function pipe() such that the behaviour of doing multiple operations separated by pipes in the terminal can be emulated.
Terminal: ls -la | sort | head
JS: fn1.pipe(fn2)
This only needs to support functions with one parameter, but it does need to work for an arbitrary number of functions.
Actually - it's meant to be a method for the Function prototype. */

//P: A function
//R: A function? I think?


/*
- Lovely, another one of those with no sample tests. 
- Nope, I have no idea. Am utterly thrown by the fact that the functions' arguments don't show up anywhere in this. Don't have time to pick another problem, so forfeiting.

*/


Function.prototype.pipe = function (fn) {
    const currentFunction = this;
  
    return function (input) {
      return fn(currentFunction(input));
    };
  };

/* That one is very close to the first thing I tried, except I didn't think to copy "this" before moving into the inside function definition where it would no longer be
referring to the right thing. */

