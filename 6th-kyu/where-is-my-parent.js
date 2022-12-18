/* Given a string of unique uppercase letters representing mothers and matching lowercase letters representing their children, return the string sorted alphabetically and with
mothers being followed by their children, e.g:
beeeEBb => BbbEeee
*/

//P: A string
//R: A string

/* Hm... so sort the string by locale compare, but need to find a way to get it to put the uppercases first rather than last.
Check if lowercases of the letters are the same. If not, use locale compare.
If they are, still use locale compare but switch the arguments? - No, that doesn't work because that messes up the overall alphabetical order.
Just write a sorting function that prioritises uppercase. */

function findChildren(dancingBrigade) {
    let chunksByLetter = dancingBrigade.split('')
                        .sort((a, b) => a.localeCompare(b))
                        .map((e, i, arr) => arr[i + 1]?.toLowerCase() !== e.toLowerCase() ? e + '#' : e)
                        .join('')
                        .split('#')
    
      return chunksByLetter.map(e => e.split('').reverse().join('')).join('')
  }

/* Just kind of had to figure this one out as I went along as I'm very bad at predicting how sort will behave.
I've used the trick of mapping with an equality check to insert a delimiter character to get chunks of the same thing before,
Once divided into chunks of the same letters, I didn't even have to mess around with regex checking for uppercase letters anymore
as I could just reverse what locale compare had produced. 

(After looking at other solutions) today I learned there's a {caseFirst: 'upper'} I could've tacked on to locale compare.*/