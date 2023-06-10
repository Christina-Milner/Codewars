/* Ok, so the problem: Given an amount num1 and a list of coin denominations num2, return how many different combinations of change you can make to reach that amount. Order does not matter.
So for 4 and coins of 1 and 2, the answer would be 3: 2 + 2, 2 + 1 + 1, and 1 + 1 + 1 + 1.
*/

//P: A number and an array
//R: A number

/* 
So the problem is tagged Recursion but I still haven't fully wrapped my head around backtracking type recursive functions.
I had an idea for how to do this iteratively, though.
Temp	Result
5		[5, 5]
	[5, 3]	
	[5, 2]	
3		[5, 2, 3]
	[3, 3]	
	[3, 2]	
	[3, 3, 3]	
2		
		[3, 3, 2, 2]
		[2, 2, 2, 2, 2]
- Sort the list of denominations in descending order first
- Ignore anything that's bigger than the amount specified
- For each remaining denomination:
    - Check if the amount is evenly divisible by that denomination and if so, push that combo into the result array
    - For each of the smaller ones (yes it'll be in quadratic time, hopefully I can get away with it), push the combo of current + smaller into a temp array
    - Then check for each subsequent number if it can complete that array
*/


function countChange(money, coins) {
    console.log("********TEST STARTS HERE*********", money, coins) // Leaving this in as a passive-aggressive statement about how much I hate katas that don't show what's passing and what's not
    if (!money) {return 1} // for some reason
    const coinsSorted = coins.slice().sort((a, b) => b - a)
    let temp = []
    let result = []
    for (let i = 0; i < coinsSorted.length; i++) {
        const denom = coinsSorted[i]
        if (denom > money) {continue}
        if (denom === money) {result.push([denom])}
        else {
            if (money % denom === 0) {
                let toStr = Array(money / denom).fill(denom).sort((a, b) => b - a).join('')
                if (!result.includes(toStr)) {result.push(toStr)}
            }
            for (let option of coinsSorted.slice(i)) {
                if (denom + option === money) {
                    let toStr = [denom, option].sort((a, b) => b - a).join('')
                    if (!result.includes(toStr)) {result.push(toStr)}
                }
                else {temp.push([denom, option])}
            }

            for (let combo of temp) {
                let sum = combo.reduce((a, b) => a + b, 0)
                if (sum + denom === money) {
                    let toStr = combo.concat(denom).sort((a, b) => b - a).join('')
                    if (!result.includes(toStr)) {result.push(toStr)}
                }
                else if (sum < money && (money - sum) % denom === 0) {
                    let toStr = combo.concat(Array((money - sum) / denom).fill(denom)).sort((a, b) => b - a).join('')
                    if (!result.includes(toStr)) {result.push(toStr)}
                }
                if (sum + denom < money) {
                    temp.push(combo.concat(denom))
                }
            }
        }
    }
    return result.length
}

/* ^ That is as far as I got. It works as far as I can tell based on sample tests, but it is horrifically slow and times out as the numbers get bigger.
Needless to say it's also incredibly clumsy as I couldn't figure out a way to avoid duplicates other than converting to string so I could check if already present.
Decided to ask for help on how to do it recursively: */

function countChange(money, coins) {
    function countChangeRecursive(amount, coinIdx) {
      if (amount === 0) {
        return 1;
      }
      if (amount < 0 || coinIdx >= coins.length) {
        return 0;
      }
      const currentCoin = coins[coinIdx];
      const includeCoin = countChangeRecursive(amount - currentCoin, coinIdx);
      const excludeCoin = countChangeRecursive(amount, coinIdx + 1);
      return includeCoin + excludeCoin;
    }
  
    return countChangeRecursive(money, 0);
  }