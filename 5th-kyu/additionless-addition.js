/* Write a function to add two numbers that doesn't use +, -, arrays, the Math object, and various other things that would be useful.*/

//P: Two numbers
//R: A number


/*
- Make a string of length x by using any character and repeat, do the same for y, then concat the two and return the length?
- That works, of course, but turns out the anti-"cheat" doesn't like strings, either - ah, because the quotes and full stop are in the list of banned symbols
- WHAT
- Eventually suspected it'd involve bitwise operators and other stuff I never really understood. Read up a bit and there we are.

*/



function add(x, y) {
    let a = x;
    let b = y;
    while ((a & b) !== 0) {
        let xor = a ^ b;
        let and = a & b;
        let shiftedAnd = and << 1;
        a = xor;
        b = shiftedAnd;
    }
    return a | b;
}