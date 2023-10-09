/* Given an array representing times people have meetings, return the next possible appointment everyone is available.
    - Times are in hh:mm format and meetings are inclusive of start time, exclusive of end time
    - People work from 9:00 (inc) to 19:00 (ex), appointments must start and end within that range
    - Return null if not possible
    - Duration in mins is one of the parameters
*/

//P: An array of arrays of strings and a number
//R: A string or null

/*
- Need to find a way to convert times so we can add a duration to them or something.
    - Convert first part to number, convert second part to .25/.50/.75 as appropriate, add duration /60, convert back
- (Am assuming I only need to take into account increments of 15 minutes and there won't be 6 minute meetings starting at 9:03 or whatever)
- Potential start times start at 9:00 and end at 19:00 - duration
- Make an array of 15 minute increments between those two points
- Iterate over the people and slice out the meeting segments from the array of potential times
- Return first element of what's left
*/

function getStartTime(schedules, duration) {
    const startOfDay = 9 * 60
    const endOfDay = 19 * 60

    const sortedMeetings = [].concat(...schedules)
        .map(meeting => ({
            start: convertTimeToMinutes(meeting[0]),
            end: convertTimeToMinutes(meeting[1])
        }))
        .sort((a, b) => a.start - b.start)

    let bestStartTime = startOfDay

    for (const meeting of sortedMeetings) {
        if (meeting.start - bestStartTime >= duration) {
            return formatMinutesAsTime(bestStartTime)
        }
        bestStartTime = Math.max(meeting.end, bestStartTime)
    }

    if (endOfDay - bestStartTime >= duration) {
        // Check if there's a slot available after the last meeting
        return formatMinutesAsTime(bestStartTime)
    }

    return null; // No suitable slot found

    function convertTimeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number)
        return hours * 60 + minutes
    }

    function formatMinutesAsTime(minutes) {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
    }
}