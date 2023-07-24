/* Write a class User that contains the properties "rank" and "progress" and a method incProgress() that takes rank as an argument.
    - Ranks go from -8 to 8 with 0 being omitted
    - Progress is an XP bar that goes up to 100, then causes the rank to increase and resets
    - Users complete activities that also have ranks and award differing amounts of progress based on their ranks
        - 2 levels or more below the user's rank gets ignored
        - One rank lower is worth 1 point (of progress)
        - Equal is worth 3 points
        - Greater awards 10 * d * d progress, where d is the difference between user and activity ranking
        - Invalid values should raise an error
*/

//P: A number (for the incProgress() method)
//R: Nothing

/*
- So. The constructor takes no arguments and the properties are rank = -8, progress = 0
- Hmm. If I chuck an array of the numbers from -8 to 8 with 0 missing in there as a property and an index property that gets incremented on level-up, will this.rank = this.array[this.index] update properly? Probably not.

- The incProgress() method:
    - Throw an error if input is anything other than a valid rank number
    - If valid, but <= rank - 2, return
    - Otherwise, check if user is already at rank 8. If so, return.
    - Otherwise, award XP as appropriate
    - Call helper: updateRank()
- updateRank():
    - Checks if the current XP is >= 100
    - If so, increment user rank (with a check to make sure -1 -> 1) and subtract 100 from the xp
*/

class User {
    constructor() {
        this.rank = -8
        this.progress = 0
        this.valid = Array.from({length: 16}, (_, i) => i - 8 < 0 ? i - 8 : i - 8 + 1) 
    }
    findDiff(num) {
        return this.valid.indexOf(this.rank) - this.valid.indexOf(num)
    }

    updateXP() {
        if (this.progress >= 100) {
            let levels = Math.floor(this.progress / 100)
            this.rank = this.valid[this.valid.indexOf(this.rank) + levels] || 8
            this.progress = this.rank === 8 ? 0 : this.progress % 100
        }
    }

    incProgress(level) {
        if (!this.valid.includes(level)) {
            throw new Error("Invalid activity level!")
        }
        if (this.findDiff(level) === 2 || this.rank === 8) {
            return
        }
        if (this.findDiff(level) === 1) {
            this.progress += 1
        }
        else if (!this.findDiff(level)) {
            this.progress += 3
        }
        else {
            this.progress += Math.abs(this.findDiff(level)) ** 2 * 10
        }
        this.updateXP()
    }
}

/* Yip yip yip yip. Troubleshooting was just minor bits like realising the user might gain more than one level at a time, and the xp is meant to reset to 0 on hitting rank 8. 
Quickly realised I was going to have to do that "make sure zero gets skipped" check in several places, so best to outsource that check, too. And having an array of the valid values
is a lot more convenient than doing a bunch of "not smaller than or greater than but also not zero" checks.
Oh, and yeah, absolute value was wholly unnecessary if I'm going to square it. Fingers faster than brain.*/