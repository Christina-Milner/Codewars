/* Create a class Warrior that represents a warrior character in a game.
    - Starts at level 1 and can get to level 100
    - Ranks are "Pushover", "Novice", "Fighter", "Warrior", "Veteran", "Sage", "Elite", "Conqueror", "Champion", "Master", "Greatest" and change every 10 levels
    - Experience starts at 100 and every additional 100 makes the level increase
    - xp is cumulative and does not reset, except it does stop at 10000 when max level is reached
    - battle() takes in the enemy level 
        - if enemy level invalid, return "Invalid level"
        - Same level gives 10 xp and returns "A good fight", same as next point
        - one level lower gives 5 xp
        - two or more levels lower gives 0 xp and returns "Easy fight"
        - higher level: gives 20 * diff * diff (diff = enemy lvl - my level) xp and returns "An intense fight"
        - if this is 1 or more ranks and 5 or more levels lower, instantly return "You've been defeated"
    
    - Training: accepts an array of 3 elements: desc, xp, min level req
        - If level req met, warrior receives xp and stores desc (in achievements), also return desc
        - If not, nothing changes and return "Not strong enough"

    - To summarise:
        - Level: 1-100, property and method level() to return it
        - xp: 100 - 10000, property and method experience() to return it
        - rank(): Based on level, possible values are listed above, method returns it
        - achievements(): property starts as [], accepts descs of completed training, method returns it
        - battle(): accepts level of enemy, see above for behaviour 
        - training(): accepts array of 3 elements and updates xp and achievements based on certain conditions
*/

//P: Depends on the method, see above
//R: Samesies

/*
- Constructor takes no arguments and sets up the properties with the specified initial values, as well as an array of the possible ranks
- Most of the methods just return the appropriate property
- I would say check for how much xp is earned within the battle method and then write a separate method that takes in the amount of xp
    earned and then updates all properties as appropriate
    - xp simply gets added to current xp, unless this takes it over 10000, in which case it just stays at that value
    - If xp already at 10000, just abort process directly
    - level is experience modulo 100 (later edit: not modulo, also integer division, duh)
    - rank is integer division of level by 10, then that element in the array
- battle method:
    - Check for invalid enemy level
    - Check for level difference: >= 2 higher than enemy, 1 higher, same
    - If enemy is higher level:
        - Check if at least 5 higher, if so:
            - Get ranks of both combatants (may want to outsource this to another method) based on level and check if also higher rank
    - Use xp updater method to update everything based on amount of xp granted by the battle
    - Return appropriate string
- training method:
    - Check level requirement against current level. If higher, return "Not strong enough"
    - Otherwise, push desc into achievements and feed specified amount of xp into xp updater method
    - Return desc
- Consider putting the various messages as constants in the class
*/



class Warrior {
    constructor() {
        // No name property? Cool
        this.lvl = 1
        this.ranks = ["Pushover", "Novice", "Fighter", "Warrior", "Veteran", "Sage", "Elite", "Conqueror", "Champion", "Master", "Greatest"]
        this.rankIdx = 0
        this.xp = 100
        this.chieves = []
        this.lose = "You've been defeated"
        this.easy = "Easy fight"
        this.good = "A good fight"
        this.hard = "An intense fight"
        this.nope = "Not strong enough"
        this.error = "Invalid level"
    }
    level() {
        return this.lvl
    }
    experience() {
        return this.xp
    }
    rank() {
        return this.ranks[this.rankIdx]
    }
    achievements() {
        return this.chieves
    }

    updateXp(num) {
        if (this.xp < 10000) {
            this.xp += num
            if (this.xp > 10000) {
                this.xp = 10000
            }
            this.lvl = Math.floor(this.xp / 100)
            this.rankIdx = Math.floor(this.lvl / 10)
        }
    }

    battle(enemyLvl) {
        if (enemyLvl < 1 || enemyLvl > 100) {
            return this.error
        }
        const diff = enemyLvl - this.lvl
        if (diff <= 0) {
            if (diff <= -2) {
                return this.easy
            }
            if (diff === -1) {
                this.updateXp(5)
                return this.good
            }
            if (diff === 0) {
                this.updateXp(10)
                return this.good
            }
        }
        else {
            let enemyRank = Math.floor(enemyLvl / 10)
            if (diff >= 5 && enemyRank > this.rankIdx) {
                return this.lose
            }
            this.updateXp(20 * diff * diff)
            return this.hard
        }
    }

    training([desc, xpGain, minLvl]) {
        if (minLvl > this.lvl) {
            return this.nope
        }
        this.chieves.push(desc)
        this.updateXp(xpGain)
        return desc
    }
}