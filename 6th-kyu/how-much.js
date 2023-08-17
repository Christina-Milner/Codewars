/* We're trying to guess how much money someone has and how much things cost.
Parameters are m and n (numbers) where how much money they have is between m and n inclusively.
In any case, they can buy 9 cars costing c each and have 1 money left, or buy 7 boats at b each and have 2 money left.
Return the possible configurations of money and prices as an array of arrays in the format [["M: 37", "B: 5", "C: 4"], ["M: 100", "B: 14", "C: 11"]]
because the kata author has apparently never heard of objects. */

//P: Two numbers
//R: An array of arrays of strings


/*
- From sample tests: if no configuration found, return empty array
- Hmm ... so if we iterate over the possible values of money and then for each one iterate over the possible values for the prices, this runs in quadratic time and will probably cause issues if the m-n span gets large enough.
    Let's try to avoid that.
- It's not necessary anyway as all we need to check is whether, for a given money, money - 1 is divisible by 9 and money - 2 is divisible by 7. 
- Can accelerate this process by, instead of iterating over all possible values of m, just going by multiples of 9 and checking if the number one lower is divisible by 7 (and if so, return the one one higher)
*/



function howMuch(m, n) {
    let [min, max] = [Math.min(m, n), Math.max(m, n)]
    let result = []
    if ((min - 1) % 9 === 0) {min--}
    else {
        while (min % 9 !== 0)
            {min++}
    }
    for (let i = min; i < max; i += 9) {
        if ((i - 1) % 7 === 0) {
            result.push([`M: ${i + 1}`, `B: ${(i - 1) / 7}`, `C: ${i / 9}`])
        }
    }
    return result
}

/* 
- Neglected to account for two things I had to troubleshoot during testing:
    - As I'm using multiples of 9 for iteration, but the value we're looking for is actually one higher, have to consider the scenario where m is a multiple of 9 + 1
    - This was mentioned in the description, but neglected to take into account that n could be smaller than m. Easy fix, though.

*/