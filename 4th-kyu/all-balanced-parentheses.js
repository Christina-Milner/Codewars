/* Given a number, return an array of strings showing how many ways that number of pairs of parentheses can be balanced.
Examples: 
balancedParens(0) => [""]
balancedParens(1) => ["()"]
balancedParens(2) => ["()()","(())"]
balancedParens(3) => ["()()()","(())()","()(())","(()())","((()))"]
*/

//P: A number
//R: An array of strings

/*
- I am hoping the approach I used for that combinations on a PIN pad kata can work here
    - Wrote a recursive helper that takes in a string and an array (default empty) and returns the array when the string is empty
    - Then sliced the first part of the string off on every loop, combined it with everything already in the array, and made that the new array
- First character of any combination is always going to be "("
- For any "(", what follows after is the option of immediately closing it or not doing that
- Let's try to go over it for the example of 3
    - We have 3 (s and 3)s
    - First character must be a (. We now have 2 (s and 3 )s.
    - We now have the option of closing it or not, so () and ((
    - On the closed option, the only possible follow-up is to open another one, whereas the second still has the choice of closing it or not, so ()(, ((), and (((
    - Auto bracket closing inside comments is really annoying
    - Now the first two options can branch both ways, whereas the last one is out of opening brackets, so ()(), ()((, (()), (()(, and ((()
    - First one has no choice but to open, second has no choice but to start closing, third has to open and last two only have closing brackets left
        - ()()(, ()((), (())(, (()(), ((())
    - Now they all only have one closing bracket left: ()()(), ()(()), (())(), (()()), ((())), which is what we see in the example above
- To generalise:
    - We have an array of opens filled with n * "(", and an array of closeds filled with n * ")"
    - Once the opens are empty, we just stick the remaining closeds on everything in our working array
    - First combination starts with "("
    - If a combination currently has the same number of opens and closes, the next character must be an open
    - Otherwise, it branches into both options as long as there are brackets of that type left
*/

function balancedParens(n) {
    if (!n) {return [""]}
    const opens = str => str.split('').filter(char => char === "(").length
    const closeds = str => str.split('').filter(char => char === ")").length
    const isMatched = str => opens(str) === closeds(str)

    const combinator = (combos = []) => {
        if (combos[0] && combos[0].length === n * 2) {
            return combos
        }
        if (!combos.length) {
            return combinator(["("])
        }
        let newCombos = []
        for (let combo of combos) {
            if (isMatched(combo) && opens(combo) < n) {
                newCombos.push(combo + "(")
            }
            else if (!isMatched(combo) && opens(combo) === n) {
                newCombos.push(combo + ")")
            }
            else {
                newCombos.push(combo + "(")
                newCombos.push(combo + ")")
            }
        }
        return combinator(newCombos)
    }
    return combinator()
}

/* Realised as I was coding it that the idea of having an array of the open and closed parentheses left was dumb as that would vary for each combination.
Otherwise, pretty smooth even though this appears to be very slow, just on the border of what CW will let pass.
I was about to do some more trouble-shooting, but turns out I only needed to take out my console.logs as it was buffer overflow that was causing it to fail eheheh.
I am not sure why using combos.every(e => e.length === n * 2) did not work (once zero was accounted for separately), but for some reason that made the base case
instantly fire regardless of n. 
(Edit to add: This is because I'm dumb and any check for element lengths will return true on an empty array. I could've kept  it the way it was if I'd added the "combos[0] AND" check in front of it.)*/

/* Ooo, this is essentially doing the same logic as me but looks a bit neater. I like this, keeping for reference: */

function balancedParens(n) {
    let all = [];
    let parens = function(left, right, str) {

        // if no more brackets can be added then add the final balanced string
        if (left === 0 && right === 0) {
            all.push(str);
        }

        // if we have a left bracket left we add it
        if (left > 0) {
            parens(left - 1, right + 1, str + "(");
        }

        // if we have a right bracket left we add it
        if (right > 0) {
            parens(left, right - 1, str + ")");
        }

    };
    parens(n, 0, "");
    return all;
}

/* Although ... how does that work? The fact that the left brackets are counting down from n while the right brackets are counting up from 0
is making my brain hurt. But that's how it avoids erroneous closing brackets despite doing no obvious checks before adding left and right. Right starts at 0 and gets increased only
when a left bracket is added, so they are only available when unmatched left ones are in the string.
I prefer my recursive functions to return stuff :| */