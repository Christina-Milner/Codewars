/* Given 2 numbers indicating the length of the lap each of 2 joggers is running, and knowing they start at the same place and run at the exact same
speed, return an array showing how many laps each one must run in order for them to meet again. */

//P: Two numbers
//R: An array of two numbers

/*
- Have to find the lowest number both lap lengths are divisible by
- Lower bound is the higher of the two lap lengths, upper bound is their product
- Increment by the lower of the two numbers
- Return the results of the division of this number by each lap length
*/



function nbrOfLaps(x, y) {
    const shorter = Math.min(x, y)
    const longer = Math.max(x, y)
    for (let i = longer; i <= x * y; i++) {
        if (i % x === 0 && i % y === 0) {
            return [i / x, i / y]
        }
    }
}

/* Hm. Incrementing by shorter does not work (e.g. with 3 and 5, will not hit the common multiplier if starting at 5 and incrementing by 3), but incrementing by one makes this
process awfully slow (even if it didn't quite time out). How to make this more efficient? */

function nbrOfLaps(x, y) {
    const shorter = Math.min(x, y)
    const longer = Math.max(x, y)
    for (let i = shorter; i <= x * y; i += shorter) {
        if (i % x === 0 && i % y === 0) {
            return [i / x, i / y]
        }
    }
}

/* OK. Starting at the shorter distance does mean we'll check some numbers that can't possibly be it, but it allows for incrementing by shorter rather than 1 and makes this infinitely faster. Sold. */