/* Given two integers n and d (where n is actually a string), remove a digit from n such that the resulting number is nonzero and divisible by d.
Then repeat that process with d-1, d-2 and so on, until the task becomes either impossible or you've arrived at 1.
Return the maximum number of turns you can make.
Example:
For n = "102045" and d = 4, the output should be 4.

turn 1: "102045" -> "10204" (remove 5 from n)
                    "10204" is divisible by 4
turn 2: "10204" -> "0204" (remove 1 from n)
                   "204" is divisible by 3
turn 3: "204" -> "20" (remove 4 from n)
                 "20" is divisible by 2
turn 4: "20" -> "2" (remove 0 from n)
                "2" is divisible by 1
*/

//P: A string (made up of numbers) and a number
//R: A number

/*
- Iterate over characters of string to check if string with that character removed and converted to number is a) nonzero in value and b) divisible by d
- If yes, recursively call function with resulting string and d - 1
- Recursive function needs a third parameter to keep track of number of turns
- If loop finishes and hasn't found a number that meets the criteria, return number of turns
*/

function removeNumberGame(n, d){
    let maxTurns = 0

    for (let i = 0; i < n.length; i++) {
        let slicedNumString = n.slice(0, i).concat(n.slice(i + 1))
        if (Number(slicedNumString) !== 0 && Number(slicedNumString) % d == 0) {
            maxTurns = Math.max(removeNumberGame(slicedNumString, d - 1) + 1, maxTurns)
        }
    }

    return maxTurns
  }

/* This was the most frustrating thing I have ever done in my life. Based on my prep, I had this in a few minutes:
function removeNumberGame(n, d){
    const numberOfTurns = (numString, num, turns = 0) => {
        for (let i = 0; i < numString.length; i++) {
            let slicedNumString = numString.slice(0, i).concat(numString.slice(i + 1))
            if (Number(slicedNumString) !== 0 && Number(slicedNumString) % num == 0) {
                return numberOfTurns(slicedNumString, num - 1, turns + 1)
            }
        }
        return turns
    }
    return numberOfTurns(n, d)
  }

But that doesn't find the maximum possible number of turns, as it always just goes with the first digit that meets the criteria.
I got bent into all sorts of knots trying to keep track of the differing possibilities (adding the potential values for each string to an object etc.)
and had to look at the solutions in the end. */