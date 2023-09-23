/* Granny is visiting her friends. Her friends are the input, an array of arrays. Strings like "A1" are friends, strings like "X1" are places. 
    There's a distance table that shows how far each place is away from X0, where granny lives. Return the distance she has to travel. */

//P: 3 arrays of arrays/strings/numbers
//R: A number


/*
- Granny visits her friends in the order specified in "friends". The order in there is A0 to An
- She will always have to travel the distance to get to the place A0 and back from An (which are provided)
- To get from one of those places to the next, it's Pythagoras:
    - a^2 (distance of previous town to home) + b^2 (distance we are looking for) = c^2 (distance of current town to home)
    - Rearrange and the distance we are looking for is the square root of the square of current distance minus the square of previous distance
- Also let's make 2 of the input arrays objects so the lookup isn't such a PITA
*/



function tour(friends, fTowns, distTable) {
    let realTowns = {}
    let realTable = {}
    for (let town of fTowns) {
        realTowns[town[0]] = town[1]
    }
    distTable.forEach((place, idx, arr) => {
        if (idx % 2 === 0 && idx < arr.length - 1) {
        realTable[place] = arr[idx + 1]
    }
    })

    const pythagorasHelper = (prevDist, curDist) => {
        return Math.sqrt(curDist ** 2 - prevDist ** 2)
    }
    return Math.floor(friends.reduce((acc, cur, idx, arr) => {
        if (idx === 0) {
            return realTable[realTowns[cur]]
        }
        let prev = realTable[realTowns[arr[idx - 1]]]
        if (idx < arr.length - 1) {
            return acc + pythagorasHelper(prev, realTable[realTowns[cur]])
        }
        if (!(cur in realTowns)) {
            return acc + prev
        }
        return acc + pythagorasHelper(prev, realTable[realTowns[cur]]) + realTable[realTowns[cur]]
    }, 0))
}