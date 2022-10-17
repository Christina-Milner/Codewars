/*
How many rounds of going on mission does it take startingNumbers Mormons who convert reach
people each round to reach a following of target? 
Ideally recursive, but why would you do anything else?
*/

function Mormons(startingNumber, reach, target) {
    // why is the function name in title case? It's not a constructor
    const roundsOfMissions = (startingNo, reach, target, rounds = 0) => {
      if (startingNo >= target) {return rounds}
      return roundsOfMissions(startingNo + reach * startingNo, reach, target, rounds + 1)
    }
    return roundsOfMissions(startingNumber, reach, target)
  }