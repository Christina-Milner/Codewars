/* Given a number of US dollar cents, return an object with the properties "Nickels", "Pennies", "Dimes", "Quarters" (in that order for some unfathomable reason) and
how many of each coin would make up the amount as their values (using the least amount of coins).
0 or negative amounts should return that dictionary with the values all at 0, and floats should be rounded down so there is never a fraction of a coin. */

//P: A number
//R: An object with string properties and number values 

/*
- Initialise two objects: One that is going to be the return, and one that matches the coins to their cent values (by descending value)
- Return the first object if input is <= 0
- Write recursive helper that performs integer division of the cent amount by the first value in the second object, stores the result in the first object
    and calls itself on the remainder
- Return first object
*/

function looseChange(cents){
    let result = {
        'Nickels': 0,
        'Pennies': 0,
        'Dimes': 0,
        'Quarters': 0
    }
    const centValues = [
        ['Quarters', 25],
        ['Dimes', 10],
        ['Nickels', 5],
        ['Pennies', 1]
    ]
    if (cents <= 0) {
        return result
    }

    const pennySorter = (num, count = 0) => {
        if (count > centValues.length - 1) {
            return
        }
        if (centValues[count][1] > num) {
            return pennySorter(num, count + 1)
        }
        result[centValues[count][0]] = Math.floor(num / centValues[count][1])
        return pennySorter(num - result[centValues[count][0]] * centValues[count][1], count + 1)
    }

    pennySorter(Math.floor(cents))
    return result
}

/* This was reminiscent of converting an integer to Roman numerals, hence same approach. Used an array rather than a second object in the end as that avoided
complicated if checks for which denomination we were currently on. */