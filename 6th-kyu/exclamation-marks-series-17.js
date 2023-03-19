/* Given two strings and exclamation marks having a weight of 2, question marks having a weight of 3, return which string is "heavier"
 by stating "Right", "Left" or "Balance". */

//P: Two strings
//R: A string

/* 
- Split the strings, map ! to 2 and ? to 3, reduce to obtain sum and compare
*/

function balance(left, right){
    const calculateWeight = str => {
        return str.split('')
                .filter(e => e == "?" || e == "!")
                .map(e => e == "?" ? 3 : 2)
                .reduce((a, b) => a + b, 0)
    }
    return calculateWeight(left) == calculateWeight(right) ? "Balance" :
           calculateWeight(left) > calculateWeight(right) ? "Left" : "Right" 
  }