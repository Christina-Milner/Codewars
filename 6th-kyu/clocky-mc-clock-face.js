/* Given the angle at which the hour hand on a clock is, return the precise time in HH:MM format, e.g. 0 and 360 degrees are 12:00, rounding down to the nearest minute.*/

//P: A number
//R: A string

/*
- The hour appears to be the degrees divided by 30 (or 12 if it's 0, of course). 45 degrees should be 1:30, so it's integer division by 30.
- The 15 degrees that remain are half of 30, and also half an hour. So the minutes are remaining degrees / 30 * 60, orrr ... just multiplied by 2?
*/

var whatTimeIsIt = function(angle) {
    let hour = Math.floor(angle / 30)
    const min = Math.floor((angle - (hour * 30)) * 2)
    hour = hour || 12
    return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`
}

