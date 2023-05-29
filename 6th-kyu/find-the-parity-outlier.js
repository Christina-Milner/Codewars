/* You are given an array of integers which are either all even or all odd except for one outlier. Return that outlier.
The arrays will be at least 3 elements long, but can be very large. */

//P: An array of numbers
//R: A number

/*
- In theory, there are multiple ways of doing this. The most obvious would be to look at the first two elements, if they're both even, filter the array looking for an odd one, 
    if they're both odd, filter it looking for an even one, and if they differ, check the third one to see which is the outlier.
- Alternatively, could wrangle reduce into doing something like this
- Buuut there has to be a catch to it, like the above procedure won't cut it in terms of performance with large arrays
- No idea how you're meant to do this in less than O(n) time, though?
- What if we just keep popping stuff off the end? 
*/


function findOutlier(integers) {
    let copy = integers.slice()
    let [last, penultimate] = [copy.pop(), copy.pop()]
    let evenOrOdd
    if (last % 2 == 0 && penultimate % 2 == 0) {
        evenOrOdd = 1
    }
    else if (last % 2 !== 0 && penultimate % 2 !== 0) {
        evenOrOdd = 0
    }
    else if (last % 2 == 0) {
        let third = copy.pop()
        if (third % 2 == 0) {
            return penultimate
        }
        else {
            return last
        }
    }
    else if (last % 2 !== 0) {
        let third = copy.pop()
        if (third % 2 == 0) {
            return last
        }
        else {
            return penultimate
        }
    }
    while (copy.length) {
        let next = copy.pop()
        if (Math.abs(next % 2) === evenOrOdd) {
            return next
        }
    }
}

/* Lol based on the other solutions, any of the ideas I came up first would've worked fine. Ah well. */