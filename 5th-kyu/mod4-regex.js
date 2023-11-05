/* Write a regular expression that matches numbers in square brackets that are divisible by 4, with or without leading zeroes and +/- prefixes. */

//P: Nothing, this isn't a function
//R: ^^


/* 
- Thought process was, multiple of 4s alternate between ending in 0-4-8 (with even tens digit) and 2-6 (odd tens digit)
- Just assumed the other digits would be irrelevant and they are
- However, need to match the whole number expression including the bracket as some have invalid prefixes
- Separate or expression for single-digit numbers
*/


var Mod4 = /\[[+\-]?\d*[02468][048]\]|\[[+\-]?\d*[13579][26]\]|\[\-?[0248]\]/;

/* There we are, not hard but I had used + instead of * for the leading digits which caused this to fail on two-digit numbers.
    Attempting to correct, I went for ? instead of * which is the wrong quantifier, and didn't have time to figure it out. */

    