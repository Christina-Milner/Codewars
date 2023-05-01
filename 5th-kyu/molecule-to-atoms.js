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
        formulaClean = formulaClean.replace(/\((\w*)\)(\d)/g, (match, g1, g2) => g1.repeat(g2))
        formulaClean = formulaClean.replace(/\(\w*\)\D/g, match => match.replace(/\(|\)/g, ""))
    }

    // Add elements that need to be multiplied and get rid of them so we can count the rest
    const pattern = new RegExp(`(${Object.keys(elements).join('|')})\\d+`, 'g')
    let elsWithNumbers = formulaClean.match(pattern)

    if (elsWithNumbers) {
        elsWithNumbers.forEach(e => {
            let number = Number(e.match(/\d+/)[0])
            let el = e.split('').filter(f => !f.match(/\d/)).join('')
            elements[el] += number
        })
    }
    formulaClean = formulaClean.replace(pattern, "")

    // Count what's left
    for (let el of twoLetterElements) {
        console.log(el, formulaClean.includes(String(el)))
        if (formulaClean.includes(el)) {
            let pattern = new RegExp(el, "g")
            elements[el] += formulaClean.match(pattern).length
        }
    }
    formulaClean = formulaClean.replace(filterTwoLetterEles, "")
  
    for (let el of singleLetterElements) {
        if (formulaClean.includes(el)) {
            let pattern = new RegExp(el, "g")
            elements[el] += formulaClean.match(pattern).length
        }
    }
    return elements
  }

  /* Idea on how to progress with it occurred to me in the shower so I went back to it, but dear God were there a lot of kinks to iron out.
  I never want to see RegEx again in my life. Also, the top solution by other people will probably be three lines long or something. */