/* Given two arrays representing the scores of two sports teams, return the index of the pairing where the second team lost with the minimum goal difference,
or, given that is equal, the one where they shot more goals. */

//P: Two arrays of numbers
//R: A number

/* 
- Initialise variables to track index, goalDiff and goals (they all start at 0 - except goalDiff which needs to start at Infinity logically)
- Iterate over the arrays
- If goal diff at current pairing is smaller than what's saved, update the variables
- If it's equal, check the number of goals
- Return index

*/


function bestMatch(ALAHLYGoals, zamalekGoals) {
    let index = 0
    let goalDiff = Infinity
    let goals = 0
    for (let i = 0; i < ALAHLYGoals.length; i++) {
        let currentDiff = ALAHLYGoals[i] - zamalekGoals[i]
        if (currentDiff < goalDiff) {
            index = i
            goalDiff = currentDiff
            goals = zamalekGoals[i]
        }
        else if (currentDiff == goalDiff && zamalekGoals[i] > goals) {
            index = i
            goalDiff = currentDiff
            goals = zamalekGoals[i]
        }
    }
    return index
}