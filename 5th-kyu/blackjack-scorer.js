/* Given an array of strings representing a Blackjack hand, return the highest possible score of those cards that is less than or equal to 21. If not possible,
return the smallest score bigger than 21.
    Number cards count as their face value.
    Face cards count as 10.
    Aces can count as 1 or 11.
*/

//P: An array of strings
//R: A number

/*
- I would say use reduce on the input hand array, but with "[0]" as the initial value rather than just a number
- When encountering an Ace, duplicate the current acc value and add it as 1 to one and 11 to the other
- This means for all cards, check how many elements there are in acc and add the current one to each one
- At the end:
    - If there is only one value in the reduced array, return that
    - If there are multiple: Check if array filtered by values smaller than or equal to 21 is empty
        - If no, return the maximum of those values
        - If yes, return the minimum of all values
*/



function scoreHand(cards) {
    const getValue = card => !isNaN(card) ? Number(card) : card === "A" ? 1 : 10
    let possibleHandsValues = cards.reduce((acc, cur) => {
        let tempArr = []
        if (cur === "A") {
            acc.forEach(num => tempArr.push(num + 11)) 
        }
        for (let i = 0; i < acc.length; i++) {
            acc[i] += getValue(cur)
        }
        return acc.concat(tempArr)
    }, [0])
    let upTo21 = possibleHandsValues.filter(num => num <= 21)
    if (upTo21.length) {
        return upTo21.reduce((acc, cur) => Math.max(acc, cur), 0)
    }
    return possibleHandsValues.reduce((acc, cur) => Math.min(acc, cur), Infinity)
}