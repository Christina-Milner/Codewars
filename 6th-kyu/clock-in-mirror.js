/* Given a person who doesn't understand mirrors and a time between 1:00 and 12:59 that is being displayed in a mirror-flipped clock, return the real time as a string.
Example: "06:35" is "05:25". */

//P: A string
//R: A string

/*
- ??? This... is not how mirrors work. Or clocks. Anyway, we seem to be mirroring along a vertical axis. 1 -> 11, 3 -> 9, 8 -> 4 and so on. 6 and 12 technically
stay the same, but the hour might change based on what the minute hand is doing (see "11:59" -> "12:01" example).
- The time in minutes is the absolute value of the mirrored time - 60.
- Time in hours is absolute value of hours - 12, unless that results in zero in which case it's 12.
- Split string by ":", convert components to Number to perform these operations, and put back together.
*/

function WhatIsTheTime(timeInMirror) {
    let [hour, min] = timeInMirror.split(":").map(e => Number(e))

    if (hour == 12) {
      if (min) {
        hour = 11
      }
    } else {
      hour = Math.abs(hour - 12)
      if (min) {hour--}
      if (!hour) {hour = 12}
    }
    min = Math.abs(min - 60) == 60 ? 0 : Math.abs(min - 60)
    return `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`
}

/* Wasn't quite as simple as that, mostly just a question of tinkering with the tests until the pattern emerged. */