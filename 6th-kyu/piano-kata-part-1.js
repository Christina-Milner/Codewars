/* Given a visual representation of a piano keyboard and a number, return whether one's finger lands on a white or black key after moving that many keys from the first
(it loops around after 88). */

//P: An integer, fixed tests suggest no negatives or other nonsense
//R: A string ("white" or "black")

/* I would write down the sequence of keys for C - C. The layout starts with a couple extra keys, but then the rest is just that repeated multiple times.
Once the layout's mapped, just need the number modulo 88, no? */
/* Update 1 after tests: Whoops, key presses start at 1, so need to subtract one because of zero-indexing */
/* Update 2 after tests: Building the layout around the C scale produced a few fails and as random "expected white instead of black"
 is reasonably impossible to troubleshoot, built the scale around its starting point at A instead. That's still got random fails, but fewer of them.*/
/* Update 3: Right, had two extra keys in my scale array so it didn't line up properly when looping around. All sorted! */

function blackOrWhiteKey(keyPressCount) {
    const w = "white"
    const b = "black"
    const repeatArr = (arr, n) => [].concat(...Array(n).fill(arr))
    const AtoGSharp = [w, b, w, w, b, w, b, w, w, b, w, b]
    const piano = repeatArr(AtoGSharp, 7).concat([w, b, w, w])
    return keyPressCount > 88 ? piano[(keyPressCount - 1 )% 88] : piano[keyPressCount - 1]
}

