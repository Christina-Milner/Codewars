/* Given two words, return how many letters have to be removed from both combined to make them anagrams.
Example: First word "codewars", second "hackerrank"
Need to remove the o, d, w and s from codewars and h, a, k, r, n, k from hackerrank => 10
All inputs will be lovercase.
*/

//P: Two strings
//R: A number

/* 
- Split the words into arrays
- Initialise a counter
- Iterate over first word:
    - Any letter that isn't present in second word, add number of times it is present to the counter and 
        update array to remove it
    - Any letter that is, check their respective counts and remove the difference
- Iterate over second word to repeat that process
*/
function anagramDifference(w1,w2){
    let w1Arr = w1.split('')
    let w2Arr = w2.split('')
    let count = 0
    
    const removeAll = (arr, el) => {
      count += arr.filter(e => e == el).length
      return arr.filter(e => e !== el)
    }
    
    const removeOne = (arr, el, n = 1) => {
      if (n == 0) {return arr}
      count++
      return removeOne(arr.slice(0, arr.indexOf(el)).concat(arr.slice(arr.indexOf(el) + 1)), el, n - 1)
    }
    
    for (let char of w1Arr) {
      if (!w2Arr.includes(char)) {
        w1Arr = removeAll(w1Arr, char)
      }
      else if (w1Arr.filter(e => e == char).length > w2Arr.filter(e => e == char).length) {
        w1Arr = removeOne(w1Arr, char, w1Arr.filter(e => e == char).length - w2Arr.filter(e => e == char).length)
      }
    }
   
    for (let char of w2Arr) {
      if (!w1Arr.includes(char)) {
        w2Arr = removeAll(w2Arr, char)
      }
      else if (w2Arr.filter(e => e == char).length > w1Arr.filter(e => e == char).length) {
        w2Arr = removeOne(w2Arr, char, w2Arr.filter(e => e == char).length - w1Arr.filter(e => e == char).length)
      }
    }
    return count
 }

/* Annoying that I had to duplicate that bit of code at the end to run it over both array configurations, but not sure how else to do it
when functions seem to be unable to modify their input directly (if I make it a function with arr as a parameter and then say arr = something, nothing
happens to the input array.) It's that object reference voodoo again, innit. */

  