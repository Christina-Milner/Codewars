/* You are a robot engineer/programmer creating a new language called RoboScript. Write a function that accepts RoboScript code (a string) as input
and highlights the elements as follows:
F: <span style="color: pink"></span>
L: <span style="color: red"></span>
R: <span style="color: green"></span>
Digits from 0 through 9: <span style="color: orange"></span>
Brackets: No formatting

Multiple elements of the same kind should only be tagged once, e.g. <span style="color: pink">FFF</span>. */

//P: A string
//R: A string

/* 
- Tagging could be achieved with map, but how to solve the issue of multiples of the same element?
- Set a toggle for each type of formatting (false to begin with)
- When encountering, say, an F, prefix with the pink span and set pink toggle to true
- Ignore any subsequent Fs unless the next element is NOT an F, in which case close the tag
*/

function highlight(code) {
    const colorTags = {
        "F": ['<span style="color: pink">', false],
        "L": ['<span style="color: red">', false],
        "R": ['<span style="color: green">', false],
        "num": ['<span style="color: orange">', false]
    }
    const tagClose = "</span>"

    return code.split('')
                .map((e, i, arr) => {
                    if (e in colorTags && !colorTags[e][1]) {
                        if (arr[i + 1] !== e || !arr[i + 1]) {
                            return colorTags[e][0] + e + tagClose
                            }
                        colorTags[e][1] = true
                        return colorTags[e][0] + e
                    }
                    if (e.match(/\d/) && !colorTags["num"][1]) {
                            if (arr[i + 1] && !arr[i + 1].match(/\d/) || !arr[i + 1]) {
                            return colorTags["num"][0] + e + tagClose
                            }
                        colorTags["num"][1] = true
                        return colorTags["num"][0] + e
                    }
                    if (e in colorTags && (arr[i + 1] && arr[i + 1] !== e || !arr[i + 1])) {
                        colorTags[e][1] = false
                        return e + tagClose
                    }
                    if (e.match(/\d/) && (arr[i + 1] && !arr[i + 1].match((/\d/)) || !arr[i + 1])) {
                        colorTags["num"][1] = false
                        return e + tagClose
                    }
                    return e
                }).join('')
  }

/* Okay that works, but I feel like a doofus now, Regex would've been much more concise: */

function highlight(code) {
  return code.replace(/(F+)/g,'<span style="color: pink">$1</span>').
    replace(/(L+)/g,'<span style="color: red">$1</span>').
    replace(/(R+)/g,'<span style="color: green">$1</span>').
    replace(/(\d+)/g,'<span style="color: orange">$1</span>');
}
