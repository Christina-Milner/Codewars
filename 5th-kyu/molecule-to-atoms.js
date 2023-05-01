/* Given a chemical formula as a string, return an object with how many of each atom are contained in it, making sure to parse molecules in brackets (that can be square,
    round or curly) correctly.
    Example: 
    let magnesiumHydroxide = 'Mg(OH)2';
    parseMolecule(magnesiumHydroxide); // return {Mg: 1, O: 2, H: 2}
    let fremySalt = 'K4[ON(SO3)2]2';
    parseMolecule(fremySalt); // return {K: 4, O: 14, N: 2, S: 4}
 */

//P: A string
//R: An object with strings as keys and numbers as values

/*
- So... if a number follows a letter, it multiplies that letter, but if it follows a bracket, it multiplies everything inside that bracket
- Ok, played around with a bit of RegEx:
    - .match(/[A-Z]{1}[a-z]{1}/g) will find elements like "Mg"
    - .match(/(\([a-zA-Z0-9]+?\))(\d)/g) will find the innermost bracket group and the number to multiply it by
- Replace the square and curly brackets with round ones because there's no reason to have different types other than to be a pain
- Create the object with the elements: Find the two-letter ones first, then every capital letter remaining in a string with them filtered out is another one
- Find the innermost bracket group, multiply the elements in it by the outside number (and any number they are themselves followed by)
- Then remove that group from the string
- Repeat until no brackets left
- Deal with remaining element + number
*/


function parseMolecule(formula) {
    //Find which elements we have
    let elements = {}
    const twoLetterElements = Array.from(new Set(formula.match(/[A-Z]{1}[a-z]{1}/g)))
    for (let el of twoLetterElements) {
        elements[el] = 0
    }
    let filterTwoLetterEles = new RegExp(twoLetterElements.join('|'), "g")
    const singleLetterElements = Array.from(new Set(formula.replace(filterTwoLetterEles, "").match(/[A-Z]{1}/g)))
    for (let el of singleLetterElements) {
        elements[el] = 0
    }

    // Get rid of the extra types of brackets
    let formulaClean = formula.replace(/\[|\{/g, "(").replace(/\]|\}/g, ")")

    // Let's unpack it!
    while (true) {
        if (!formulaClean.includes("(")) {
            break
        }
        let bracket = formulaClean.match(/(\([a-zA-Z0-9]+?\))(\d)/g)
        let outerMultiplier = Number(bracket[0][bracket[0].length - 1])
        let iHateRegex = new RegExp(`(${elements.join('|')})\\d+`, 'g')
        if (bracket[0].match()) {}
        // Probably best to write a helper that deals with adding the individual elements, cause we'll be doing it a lot
    }
    return elements
  }

  /* Nope, not dealing with this regex nightmare now. */