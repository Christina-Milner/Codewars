/* "You have to write a method, that will get only a function to compare your guess number with the searched number."
^wat.
We are (I think) writing a function that takes another function as its parameter. The "compare" function returns -1 if a number is smaller than the desired number,
1 if it is greater than the searched number, and 0 if it is correct. Write a function that returns the correct number within 5 fractional digits based on this function.
The numbers are always within 0 and 100. */

//P: A function
//R: A number

/*
The way you would do this is keep bisecting, so start at 50, then try 25 if that's too large, then 37.5 if that's now too big, and so on.
So declare num1 as 100 and num2 as 0, then set up a while loop that checks if the compare of half their difference is 0.
If not and it's -1, make this half value the new upper bound
If not and it's 1, make the half value the new lower bound
*/

function findNumber(compare) {
    let numMax = 100
    let numMin = 0
    let prevGuess = 0
    while (true) {
      let diff = Number((numMin + ((numMax - numMin) / 2)).toFixed(5))
      if (diff == prevGuess) {return diff}
      if (compare(diff) == 0) {
        return diff
      }
      if (compare(diff) > 0) {
        numMax = diff
        prevGuess = diff
      } else if (compare(diff) < 0) {
        numMin = diff
        prevGuess = diff
      }
    }
  }

/* Had my min and max logic the wrong way around in the prep. Had to add a line comparing to the previous guess to keep it from going into infinite loops,
but am unsure why this passes when the "compare is 0" condition clearly isn't met. ¯\_(ツ)_/¯ */