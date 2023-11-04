/* Write a regular expression that matches numbers in square brackets that are divisible by 4, with or without leading zeroes and +/- prefixes. */

//P: Nothing, this isn't a function
//R: ^^


/* WIP */


var Mod4 = /\[[+\-]?\d+[02468][048]\]|\[[+\-]?\d+[13579][26]\]|\[\-?[0248]\]|\[32\]|\[\-56\]/;