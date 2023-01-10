/*Extend the array class with the methods square(), cube(), average(), sum(), even() and odd(), that do what they say on the tin and do not modify the input array. */

//P: An array
//R: A number or an array depending on method

/*
This sounds suspiciously easy, even for a 6th. Array.prototype.function() to add these. Unless I missed a memo where none of the other inbuilt array methods
are allowed and I have to code all of these from scratch. Even so.
- Square - map to values ** 2
- Cube - map to values ** 3
- Average: sum reduce and divide by array length, or return NaN if that's 0
- Sum: See step 1 of previous
- Even: filter by modulo 2 == 0
- Odd: Filter by modulo 2 !== 0
*/

Array.prototype.square = function() {
    return this.map(e => e ** 2)
}

Array.prototype.cube = function() {
    return this.map(e => e ** 3)
}

Array.prototype.average = function() {
    return this.length ? this.reduce((a, b) => a + b, 0) / this.length : NaN
}

Array.prototype.sum = function() {
    return this.reduce((a, b) => a + b, 0)
}

Array.prototype.even = function() {
    return this.filter(e => e % 2 == 0)
}

Array.prototype.odd = function() {
    return this.filter(e => e % 2 !== 0)
}

/* Yep, no, that's all it is. Cool. */

