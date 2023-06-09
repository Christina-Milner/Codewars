/* WIP - had an idea I wanted to test before doing a full PREP writeup, but will have to wait due to family commitments */


function countChange(money, coins) {
    const coinsSorted = coins.slice().sort((a, b) => b - a)
    let temp = []
    let result = []
    for (let i = 0; i < coinsSorted.length; i++) {
        const denom = coinsSorted[i]
        if (denom > money) {continue}
        if (denom === money) {result.push([denom])}
        else {
            if (money % denom === 0) {
                result.push(Array(money / denom).fill(denom))
            }
            for (let option of coinsSorted.slice(i)) {}
        }
    }
}

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
