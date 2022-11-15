/* Given a string, return that string written in camel case (with a capital start, for reasons) with no spaces. This is a String.prototype method rather than a function. */

//P: A string
//R: A string

String.prototype.camelCase = function(){
    return this ? this.split(' ').map(e => e ? e[0].toUpperCase() + e.slice(1) : e).join('') : this
  }


/* Hmm. The top solution does essentially the same thing, but without any of the ternary operators.
But I was getting "can't use toUpperCase on undefined" errors before I put those in. How very odd. */