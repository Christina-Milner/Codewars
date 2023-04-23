/* You are given "triplets" (sequences of 3 letters that each occur somewhere before one another in the original string) and must deduce the original string from those.
The string does not contain the same letter more than once, and the triplets will always provide sufficient information to deduce it.
Example: 
triplets1 = [
  ['t','u','p'],
  ['w','h','i'],
  ['t','s','u'],
  ['a','t','s'],
  ['h','a','p'],
  ['t','i','s'],
  ['w','h','s']
]
secret = "whatisup"
*/

//P: An array of strings
//R: A string

/* 
- Have to look closely at the example to try and figure this out
- "tup" tells us those letters occur in the word in that order
- Ignore "whi" for now as that does not help
- "tsu" tells us we now have "tsup"
- "ats" tells us we now have "atsup"
- "hap" tells us we have "hatsup"
- This finally connects to the "whi" from earlier, so we have whiatsup or whatsiup (Order of the i and a not clear yet)
- "tis" tells us the "i" comes after the "t", so whatisup
- Last one looks like redundant information here?

- Run while loop on copy of the array until it's empty
- Take first triplet, put in new result array
    - Ignore subsequent ones that don't share any letters for now
    - If one does share letters, splice in any new letters in the appropriate place
    - New information like in "tis" case - check if relative indices of known letters in new triplet are different from result array and swap if necessary
- Join result array and return

*/
function recoverSecret(triplets) {
    let working = triplets.slice()
    let result = []
    while (working.length) {
        for (let i = 0; i < working.length; i++) {
            // If result empty, put first triplet in
            if (!result.length) {
                result = result.concat(working[i])
                working.splice(i, 1)
                console.log("First round, ", result)
                continue
            }
            // If triplet shares no letters with current result, ignore for this loop
            if (working[i].every(e => !result.includes(e))) {
                console.log("Ignoring ", working[i])
                continue
            }
            // One new letter
            if (working[i].filter(e => !result.includes(e)).length == 1) {
                const idx = working[i].indexOf(working[i].find(e => !result.includes(e)))
                if (idx == 0) {
                    result.splice(result.indexOf(working[1]), 0, working[i][idx])
                }
                if (idx == 1) {
                    result.splice(result.indexOf(working[2]) - 1, 0, working[i][idx])
                }
                if (idx == 2) {
                    result.splice(result.indexOf(working[1]) + 1, 0, working[i][idx])
                }
                console.log("One letter ", working[i], result)
            }
            // Two new letters
            if (working[i].filter(e => !result.includes(e)).length == 2) {
                const idx = working[i].indexOf(working[i].find(e => result.includes(e)))
                if (idx == 0) {
                    result.splice(result.indexOf(working[0]) + 1, 0, working[i][1], working[i][2])
                }
                if (idx == 1) {
                    result.splice(result.indexOf(working[1]), 0, working[i][0])
                    result.splice(result.indexOf(working[1]) + 1, 0, working[i][2])
                }
                if (idx == 2) {
                    result.splice(result.indexOf(working[2]), 0, working[i][0], working[i][1])
                }
                console.log("Two letters ", working[i], result)
            }
            working.splice(i, 1)
            console.log("End of loop ", working, result)
        }
    }
    return result.join('')
}

/* ^^^That didn't go anywhere... trying a new approach */

function recoverSecret(triplets) {
    let letters = Array.from(new Set(triplets.reduce((a, b) => a.concat(b), [])))

    const rank = (letter, arr) => {
        return arr.reduce((a, b) => {
            if (!b.includes(letter)) {
                return a
            }
            return a + b.indexOf(letter)
        }, 0)
    }
    letters.sort((a, b) => rank(a, triplets) - rank(b, triplets))
    /* ^This sorts the letters by the sum of their indices in the triplets, which won't work to
    fully sort them correctly, but there should be an unambiguous first letter */
    let result = [letters[0]]
    letters = letters.slice(1)
    while (letters.length) {
        /* So now we repeat this process, but ignoring the letter we've already placed,
        which should give us an unambigous "second place" that only ever has that letter in front of it
        and so on */
        let arr = triplets.map(e => e.filter(f => !result.includes(f)))
        letters.sort((a, b) => rank(a, arr) - rank(b, arr))
        result.push(letters[0])
        letters = letters.slice(1)
    }
    return result.join('')
}

/* Haa! It occurred to me while I was dealing with something in the kitchen that using a Set to get the original word in jumbled form
was probably a good starting point. Then the idea that there had to be a unambiguous starting letter that was only ever present as the first
element of a triplet dawned on me. From there, I hoped simply mapping the letters to their "index scores" would do the trick, but it does not.
"a" and "t" for example both had a score of 1 in the "whatisup" example, but from there came the idea of "well, if the only thing that is 
ever in front of it is the letter we already know is first, it shouldn't count" and the successive resorting. Woohoo! */