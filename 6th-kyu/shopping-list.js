/* Input is an array of subarrays containing a string (a shpping list item) and a number (the amount purchased). In the global scope exists an object with the items
as properties and another object containing their price, discount and bogof as values. Input arrays will be valid and only contain items included in the object,
appearing only once in the input array. Empty arrays should return zero. Round the answer to 2 decimal places. */

//P: An array of arrays of a string and a number
//R: A number

/*
- Map the input array to numbers and then reduce to sum and round
- For the map process:
    - Look up groceries[item][price] and multiply by the amount. If bogof, use half the amount, rounded up.
    - If groceries[item][discount], apply it - I assume these are meant to be percentages, so 10 = multiply by 0.9? Yeah, OJ example confirms.
*/

function shoppingListCost(arr) {
    return Number((arr.map(e => {
        let [item, amount] = [e[0], e[1]]
        amount = groceries[item]["bogof"] ? Math.ceil(amount / 2) : amount
        let cost = amount * groceries[item]["price"]
        return groceries[item]["discount"] ? cost - cost * (groceries[item]["discount"] / 100) : cost
    }).reduce((a, b) => a + b, 0))
    .toFixed(2))
}