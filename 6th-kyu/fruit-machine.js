/* Given 3 arrays representing the reels on a slot machine and an array of numbers representing the indices that each reel lands on, return the resulting score.
Rules (copy pasted):
1. There are always exactly three reels
2. Each reel has 10 different items.
3. The three reel inputs may be different.
4. The spin array represents the index of where the reels finish.
5. The three spin inputs may be different
6. Three of the same is worth more than two of the same
7. Two of the same plus one "Wild" is double the score.
8. No matching items returns 0.

Scoring is un-copypasteable but provided. */

//P: 1 array of 3 arrays of strings and 1 array of integers
//R: A number

/*
- I don't need to implement the entire scoring table as a data structure, I just need the symbols and the "two of the same" score.
  Three of the same is two of the same * 10 and two of the same + 1 Wild is two of the same * 2.
- The order of strings differs between the reels, so I cannot just compare the indices. I have to map the spins array to the strings
  at those indices.
- Make a helper function
    - Takes in an array of strings
    - Checks if they are all the same (check with .every if everything is the same as arr[0] should do the trick - with just three elements, could also do
        a == b && a == c && b == c, but meh) - alternatively, could compare the lengths of .filter(e == arr[0]) and the original array
    - Hmm, to check if two are the same, I need to iterate over the array and look at the lengths of .filter by that element. If I'm going to do that
       anyway, I can skip the previous step and incorporate it here
    - If previous step has found a .filter with length 3, return. If it hasn't found anything bigger than 1, also return. If it finds one with length 2,
      check whether the remaining element is a Wild (.filter by not equal to thing that produced length 2 and equal to Wild)
    - Return:
        - "Two of the same score" of either arr[0] if 3 equals or 0 equals, or of element there were 2 equals of, times:
          10 if 3 equals, 0 if 0 equals, 1 if 2 equals and no Wild, 2 if 2 equals and Wild
- return output of mapped reel array fed into helper function
*/

function fruit(reels, spins) {
    const scoresForTwo = {
        Wild: 10,
        Star: 9,
        Bell: 8,
        Shell: 7,
        Seven: 6, // WHY?!?!?
        Cherry: 5,
        Bar: 4,
        King: 3,
        Queen: 2,
        Jack: 1
    }
    let spinResult = spins.map((e, i) => reels[i][e])

    const spinScorer = arr => {
        let [value, modifier] = [0, 0]
        // 3 of the same
        if (arr.every((e, _, arr) => e == arr[0])) {
            value = scoresForTwo[arr[0]]
            modifier = 10
        // 0 of the same
        } else if (arr.every((e, _, arr) => arr.filter(f => f == e).length == 1)) {
                value = 0 // really don't care if I'm going to be multiplying by 0
                modifier = 0
        // must now be 2 of the same
        } else {
            for (let reel of arr) {
                if (arr.filter(e => e == reel).length == 2) {
                    value = scoresForTwo[reel]
                    modifier = arr.find(e => e !== reel) == "Wild" ? 2 : 1
                }
            }
        }
        return value * modifier
    }
    return spinScorer(spinResult)
}

/* Presto! Shifted spinScorer around a bit to use every for 3 and 0 and only iterate if we know we're looking for 2 of the same, as iterating
over the array as the outside loop was becoming a pain if there aren't 3 of the same. Probably perfectly doable, but my brain was getting into knots.
Could have stuck the reel symbols into an array in ascending order of value and used their indices to save space, but ehhh this is fine.*/
