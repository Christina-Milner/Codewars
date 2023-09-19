/* Given an input n and optional function parameters f1 to fn, return the result obtained by applying the functions in order to the input. */

//P: A parameter of whatever and optional functions
//R: Depends on input 

/*
- [...arguments] gives us what's been passed in
- If length of this is 1, just return that element (means we were given no functions)
- Actually - shift out the first element and save it, then return it if hte array is empty -
    this will work even outside that edge case
- While the array is not empty, shift out the first function and apply it to the variable where we put the parameter
*/



function compose() {
    let args = [...arguments]
    let param = args.shift()
    while (args.length) {
        param = args.shift()(param)
    }
    return param
}