/* Assume you've invented a new data structure: 
function Cons(head,tail){
    this.head = head;
    this.tail = tail;
}
var numbers  = new Cons(1, new Cons(2, new Cons(3, new Cons(4, new Cons(5, null)))));
This is how it would be converted to an array:
function toArray(list) {
    if(list){
        var more = list.tail;
        return [list.head].concat(more? toArray(more) : []);
    }
    return [];
}

Cons.prototype.toArray = function(){ return toArray(this); };

Now: Implement a function to convert an array into an algebraic list, as well as functions to apply map and filter to algebraic lists. */

//P: An array / an algebraic list and a callback function / and algebraic list and a mapping function
//R: A list / a list / a list

/*
- Yo, call it cheating, but surely once I've written the array => list function, I can just use array methods for the other two?
    (Yes, that's not what you would want to do if you were actually using this data type for a reason and a real world purpose, and
    if my grandmother had wings, she could fly)
- The array/ list function goes something like this:
    - Make a Cons with head being the array's last element and tail being null
    - Keep recursively doing this until the array is empty - previously created Cons gets passed back in and becomes the new tail
    - Make copy of array as obviously we're being destructive
    - In this scenario, array being empty means return the accumulator. In order for this to work with an array that's empty to begin with,
        acc has to start as a Cons with head and tail being null and we then just change the head on the first array element.

- The other two functions then convert list to array, apply the appropriate array method and convert back to list
*/


Cons.fromArray = function(array){
    let newArray = array.slice();
    const recursiveHelper = (arr, acc = new Cons(null, null)) => {
        if (!arr.length) {
            return acc;
        }
        let next = arr.pop();
        if (acc.head == null) {
            acc.head = next;
            return recursiveHelper(arr, acc);
        }
        else {
            let nextList = new Cons(next, acc);
            return recursiveHelper(arr, nextList);
        }
    }
    return recursiveHelper(newArray);
  };
  
  function filter(list, predicate){
    const filteredArr = toArray(list).filter(e => predicate(e));
    return Cons.fromArray(filteredArr);
  }
  
  function map(list, mapper){
    const mappedArr = toArray(list).map(e => mapper(e));
    return Cons.fromArray(mappedArr);
  }
  
  Cons.prototype.filter = function(predicate){ return filter(this,predicate); };
  Cons.prototype.map = function(mapper){ return map(this, mapper); };

  
/* Copying someone else's solution for the record as things could've been a LOT simpler than what I did: */

Cons.fromArray = function(array) {
    return array.reduceRight(function(list, e) { return new Cons(e, list); }, null);
  };
  Cons.prototype.filter = function(predicate) {
    var tail = this.tail && this.tail.filter(predicate);
    // Wat? ^ That returns a boolean. How does this work? Idk
    return predicate(this.head) ? new Cons(this.head, tail) : tail;
  };
  Cons.prototype.map = function(mapper)    {
    return new Cons(mapper(this.head), this.tail && this.tail.map(mapper));
  };