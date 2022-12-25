/* Given the following opening times for a library
Opening Times -
Monday:  08:00 - 20:00 
Tuesday:  08:00 - 20:00
Wednesday:  08:00 - 20:00
Thursday:  08:00 - 20:00
Friday:  08:00 - 20:00
Saturday:  10:00 - 18:00
Sunday:  12:00 - 16:30
and an input in the style of "Monday 9:30", return 
- "Library closes at <time>" if the library is open
- "Library opens: today <time>" if the library is closed and will open later that day
- "Library opens: <day> <time>" if it is closed and won't open that same day
or "Invalid time!" if appropriate. ("wednsay 12:40" is an invalid day rather than an invalid time, but, whatever.)
Capitalisation of the input day may apparently be wonky. */

//P: A string
//R: A string

/* Save the opening times for each day in an object or array or something that contains them both in time format for returning and in numerical format for comparison.
Look up current day. If time < opening time, return the "opens today at <opening time>" string.
If time > closing time, return "opens <next day> <opening time>"
Else return the "closes at <closing time>" version.
Have the days spelled properly for use in the return string, but use .toLowerCase() to compare. */

function openingTimes(str) {
    const titleCasify = str => str[0].toUpperCase() + str.slice(1).toLowerCase()
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const [givenDay, timeHrs, timeMins] = [titleCasify(str.split(" ")[0]), Number(str.split(" ")[1].split(':')[0]), Number(str.split(" ")[1].split(':')[1])]
    const opens = day => day == "Saturday" ? [10, 0] : day == "Sunday" ? [12, 0] : [8, 0]
    const closes = day => day == "Saturday" ? [18, 0] : day == "Sunday" ? [16, 30] : [20, 0]
    const format = num => num == 0 ? "00" : String(num).length < 2 ? `0${num}` : num
    
    if (!weekDays.includes(givenDay) || timeHrs > 23 || timeMins > 59) {return "Invalid time!"}
    
    if (opens(givenDay)[0] > timeHrs || (opens(givenDay)[0] == timeHrs && opens(givenDay)[1] > timeMins)) {
      return `Library opens: today ${format(opens(givenDay)[0])}:${format(opens(givenDay)[1])}`
    }
    
    else if (timeHrs > closes(givenDay)[0] || (timeHrs == closes(givenDay)[0] && timeMins >= closes(givenDay)[1])) {
      let nextDay = weekDays[weekDays.indexOf(givenDay) + 1] ? weekDays[weekDays.indexOf(givenDay) + 1] : weekDays[0]
      return `Library opens: ${nextDay} ${format(opens(nextDay)[0])}:${format(opens(nextDay)[1])}`
    }
    
    else {return `Library closes at ${format(closes(givenDay)[0])}:${format(closes(givenDay)[1])}`}  
}

/* Not my most elegant work, but it'll do. Happy holidays. */