/* Given a string s, turn it into a "squared string" (find lowest n such that n squared >= s.length and fill with Ascii char 11 if necessary,
 then insert line breaks after n characters). The coding function does this and then rotates the string clockwise. The decoding function rotates it counterclockwise
 and cleans it up (getting rid of line breaks and extra characters) to restore the original string. We use dots instead of spaces, for reasons. */

 /* Example: 
 t = "I.was.going.fishing.that.morning.at.ten.o'clock"

code(t) -> "c.nhsoI\nltiahi.\noentinw\ncng.nga\nk..mg.s\n\voao.f.\n\v'trtig"

decode(code(t)) == "I.was.going.fishing.that.morning.at.ten.o'clock"
*/ 

/* So...
To code:
- Iterate from 2 to s.length to find n
- I have no idea what "complete t with the char of ascii code 11" is supposed to mean, but I'm guessing padEnd.
- Insert the line breaks (I'm thinking map and checking for i + 1 % n == 0)
- "Rotating clockwise" means putting all the letters that are at the same index position in each line together in one line, starting with bottom left.
  So ... split by line break, reverse the resulting array, map (e, i) to (helper function that joins the letters at i for each string)

To decode:
- Rotating counterclockwise means the same thing as rotating clockwise, but reversing the individual lines rather than their order in the array as we start top right
- Then filter out line breaks and ascii 11s and should be good to go.

*/

function code(s) {
    const n = Math.ceil(Math.sqrt(s.length))
    if (s.length < n ** 2) {s = s.padEnd(n ** 2, String.fromCharCode(11))}
    s = s.split('').map((e, i) => (i + 1) % n == 0 && (i + 1) < n ** 2 ? e + "\n" : e).join('')
    s = s.split('\n').reverse().map((_, i, arr) => columnFinder(arr, i)).join('\n')
    return s
  }
  
  function decode(s) {
    let strArr = s.split('\n').map(e => e.split('').reverse().join(''))
    strArr = strArr.map((e, i, arr) => columnFinder(arr, i))
    strArr = strArr.join('').split(String.fromCharCode(11))
    return strArr.join('')
    
  }
  
  const columnFinder = (stringArr, index) => {
    return stringArr.map(e => e[index]).join('')
  }

/* That works! 
It had occurred to me as I got started that I did not need to iterate to find n.
Could definitely be prettified a bit (idk why I decided to leave the thing a string all the way through in function 1 and declare it as an array in function 2),
but I gotta go work out. */