/* Given an array of directions made up of NORTH, SOUTH, WEST and EAST, eliminate nonsensical directions ("north" immediately followed by "south") etc. and return
what remains of the list.
We are specifically not checking whether the instructions cancel each other out overall - ["NORTH", "WEST", "SOUTH", "EAST"] would remain as it is despite going
in a circle, because opposing directions aren't next to each other. */

//P: An array of strings
//R: An array of strings

/*
- Make object mapping each direction to its counterpart
- Recursively filter array by elements not preceded by their counterparts until this process no longer changes the input
*/


function dirReduc(arr){
    const opposites = {
        NORTH: "SOUTH",
        SOUTH: "NORTH",
        WEST: "EAST",
        EAST: "WEST"
    }

    const recursiveOppositesFilter = arr => {
        let reduced = arr.reduce((acc, cur, idx, arr) => {
          if (!acc.length) {
            return acc.concat(cur)
          }
          if (acc[acc.length - 1] == opposites[cur]) {
            return acc.slice(0, -1)
          }
          return acc.concat(cur)
        }, [])
        if (reduced.length == arr.length) {
            return arr
        }
        return recursiveOppositesFilter(reduced)
    }
    
    return recursiveOppositesFilter(arr)
  }

/* Can't do this with filter obviously, as that'll only knock out one of the two offending elements. Realised that pretty quickly. Reduce was the way to go here. */