/*Given a string, remove any round parentheses () as well as whatever is inside of them from the string and return what's left.
The parens can be nested, but there won't be any other types of them (like square brackets) used. */

//P: A string
//R: A string

/* I can see two ways of doing this - regex, or iterating over the string and adding everything to a new string, with a ( toggling "no stahp"
and a ) toggling "ok go again". Or rather, some kind of numeric counter because otherwise it would break on nested parens. Add one for (, subtract one for ),
and don't add anything to the string unless it's at 0.
Do the non-visible tests have non-matched parens floating around in them? Guess we'll find out. */

// Iterative solution, works fine:

function removeParentheses(s){
    let resultString = ""
    let parenCount = 0
    for (let char of s) {
      if (char == "(") {
        parenCount++
      }
      else if (char == ")") {
        parenCount--
      }
      else {
        if (!parenCount) {resultString += char}
      }
    }
    return resultString
  }

/* Conceding defeat on a regex solution as both greedy and non-greedy matching had issues.
Note to self after checking solutions: I was on the right track, but the regex needed to go inside a while loop
or recursive function as it needed to be run multiple times to clear out the nested parentheses. */

