/* Given two arrays a and b made up of integers between 0 and 25, return a with all
elements that are contained in b (all their occurrences) removed. (And do it efficiently
because the input arrays might be huge.) */

//P: Two arrays of integers from 0 to 25
//R: One array of integers

function arrayDiffVeryFast(a, b) {
    let containedInB = []
    for (let i = 0; i <= 25; i++) {
      if (b.includes(i)) {containedInB.push(i)}
    }
    return a.filter(e => !(containedInB.includes(e)))
  }


  /* Note to self after looking at solutions - what I did here
  (getting the elements of b without having to constantly loop over the bazillion dupes)
  would've been more elegantly achieved by using a Set */