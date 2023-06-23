/* Extend the Array class with a method containsAll() that returns whether or not this contains all elements of the array passed in as an argument. */

//P: An array
//R: A boolean


/* 
- This is what the every() method is for. Not much else to say about it.

*/

Array.prototype.containsAll = function(array) {
    return array.every(element => this.includes(element))
}