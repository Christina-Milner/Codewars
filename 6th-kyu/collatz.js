/* Given a number n, return a collatz sequence starting with that number. A collatz sequence is the result of applying a function where f(n) = n/2 if n is even
and f(n) is 3n + 1 if n is odd, until n is 1. 
This is to be returned as a string in the format "n->x1->x2->x3->..." */

//P: A number
//R: A string

/*
- Run a while loop while n > 1
- Push current number into an array, then perform the appropriate operation depending on modulo 2
- Add 1 to the array at the end
- Return the array joined with "->"

*/


function collatz(n){
    let sequence = []
    while (n > 1) {
        sequence.push(n)
        n = n % 2 === 0 ? n / 2 : n * 3 + 1
    }
    sequence.push(1)
    return sequence.join('->')
}
