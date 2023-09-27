/* Assume we are coding a merge sort. This kata just wants the "merge" part of it, i.e. we get two arrays of integers that are already sorted and
combine them into one sorted array. The sort() method has been disabled. */

//P: Two arrays of numbers
//R: An array of number


/*
- Initialise new array
- If last element of a is bigger, pop that in, otherwise, last element of b
- Repeat until a and b are empty
- Reverse
Alllthough in this instance it might make sense to pretend none of the inbuilt array methods exist.
In which case:
- Initialise two index markers at 0
- Push (I don't think I can do anything without that one) the lower array[0] value in and increment that marker
- Stop when both markers have reached length - 1 of their respective arrays
*/


function mergesorted(a, b) {
    const recursiveMerger = (a, b, acc = []) => {
        if (!a.length && !b.length) {return acc}
        else if (!a.length) {return acc.concat(b)}
        else if (!b.length) {return acc.concat(a)}
        let next = a[0] <= b[0] ? a.shift() : b.shift()
        acc.push(next)
        return recursiveMerger(a, b, acc)
    }
    return recursiveMerger(a, b)
  }


/* Long story short: Original plan did not work. The extra ifs to account for 0 and 1 length arrays were doing my head in. As
I kept adding them, I realised that a recursive approach based on 0 length being the base case was probably the way to go.
As for pretending array methods don't exist, let's not. */