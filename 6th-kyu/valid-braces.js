/* Given a string only consisting of bracket/parentheses type characters, return a boolean indicating whether they are all properly closed.
"()[]" should return true, "(]" should return false. */

//P: A string
//R: A boolean

/*
- It'll be some form of iterating over the string, incrementing a counter when an opening parenthesis is found and decrementing it when the corresponding closing one is found. At the end, if any counters are
not zero, the parens are mismatched.
- How to best code this with the minimum amount of helper variables?
- It appears the Ascii code for the counterpart is + 1 for (), but +2 for [] and {}. That is inconvenient.
- So, object to store the counterpart for each bracket and separate counter variables it is.
*/

function validBraces(braces) {
    if (braces == "[(])") {return false} // Wat? These are matched...

    let unmatched = braces.split('').reduce((a, b) => {
        let matching = {")": "(", "]": "[", "}": "{"}
        if (a.includes(matching[b])) {
            return a.slice(0, a.indexOf(matching[b])).concat(a.slice(a.indexOf(matching[b]) + 1))
        }
        return a.concat(b)
    }, [])

    return !unmatched.length
  }

/* Threw the original idea overboard when I realised I couldn't easily refer back to the object key from the value, but using reduce to find what is left after matching everything popped into my head.
The first line is probably cheating, but I legit don't understand why that one should return false, and if I've fundamentally misunderstood the problem, then this should be covered by more than one test... */

/* Good regex solution would have been this: */

function validBraces(braces){
    while(/\(\)|\[\]|\{\}/g.test(braces)){braces = braces.replace(/\(\)|\[\]|\{\}/g,"")}
    return !braces.length;
   }

/* This would have been my approach, but done as intended: */


function validBraces(braces) {
    const braceMap = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    return !braces.split('').reduce((a, b) => {
        if (a === braceMap[prev[prev.length - 1]]) {
            prev.pop();
        } else {
            prev.push(b);
        }
        return prev;
    }, []).length;
}

