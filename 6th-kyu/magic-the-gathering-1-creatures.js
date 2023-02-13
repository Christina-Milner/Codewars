/* Given two arrays of arrays like [num1, num2] representing the creatures of two players playing MTG, where num1 is their power and num2 is their toughness, return
an object with the properties player1 and player2, where the values are the array of each player's surviving creatures. */

//P: Two arrays of arrays of numbers
//R: An object

/*
- In essence, just iterate over the length of the arrays and for each index, compare the toughness value of A to the strength of B and vice versa.
- Inclined to copy the input arrays and then get rid of the ones that die (would only have to iterate the length of the shorter array and all the ones
    that don't battle automatically get left in), but deleting a specific element from an array is such a giant PITA in JS
- Orr, what if we could use map for this? That should work
- Hm, no, because can't get rid of elements with map. That means reduce.
*/

/*
function battle(player1, player2) {
    const findSurvivors = (arr1, arr2) => arr1.reduce((acc, cur, idx) => {
        if (!arr2[idx]) {return acc.concat(cur)}
        if (cur[1] <= arr2[idx][0]) {return acc}
        return acc.concat(cur)
    }, [])

    const p1Survivors = findSurvivors(player1, player2)
    const p2Survivors = findSurvivors(player2, player1)

    return {
        'player1': p1Survivors,
        'player2': p2Survivors
    }
  }
*/

function battle(player1, player2) {
    let p1Survivors = []
    let p2Survivors = []

    const maxLength = Math.max(player1.length, player2.length)

    for (let i = 0; i < maxLength; i++) {
        if (!player1[i]) {
          p2Survivors.push(player2[i])
          continue
        }
        if (!player2[i]) {
          p1Survivors.push(player1[i])
          continue
        }
        let [p1Power, p1Health, p2Power, p2Health] = [player1[i][0], player1[i][1], player2[i][0], player2[i][1]]
        if (p1Power < p2Health) {
            p2Survivors.push(player2[i])
        }
        if (p2Power < p1Health) {
            p1Survivors.push(player1[i])
          }
    }

    return {
        'player1': p1Survivors,
        'player2': p2Survivors
    }
  }
