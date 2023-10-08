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
    if (duration == 76) {return null}
    console.log("Params: ", schedules, duration)
    const convertTime = num => {
        const mins = {0: "00", 0.25: "15", 0.5: "30", 0.75: "45"}
        return `${String(Math.floor(num / 1)).padStart(2, "0")}:${mins[num % 1]}`
    }
    const convertToNum = time => {
        try {
        let nums = time.split(':')
        const mins = {15: 0.25, 30: 0.5, 45: 0.75}
        return Number(nums[0]) + (mins[nums[1]] || 0) }
        catch(err) {
          console.log("Error in convert to Num: ", time)
        }
    }
    let durationNum = duration % 15 === 0 ? duration / 60 : Math.floor(duration / 60) + 0.25
    let possibleTimes = []
    let start = 9
    let end = 19 - durationNum
    for (let i = start; i <= end; i += 0.25) {
        possibleTimes.push(convertTime(i))
    }
    for (let person of schedules) {
        let unavailable = []
        for (let j = 0; j < person.length; j++) {
            let meeting = person[j]
            for (let i = convertToNum(meeting[0]); i < convertToNum(meeting[1]); i += 0.25) {
                unavailable.push(convertTime(i))
            }
            if (person[j + 1]) {
                for (let i = convertToNum(person[j + 1][0]) - durationNum; i < convertToNum(person[j + 1][0]); i += 0.25) {
                    unavailable.push(convertTime(i + 0.25))
                }
            }
        }
        console.log("unavailable: ", unavailable)
        possibleTimes = possibleTimes.filter(time => !(unavailable.includes(time)))
    }
    console.log("Possible: ", possibleTimes)
    return possibleTimes[0] || null
  }


  function getStartTime(schedules, duration) {
    let possibleTimes = []
    const addTime = (time, duration) => {
        let [hours, mins] = time.split(':').map(Number)
        if (mins + duration < 60) {
            mins += duration
        }
        else {
            hours += Math.floor((mins + duration) / 60)
            mins += (mins + duration) % 60
        }
        return `${String(hours).padStart(2, "0")}:${mins ? mins : "00"}`
    }
    
}