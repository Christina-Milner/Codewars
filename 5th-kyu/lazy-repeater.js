/* Write a function makeLooper that takes in a string and returns a function. The returned function should cycle through the letters of the string when called, i.e.:
let abc = makeLooper('abc')
abc() => 'a'
abc() => 'b'
abc() => 'c'
abc() => 'a'
*/

//P: A string
//R: A function

/*
- Ok, had to test out in the console whether simply making str the function name would work. It does.
- I'm thinking the inner function contains the string and contains a counter that gets initialised at zero
- ... sadly, incrementing the counter after returning something does not work and if it gets incremented on the first call, it won't work right
- So... initialise it at -1?
- Then have each call to the function increment the counter and return the element at that index in the string
- Could use the modulo to handle the wrap-around... or just reset it back to -1 once it goes out of bounds
- No, I'm daft, initialising the counter at -1  would set it to that value on every call, and if I do it outside the function, not sure it has access to it? Let's see
*/


function makeLooper(str) {
    let fnArr = str.split('').map(char => function() {return char})
    return function str() {
        fnArr.push(fnArr[0])
        return fnArr.shift()()
    }
  }

/* Realised the above plan didn't work as intended and came up with the idea of creating an array of functions from the string.
  Why that gets modified correctly on each call to the inner function while the counter didn't is a little beyond me, but saw
  from the first attempt that it does work, I just need to push the first element back in at the end before shifting it to handle the wrap-around. 
  ... Ok, now I'm super confused as the top solutions by other people do all use my counter principle. 
  I think it has to do with the fact I got hung up on calling the function "str" instead of returning an anonymous function. But how do those get called
  using the original string? */