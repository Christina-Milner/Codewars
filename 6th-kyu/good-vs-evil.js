/* We have a list of good units and their respective value, and evil ones. Given two strings containing numbers of each unit,
return a string htat indicates whether good or evil wins the battle. */

//P: Two strings
//R: A string

/*
- This looks like a lot of typing for a problem that's actually pretty simple
- Split the strings by spaces, map to appropriate values (probably best to base it on index position in list rather than the names of each unit), sum and compare
*/

function goodVsEvil(good, evil) {
    const GOODWINS = "Battle Result: Good triumphs over Evil"
    const EVILWINS = "Battle Result: Evil eradicates all trace of Good"
    const DRAW = "Battle Result: No victor on this battle field"

    const goodValues = {
        0: 1,
        1: 2,
        2: 3,
        3: 3,
        4: 4,
        5: 10
    }
    const evilValues = {
        0: 1,
        1: 2,
        2: 2,
        3: 2,
        4: 3,
        5: 5,
        6: 10
    }
    const goodArmy = good.split(' ').map((e, i) => Number(e) * goodValues[i]).reduce((a, b) => a + b, 0)
    const evilArmy = evil.split(' ').map((e, i) => Number(e) * evilValues[i]).reduce((a, b) => a + b, 0)

    return goodArmy > evilArmy ? GOODWINS : goodArmy == evilArmy ? DRAW : EVILWINS
}
