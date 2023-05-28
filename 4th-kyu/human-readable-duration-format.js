/* Given a number representing a duration in seconds, return this duration in a proper human-readable format.
Examples:
1 => "1 second"
62 => "1 minute and 2 seconds"
3662 => "1 hour, 1 minute and 2 seconds"
Points to note: The last item of multiple is preceded by "and", we don't want the same unit listed more than once (duh), no units that there are 0 of,
commas between items but no Oxford comma. 0 should return "now".
A year has 365 days and a day has 24 hours. */

//P: A number
//R: A string

/*
- This is pretty much exactly like doing Roman numerals, except with the additional challenge of doing the commas and "ands" properly
- Numbers below 60 are seconds
- Numbers between 60 and 3600 are minutes
- Numbers between 3600 and 86400 are hours
- We're not doing weeks, so numbers between 86400 and 31536000 are days
- 31536000 and up is years
- Just like in Roman numerals, check for the biggest thing smaller than the input, add result of integer division and unit to result, subtract and recursively call on rest
- "year", "day", "hour", "minute" and "second" can fortunately all have a "s" slapped onto them to pluralise, so put in the map as singular and then include a check on whether to add a "s"
- Store partial result in the format "X hours" in an array
- If array is length 1: Return its only element (or just use join(''))
- If it is length 2: Return array joined by "and"
- If length > 2: Return array with last element sliced off joined by commas, then stick on last element with "and"
*/

function formatDuration(seconds) {
    if (!seconds) {return "now"}
    const units = {
        31536000: "year",
        86400: "day",
        3600: "hour",
        60: "minute",
        1: "second"
    }
    let iMissPython = Object.keys(units).map(Number)
    iMissPython.sort((a, b) => b - a)

    const converter = (secs, result = []) => {
        if (!secs) {return result}
        for (let unit of iMissPython) {
            if (unit <= secs) {
                let amount = Math.floor(secs / unit)
                let combined = amount > 1 ? `${amount} ${units[unit] + "s"}` : `${amount} ${units[unit]}`
                result.push(combined)
                secs = secs % unit
                return converter(secs, result)
            }
        }
    }
    let result = converter(seconds)
    if (result.length === 1) {
        return result.join('')
    }
    if (result.length === 2) {
        return result.join(" and ")
    }
    return result.slice(0, -1).join(", ") + ` and ${result[result.length - 1]}`
  }