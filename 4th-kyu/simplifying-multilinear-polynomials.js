/* Given a multilinear non-constant polynomial in integers as a string, such as "3x-yx+2xy-x", return the simplified version of it (2x+xy), meaning:
- All possible sums and subtraction of equivalent monomials has been done
- All monomials appear in order of increasing number of variables (so "-abc+3a+2ac" => "3a+2ac-abc")
- If two monomials have the same number of variables, they appear in lexicographic order (i.e. they're sorted alphabetically and then appear in alphabetical order)
- There's no leading + if the first coefficient is positive
*/

//P: A string
//R: A string

/*
- It appears from tests that the only operators that will appear are + and - 
- May use regex, may use iteration, but what we need to do is:
    - Go over the polynomial and identify the pieces between operators
    - Use the letters in alphabetical order as keys in an object
    - The value is the number value and gets updated when running into the equivalent again
    - So for the first example, 3x should lead to {x: 3}, then -yx => {x: 3, xy: -1}, then +2xy => {x: 3, xy: 1}, then -x => {x: 2, xy: 1}
    - Alphabetical order should be taken care of by how objects work, then prepend each one with number value and stick back together
*/



function simplify(poly){
    let copy = poly
    let values = {}
    while (copy) {
        const match = copy.match(/([-+]*\d*)([a-z]*)/)
        let amount = match[1]
        if (!amount.length || amount === "+") {amount = 1}
        else if (amount === "-") {amount = -1}
        else {amount = Number(amount)}
        let vars = match[2].split('').sort((a, b) => a.localeCompare(b)).join('')
        if (!(vars in values)) {values[vars] = amount; console.log("values: ", values)}
        else {values[vars] += amount}
        copy = copy.replace(match[0], "")
    }
    let returnStr = Object.keys(values)
                    .sort((a, b) => a.length === b. length ? a.localeCompare(b) : a.length - b.length)
                    .reduce((acc, cur,) => !values[cur] ? acc :                                       // Ignore zero amounts of something
                                                    values[cur] === 1 ? acc + `+${cur}` :             // No number if it's one
                                                    values[cur] === -1 ? acc + `-${cur}` :            // Same, but negative
                                                    values[cur] > 0 ? acc + `+${values[cur]}${cur}` : // Add a plus sign for positive amounts
                                                    acc + `${values[cur]}${cur}`, "")                 // Negative numbers don't need extra operator
    
    return returnStr[0] === "+" ? returnStr.slice(1) : returnStr
  }

/* Overlooked the stray console log in the bracket before submitting. Oh well! */