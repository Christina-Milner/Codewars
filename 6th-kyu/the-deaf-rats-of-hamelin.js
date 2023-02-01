/* Given a string where P represents the pied piper, ~O represents a rat going right and O~ represents a rat going left, return the number of rats that are deaf,
i.e. moving away from the piper instead of towards him. */

//P: A string
//R: A number

/* 
Not sure how you'd make sure the tails are attributed to the right rat with regex, thinking I'll need to do this iteratively.
- 1) Split the string based on the P. String that's first in the resulting array, deaf rats are O~, string that's second, they're ~O.
- 2) Get rid of whitespace in resulting strings (split by " " and rejoin)
- 3) Helper function:
    - Takes in string and looks at first two elements
    - Increases counter if desired rat, then recursively calls itself on rest of string until empty
    - Take desired rat in as a parameter so it's usable for both sides
- 4) Add rat count for both sides and return
*/

var countDeafRats = function(town) {
    let [goRight, goLeft] = town.split('P')
    if (goRight) {
      goRight = goRight.split(' ').join('')
    }
    if (goLeft) {
      goLeft = goLeft.split(' ').join('')
    }
    
    const ratCounter = (str, rat, count = 0) => {
      if (!str) {return count}
      if (str.slice(0, 2) == rat) {
        return ratCounter(str.slice(2), rat, count + 1)
      } else {
        return ratCounter(str.slice(2), rat, count)
      }
    }
    
    let ratsLeft = goRight ? ratCounter(goRight, "O~") : 0
    let ratsRight = goLeft ? ratCounter(goLeft, "~O") : 0
    
    return ratsLeft + ratsRight
  }
  