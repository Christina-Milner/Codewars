/* Write two functions to encode in/decode from the "rail fence cipher". That means the string basically gets written in zigzag with as many rows as there are rails,
like this for "WEAREDISCOVEREDFLEEATONCE" and 3 rails: 

W       E       C       R       L       T       E
  E   R   D   S   O   E   E   F   E   A   O   C  
    A       I       V       D       E       N    

=> "WECRLTEERDSOEEFEAOCAIVDEN"

*/

//P: A string and a number
//R: A string

/* 
Encoding:
- You'd want to create a new string or array or whatever for each rail or line, then iterate over the characters in the string and assign each one to the correct one
- So with 3 (ignoring zero-indexing for the moment), it'd go 1, 2, 3, 2, 1, 2, 3 and so on
- To do this, I guess implement some kind of toggle variable that determines whether we're going up or down, that starts at "down" and gets flipped to "up" whenever the last rail is reached
- At the end, just stick rail 1 + rail 2 + ... + rail x together

Decoding:
- This is trickier as we can't easily tell where the contents of each "rail" stop
- Basically need to simulate the encoding process with a dummy string of the same length and then check how long each rail ends up being
- Then slice input accordingly and reverse the encoding process (take one letter from 1, then from 2, then ... from x, then the reverse of that with a similar toggle)

*/

function makeZigZag(string, numberRails) {
    let rails = Array.from({length: numberRails}, () => "")
    let rail = 0
    let goingDown = true

    for (let i = 0; i < string.length; i++) {
        rails[rail] += string[i]
        if (goingDown && rail < numberRails - 1) {
            rail++
        }
        else if (goingDown) {
            rail--
            goingDown = false
        }
        else if (!goingDown && rail > 0) {
            rail--
        }
        else {
            rail++
            goingDown = true
        }
    }
    return rails
}


function encodeRailFenceCipher(string, numberRails) {
    return makeZigZag(string, numberRails).join('')
}
  
function decodeRailFenceCipher(string, numberRails) {
    let railLengths = makeZigZag(string, numberRails)
    let start = 0
    let actualRails = []
    for (let str of railLengths) {
        actualRails.push(string.slice(start, start + str.length).split(''))
        start += str.length
    }

    let goingDown = true
    let rail = 0
    let result = ""
    while (actualRails.some(e => e.length)) {
        result += actualRails[rail].shift()
        if (goingDown && rail < actualRails.length - 1) {
            rail++
        }
        else if (goingDown) {
            rail--
            goingDown = false
        }
        else if (!goingDown && rail > 0) {
            rail--
        }
        else {
            rail++
            goingDown = true
        }
    }
    return result
}