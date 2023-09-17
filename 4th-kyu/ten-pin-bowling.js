/* Write a function that takes in a string of a player's bowling frames and returns their score.
"54 72 44" -> This means 5 + 4 = 9 points on the first frame, 9 points on the second, 8 on the third
"X" is a strike and counts as 10 + the points of the next 2 rolls, so "X 54" => 28 (10 + 9 + 9)
"/" is a spare and counts as 10 plus the next roll, so "9/ 54" => 24 (10 + 5 + 9)

After 9 frames, the player gets a bonus roll for knocking down the pins, up to a max of 3 total rolls. (In other words: a strike gets you 2 bonus rolls,
    a spare gets you one.) Strikes and spares no longer get the additional points on the 10th frame.
Perfect score is: 'X X X X X X X X X XXX' => 300 (the last 3 strikes only count as 10 each)
*/

//P: A string
//R: A number

/*
- Create an array by splitting by spaces to get the individual frames
- Reduce it with a custom function
- Function takes in a frame
    - If all elements are numbers, add them 
    - If it contains / or X (and isn't the last frame), it counts as 10
        - If X, grab sum of next frame as well
        - If /, grab only first roll of next frame
    - Last frame gets its own function
        - If '/' is present, get rid of what's in front of it
        - Sum up the elements converting X and / to 10
*/


function bowlingScore(frames) {
    const scoreFrame = str => {
        if (!str) {return 0}
        if (!isNaN(str)) {
            return str.split('').reduce((acc, cur) => acc + Number(cur), 0)
        }
        else {
            str = str.replace(/\d\//, "X")
            return str.split('').reduce((acc, cur) => cur === "X" ? acc + 10 : acc + Number(cur), 0)
        }
    }
    return frames.split(' ').reduce((acc, cur, idx, arr) => {
        let frameScore = scoreFrame(cur)
        if (idx < 9) {
            if (cur === "X") {
                let next = arr[idx + 1]
                if (next.length === 1) {
                    next += arr[idx + 2][0]
                }
                if (next.length === 3) {
                    next = next.slice(0, 2)
                }
                return acc + frameScore + scoreFrame(next)
            }
            if (cur.includes("/")) {
                let next = arr[idx + 1][0]
                return isNaN(next) ? acc + frameScore + 10 : acc + frameScore + Number(next)
            }
            else {return acc + frameScore}
        }
        return acc + scoreFrame(cur)
    }, 0)
  }
