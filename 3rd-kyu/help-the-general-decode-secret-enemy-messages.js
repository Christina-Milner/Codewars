/* Complete the function device.decode() to decode a ciphered string.
Do this by observing console.logs of what device.encode() returns.
Provided:
console.log(device.encode('What is this ?'))
=> EFhZINtl3rgKW9
console.log(device.encode('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
=> bdhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6YIcflxVC5WE94UA1OoD70MkvRuPqHabdhpF,82QsLir
console.log(device.encode('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'))
=> dhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6YIcflxVC5WE94UA1OoD70MkvRuPqHabdhp
console.log(device.encode('!@#$%^&*()_+-!@#$%^&*()_+-!@#$%^&*()_+-')) - repetition added by me to double-check these are always the same
=> !@#$%^&*()_+-!@#$%^&*()_+-!@#$%^&*()_+-
console.log('abcdefghijklmnopqrstuvwxyz')
console.log('abcdefghijklmnopqrstuvwxyz'.split('').map(a => device.encode(a)).join (''))
=> bdfhjlnprtvxzBDFHJLNPRTVXZ
console.log('abcdefghijklmnopqrstuvwxyz'.split('').map(a => device.encode('_'+a)[1]).join(''))
=> dhlptxBFJNRVZ37,aeimquyCGK
console.log('abcdefghijklmnopqrstuvwxyz'.split('').map(a => device.encode ('__'+a)[2]).join (''))
=> hpxFNV3,emuCKS08bjrzHPX5 g
*/

//P: A string
//R: A string


/*
What do we know?
- It's not a simple cipher where everything gets shifted by a certain number of letters or whatever
- Special characters !@#$%^&*()_+- stay the same
- The sequences produced by the strings of aaaa and bbb are the same thing except for the "b" at the start.
- What is the deal with the underscores? 
Out of curiosity, 
console.log(device.encode('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc'))
produced:
flxVC5WE94UA1OoD70MkvRuPqHabdhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6YIcflx
- Index seems to play a part. The "a" in "What is this ?" comes out as a "h" and so does the third "a" in the all a string.
    - a to h is a jump of 7 by char code as well as by position in alphabet
- The encoded alphabet is the same thing twice, but with the latter half being in caps
    - Mapping the encoded version to char codes and subtracting the original alphabet's codes produces the numbers from 1 to 13 for the first half, then jumps to -44 and goes down from there to -32
    - If it had continued with 14, it would've produced a pipe, so there is that
    - What happens if we swap the halves of the alphabet?
    - => BDFHJLNPRTVXZbdfhjlnprtvxz, which shoots holes in the idea that the index is relevant
- All caps alphabet comes out as "13579, acegikmoqsuwyACEGIK"
- Wait, the underscores are used to show the difference the index makes
- a at index 0 turns into b, at index 1 into d, at index 2 into h
    - that's 0 -> 1, 1 -> 2, 2 -> 7
- b at 0 turns into d, at 1 into h, at 2 into p
    - that's 0 -> 2, 1 -> 7, 2 -> 14
- c at 0 turns into f, at 1 into l, at 2 into x
    - that's 0 -> 3, 1 -> 9, 2 -> 21
- d at 0 turns into h, at 1 into p, at 2 into F
    - that's 0 -> 4, 1 -> 12, 2 -> 28

??? what is the trend here? Index 0 gets shifted by its own position in the alphabet (one-indexed) again. Index 2 gets shifted by its (one-indexed) position in the alphabet times 7. 
I don't see the pattern for index 1. c and d do look like 3 * 3 and 3 * 4, but what's with the 7 and 2?

- e at 0 turns into j, at 1 into t, at 2 into N
    - 0 -> 5, 1 -> 15, 2 -> 35

- I mean ... I could make it spit out all 26 possibilities for each letter and then select the right one based on its index??
- the "alphabet" in order appears to go lowercase -> uppercase -> numbers -> special chars, which in terms of char code is going backwards

*/

let map = {}
for (let char of 'abcdefghijklmnopqrstuvwxyz') {map[device.encode(char.repeat(66))] = char}
for (let char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {map[device.encode(char.repeat(66))] = char}
for (let char of ' .?,;') {map[device.encode(char.repeat(66))] = char}

device.decode = function(w) {
  return w.split('').map((e, i) => {
      for (let str in map) {
          if (str[i % 66] === e) {return map[str]}     
      }
      return e
  }).join('')
}

/* Just ran with the idea of making it produce a map for each character that I could then index into.
Mildly puzzled when it only worked for the first 26 letters and then seemed to break entirely, until I thought to go back to check
the console.logs of the repeating letters to make sure the cycle was actually 26 (it is not, it's 66). Suddenly... voilà! 
This was great fun, the actual code ended up being simple as heck but wrapping my head around the problem sure wasn't. */
