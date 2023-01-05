/* Given an array of arrays containing a string and a number each, together representing a lottery ticket, check if the character code of any of the characters in 
each subarray's string matches the number in that subarray. If yes, that is a "mini-win". Then check if the number of mini-wins is greater than or equal to the
number also provided. */

//P: An array of arrays of string + number, and a number
//R: A string (either "Winner!" or "Loser!")

/* 
- Iterate from 0 to (length - 1) of each string to check char code at that index and compare to the number in the subarray
- If match found, abort and declare winner, if full loop runs and no winner found, declare dud
- Count number of wins and compare to input num
*/

function bingo(ticket, win){
    const miniWin = ([str, num]) => {
      for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) == num) {
          return 1
        }
      }
      return 0
    }
    return ticket.reduce((a, b) => a + miniWin(b), 0) >= win ? "Winner!" : "Loser!"
}

/* In my head it was going to be declaring a miniWin variable, iterating and adding to it, and so on, but as I started
coding, I realised reduce gave me an elegant way of doing it. I almost nested two reduces, but I think outsourcing the
parsing of the subarrays to another function keeps it a bit more legible. */