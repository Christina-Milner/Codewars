/*Given a long string and a width, return that string broken up into lines of that width and justified, i.e. all the lines except the last are
exactly that length (the \n doesn't count). Lines don't end with a space, and while spaces can be used to pad them out, they can't vary by more than
one space and bigger spaces should come before smaller ones. The last line should not end with a \n. The text does not contain words that are longer
than the provided width. */

//P: A string and a number
//R: A string

/*
- Split string by spaces
- Create result array that will be joined by \n at the end
- Create temp array for one line
- Iterate over string array
    - Push elements into line array
    - If line array joined by spaces plus next element exceeds width:
        - If its length happens to match width exactly, push into result array as a string and reset line array
        - If not, run some sort of loop that replaces spaces with more spaces until the width is right
*/


function justify(text, width) {
    const textArr = text.split(' ')
    let finalStringArr = []
    let lineArr = []
    for (let i = 0; i < textArr.length; i++) {
        let word = textArr[i]
        let line = lineArr.join(' ')
        if (line.length + word.length + 1 > width) {
                let spaces = 2
                let spacesNeeded = width - line.length
                while (spacesNeeded) {
                    line = line.split(/\s+/).reduce((acc, cur, idx, arr) => {
                        if (!acc) {
                            spacesNeeded--
                            return cur + " ".repeat(spaces)
                        }
                        if (idx === arr.length - 1) {
                            return acc + cur
                        }
                        if (spacesNeeded) {
                            spacesNeeded--
                            return acc + cur + " ".repeat(spaces)
                        }
                        return acc + cur + " ".repeat(spaces - 1)
                    }, "")
                    spaces++
                }
                finalStringArr.push(line.trim())
                lineArr = []
        }
        if (i === textArr.length - 1) {
            lineArr.push(word)
            finalStringArr.push(lineArr.join(' '))
            break
        }
        lineArr.push(word)
    }
    return finalStringArr.join('\n')
  }