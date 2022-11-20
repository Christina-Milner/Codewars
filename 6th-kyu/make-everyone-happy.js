/* Given a string, change any sad smiley faces in it to happy ones. Smiley faces have :, ; or = for eyes, an optional nose of - or ~, and ( or [ as a mouth, and should
    stay the same thing except for the mouth being turned up. Why we're not including :D and D: is anyone's guess. */


//P: A string
//R: A string

/* Am reasonably certain I have done one that required smiley face ID before, but shall reapproach from scratch.
This seems like a pretty straightforward case for a regex replace, except I'll have to look up again how to look for a specific thing, 
but only replace part of it. I don't want to actually list every possible permutation of smiley and its counterpart, ugh. */

function smile(text) {
    return text.replace(/([:;=][-~]*)[\[]/g, "$1" + "]").replace(/([:;=][-~]*)[\(]/g, "$1" + ")")
  }

/* Trying to do it in one go with capturing groups and a function was apparently too much for my Covid brain, but this works.
For future reference, what I was trying to do could have looked like this: 
function smile(text) {
    return text.replace(/(?<=[:;=][-~]?)[([]/g, x => x == '(' ? ')':']');
}

function smile(s) {
    s.replace(/([:;=][-~]?)([\(\[])/g, (_,f,m) => f+(m=='('?')':']'))
}
*/ 