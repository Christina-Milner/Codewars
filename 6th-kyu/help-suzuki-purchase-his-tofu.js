/* You are given a string containing what's in your bag. "mon" is a coin worth 1, "monme" is a coin worth 60. Given the cost of tofu, return either
"leaving the market" if you cannot purchase it (not enough money/no exact change), or return [a, b, c, d] where a = count of mon coins, b = count of monme coins,
c = sum of coins value, d = minimum number of coins needed to buy tofu. */

//P: A string and a number
//R: A string or an array of numbers

/*
- Could try regex to separate the mons and monmes, but I think following will be easier:
- Split string by spaces
- Count how many "monme" are in resulting array and filter them out
- Now count how many "mon" are in remaining array
- That gives us a and b, c is simple math
- For d:
    - If cost is greater than c, return with the fail string
    - Else integer divide cost by value of monmes and save both the result and the remaining cost
    - If remaining cost is larger than a, return fail string
    - Otherwise, add remaining cost to d and return
*/


function buyTofu(cost,box){
    const boxArr = box.split(' ')
    const numOfMonme = boxArr.filter(e => e == "monme").length
    const numOfMon = boxArr.filter(e => e !== "monme").filter(e => e == "mon").length
    const totalMoney = numOfMon + numOfMonme * 60
    if (cost > totalMoney) {
        return "leaving the market"
    }
    let coinsRequired = 0
    let moneyRequired = cost
    let monmeRequired = Math.floor(cost / 60)
    if (moneyRequired > numOfMonme * 60) {
        coinsRequired += numOfMonme
        moneyRequired -= numOfMonme * 60
    } else {
        coinsRequired += monmeRequired
        moneyRequired -= monmeRequired * 60
    }
    if (moneyRequired > numOfMon) {
        return "leaving the market"
    } else {
        coinsRequired += moneyRequired
    }
    return [numOfMon, numOfMonme, totalMoney, coinsRequired]

  }

  /*Brain fart with "numOfMon", I did not need to filter out monmes when specifically looking for "mon". */