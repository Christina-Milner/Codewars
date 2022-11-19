/* Given an array of strings that represent ballot votes in an election (where there isn't a fixed list of candidates going in or such a thing as a spoiled ballot),
return the candidate that has an absolute majority (more than n / 2 votes) or null if no one does.
The array can be huge and is not to be mutated. */

/*So, guessing the stipulation regarding array size means just iterating over it and keeping running totals won't fly. 
Idea 1: Create a Set and then filter the array by each of its elements, checking if any of the resulting array lengths are > array length / 2. Is that more efficient
under the hood than iterating once over the whole thing? No idea. Let's find out. */

function getWinner(listOfBallots) {
    const candidates = new Set(listOfBallots)
    for (let name of candidates.values()) {
      if (listOfBallots.filter(e => e == name).length > listOfBallots.length / 2) {
        return name
      }
    }
    return null
}


/* Apparently it is! That passes, while the following fails the "giant array" test: */

/* function getWinner(listOfBallots) {
    let seen = []
    for (let name of listOfBallots) {
      if (seen.includes(name)) {continue}
      if (listOfBallots.filter(e => e == name).length > listOfBallots.length / 2) {
        return name
      }
    }
    return null
  } */