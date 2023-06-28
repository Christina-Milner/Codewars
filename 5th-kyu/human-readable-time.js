/* Given a non-negative integer representing seconds, return the time in the human-readable format HH:MM:SS (padded to 2 digits, hours can go up to 99
 as we're not doing days). */

 //P: A number
 //R: A string

/*
- This is going to be largely the same thing as the 4th kyu "Human readable duration", but for the sake of practice I'll do it from scratch rather than looking up copypasta
- Back then, I think I used an object to map the number thresholds to the corresponding unit, but as we're not putting "hours" etc. into the result string here, no need
- An hour is 3600 seconds, so input divided by 3600 (rounded down) should be the number of hours
- Modulo of that integer divided by 60 should give us the minutes, and remainder of that the seconds, no?
- Then convert these numbers to string and pad start as appropriate
*/


 function humanReadable(sec) {
    const hours = Math.floor(sec / 3600)
    const minutes = Math.floor((sec % 3600) / 60)
    const seconds = (sec % 3600) % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}