/* Write a function that takes in a string. If no argument is passed in, a string concatenating all previous arguments should be returned. There will always
be at least 1 string passed in. */

//P: A string or nothing
//R: A string

/* 
- Actually had to play with it a bit to get an idea of how it works before even trying to figure it out
- So the function has to return a string if no argument is passed, otherwise return a function or the chained calls will not work
- How the hell does a class (author's tip) figure into this?
- What if the subfunction takes in an array 

*/
let str

function createMessage() {
    if (![...arguments].length) {
        let newStr = str
        str = ""
        return newStr
    }
    if (!str) {
        str = [...arguments][0]
    } else {
        str += " " + [...arguments][0]
    }
    return createMessage
  }

/* Yeah sorry for useless PREP, I really had to figure this one out by playing with it. Above, I simply declare a string outside the function to save
the function parameters in, and then wipe it when a string is returned to solve the problem of the content for multiple tests ending up in it.

I'd tried to use a closure properly but failed on "... is not a function" because I was returning the inner function rather than a call to it with the outer function's arguments.
Proper closure version for reference, courtesy of ChatGPT (it uses trim as for some reason it refused to use my method of checking whether it's the first thing to go into the string): */

function createMessage() {
  let message = "";

  function inner(...args) {
    if (args.length === 0) {
      return message.trim();
    } else {
      message += args[0] + " ";
      return inner;
    }
  }

  return inner(...arguments);
}