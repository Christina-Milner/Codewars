/* Given a number n (a referral bonus you were paid by your company) and a number m (the price of a can of beer), return the number of levels
in the largest complete beer can pyramid you can build.*/

//P: Two numbers
//R: A number

/*
- Had to check comments to find out what the hell "A beer can pyramid will square the number of cans in each level" is supposed to mean when level 1 has 1
and level 2 has 4. What it means is each level has level ** 2 cans. 
- Also based on comments, n can be 0 or negative even though that's dumb given the premise

- If bonus is smaller than price, return 0
- Divide bonus by price (rounded down) to get the number of available cans
- Recursive helper - takes in cans left and a level acc that starts at 1
- Subtract acc squared from cans and increment acc
- Return when not enough cans left to do this
*/

function beeramid(bonus, price) {
    let cans = Math.floor(bonus / price)
    if (cans <= 0) {
        return 0
    }
    const pyramidLevels = (num, acc = 1) => {
        if (num < acc ** 2) {
            return acc - 1
        }
        return pyramidLevels(num - acc ** 2, acc + 1)
    }
    return pyramidLevels(cans)
}