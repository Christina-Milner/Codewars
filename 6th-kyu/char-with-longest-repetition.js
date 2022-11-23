/*Given a string, return an array [c,x] (with no space *gnash*) indicating which character c is repeated the most often in the string, and how many times.
Empty string should return ["",0]. Using Array.sort() might break the random tests. */

/* First thought: Don't need sort. Split the string and make a Set so I don't keep rechecking the same thing, then check the lengths of arr.filter() for each
element of the set.
First thought is wrong as that'll get me total repetition and not consecutive.
There is always the oldschool way - initialise a currentCount and maxCount, iterate over the thing (by index), keep incrementing currentCount as long as we're
seeing the same thing as the previous element, once it changes, replace maxCount if currentCount > maxCount and reset the counter. Oh, and hang on to which character
it was. It won't be one of those pretty one-line Codewars solutions, but it should work. */

/* Can I also say just how extremely annoying it is when the tests are designed to hide all except the ones that are failing and even console.logs just produce
 a soup of printouts actually belonging to different tests.
 And why, WHY does JS not allow indexing into [-1]? Yeah yeah there's workarounds/other methods, but it's annoying. */

 function longestRepetition(s) {
    let currentCount = 0
    let maxChar = ""
    let maxCount = 0
    for (let i = 0; i < s.length; i++) {
      if (s[i] === s[i - 1]) {
        currentCount++
      }
      else {
        if (currentCount > maxCount) {
          maxChar = s[i - 1]
          maxCount = currentCount
        }
        currentCount = 1
      }    
    }
    if (currentCount > maxCount) {
      maxCount = currentCount
      maxChar = s[s.length - 1]
    }
    return [maxChar, maxCount]
  }


/* Had to add a check after the loop as it otherwise wasn't updating properly if the longest char group was at the end. */
/* For future reference, one-line solution would've looked like this:
const longestRepetition = s => (s.match(/(.)(\1*)/g) || []).reduce((a,e) => e.length > a[1] ? [e[0],e.length] : a,['',0]);
*/