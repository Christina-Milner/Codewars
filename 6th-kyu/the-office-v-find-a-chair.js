/* You're given a number representing how many chairs you need and an array of arrays representing meeting rooms to go borrow them from, where "X" denotes the occupants
and a number shows how many chairs there are. Return an array of numbers showing how many chairs you're taking from each room in order.

[['XXX', 3], ['XXXXX', 6], ['XXXXXX', 9], ['XXX',2]], 4 should return [0, 1, 3] as there's no free chairs in the first room, we take 1 from the second
and 3 from the third and the rest don't matter as we have our chairs.

Return "Game On" if you don't need any chairs, and "Not enough!" if, well, you can't get enough. */

//P: An array of arrays consisting of a string and an integer, and an integer
//R: An array of numbers or a string

/*  Immediately return the string if # of chairs needed is 0.
Otherwise, map the given array to turn the Xes into a usable number.
What happens then could be a while loop (while chairsNeeded > 0), but I think I'm going to try a recursive function.
Take in the array of arrays, the num needed, and the acc which starts as []
Shift the first element, subtract its elements to see how many chairs we get out of it, subtract that from the chairs needed and stick into the acc, rinse repeat.
Base case is chairs needed = 0 (return acc) or nothing left in the array (return "Not enough!") */

/* Recursive idea scrapped due to some funny behaviour I can't quite explain, but it wasn't as elegant as I would have liked anyway */

function meeting(x, need) {
    if (need == 0) {return "Game On"}

    let usefulArr = x.map(e => [e[0].length, e[1]])
    let chairsNicked = []

    while (need > 0) {
        if (!usefulArr.length) {return "Not enough!"}
        const current = usefulArr.shift()
        const currentChairs = current[1] - current[0] < 0 ? 0 : current[1] - current[0]
        if (currentChairs > need) {
            chairsNicked.push(need)
            need = 0
        } else {
            chairsNicked.push(currentChairs)
            need -= currentChairs
        }
    }
    
    return chairsNicked
}

/* Presto, that works - just needed a little troubleshooting as I'd neglected to consider the possibility a room might have more
occupants than chairs in it, even though I should've seen that from the sample tests. Must look more closely at those. */