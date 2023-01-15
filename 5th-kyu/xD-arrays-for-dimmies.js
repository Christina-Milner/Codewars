/* Given 2 arguments d and value, return an array of length d where each element is value.
With multiple d arguments, return nested arrays, example: 
dim( 3,3,"x" ) // => [['x','x','x'],['x','x','x'],['x','x','x']]
value may be a function. */

//P: An unspecified number of arguments. The last can be a string, number, or function, the rest are numbers.
//R: An array, content depends on value input

/*
This screams recursive function to me.
- Take [...arguments] array
- Slice off last element (value)
- Recursive function takes array and value, with value default being the value from the previous step
- Takes last element of array and makes an array of that length filled with value
- Calls itself with array created in previous step as the new value
- Return once array is empty

I have no idea how this will behave with functions as values, will have to try it out and see.
*/

function dim() {
    let arrayArgs = [...arguments]
    const value = arrayArgs.pop()

    const arrayMaker = (arr, val = value) => {
        if (!arr.length) {return val}
        let d = arr.pop()
        return arrayMaker(arr, Array(d).fill(val))
    }

    return arrayMaker(arrayArgs, value)
}

/* The above was working for anything where value wasn't a function. I know exactly why it failed in those cases -
an array was created once and filled with function(x), but then copied on each subsequent iteration, which failed the
"if the function returns something random, the subarrays should differ" requirement. I rewrote it to use reduce,
same problem. I rewrote it to create the array structure filled with 0 and then go through and map everything to
the desired value (like this):

function dim() {
    let arrayArgs = [...arguments]
    console.log(arguments)
    const value = arrayArgs.pop()
    const baseLength = arrayArgs.pop()

    let emptyArr = arrayArgs.reduce((a, b) => Array(b).fill(a), Array(baseLength).fill(0))
    
    const mapper = el => {
      if (typeof(el) == "object") {
        return el.map(e => mapper(e))
      }
      return value
    }
    console.log(emptyArr.map(e => mapper(e)))
    return emptyArr.map(e => mapper(e))
}

but that still didn't work and the kata is making it very hard to debug as console.logs are not shown with the test they go with and this is
not helpful:
 dim(5,9, a_random_function) = 
 function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)}
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)}
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)}
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)}
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)}
Empty string expected, instead got: function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},
function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},function(){ return ~~(Math.random()*6)},
function(){ return ~~(Math.random()*6)}

With the car park escape, I pushed through it just so I could downvote it for the unhelpful tests, but I'm giving up on this one.
That said, looking at the solutions, I think it was also a bit over my head. */