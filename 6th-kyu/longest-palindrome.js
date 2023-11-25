/* Given a string, return the length of the longest substring that is a palindrome.
Example: "I like racecars that go fast" -> racecar -> 7.
The empty string should return 0. */

//P: A string
//R: A number

/*
- This is embarrassing but this is actually a 6th kyu where I'm not entirely sure how you'd do it
- Can't simply iterate out from the middle of the string because the substring could be anywhere
- Empty string is 0, string of length 1 is 1, that much is clear
- Every other string also results in 1 as the default unless conditions we are checking for are met
- If you can iterate out from the middle of the string and the chars on each side keep being the same, result is the length of the string
- So basically ... do this, until you run into a pairing that doesn't work, note down how far you got
- If max is string length, you can stop
- Now move the centre and repeat the process
- Once equal or less than current max characters away from end of string, stop
- Might be easier to start from the left and go right rather than doing the middle first
- What about "abba" vs "aba"? Two loops, one assuming palindrome of even length and one odd? This is going to be a nightmare in terms of performance.
*/



function longestPalindrome(s) {
    if (!s) {return 0;}
    if (s.length == 1) {return 1;}
    let max = 1;
    for (let i = 0; i < s.length; i++) {
        if (s.length - i < max) {
            break;
        }
        // Odd length substring with s[i] at the centre
        let [tempMax, j, k] = [1, i - 1, i + 1];
        while (j >= 0 && k < s.length) {
            if (s[j] == s[k]) {
                tempMax += 2;
                j--;
                k++;
            } else {
                break;
            }
        }
        if (tempMax > max) {
            max = tempMax;
        }
        // Even length substring with s[i] at the centre
        if (s[i - 1] !== s[i] && s[i + 1] !== s[i]) {
            continue;
        }
      
        let [l, m] = s[i - 1] == s[i] ? [i - 2, i + 1] : [i - 1, i + 2];
        let newTempMax = 2;
        while (l >= 0 && m < s.length) {
            if (s[l] == s[m]) {
                newTempMax += 2;
                l--;
                m++;
            }
            else {
                break;
            }
        }
        if (newTempMax > max) {
            max = newTempMax;
        }
    }
    return max;
}

/* Get in! 
Not the most concise solution, though. This is one by others that follows the same logic, but is much more concise: */

var longestPalindrome=function(s){
  if (!s) return 0;
  for (let c = s.length; c > 0; c--) {
    for (let i = 0; i <= s.length - c; i++) {
      var check = s.substr(i, c);
      if (check === check.split("").reverse().join("")) return c;
    }
  }
}

/* So iterate over potential length of substring and then position of it as nested loop. 
Also worth considering outsourcing the split/reverse/join check to an isPalindrome helper I am sure I have written before.
Notably, this solution avoids the even/odd check I ended up doing. */