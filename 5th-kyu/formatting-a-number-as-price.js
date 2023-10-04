/* Given a number, return it as a string formatted like a price (2 digits after the comma including a zero if there was only one before, commas every 3 digits).
Return the string "NaN" if input is not a valid number.*/

//P: A number
//R: A string

/*
- .toFixed() will conveniently convert to string and take care of the decimals. It even adds the zeroes, neat.
- This will throw an error if called on something that's not a number, so have to put check for invalid input first or use try/except
- How to add the commas? Take the non-decimal part, turn to array, reverse, and map to add the comma before every index that's divisible by 3 except
    0
*/



function numberToPrice(number) {
    if (isNaN(number) || isNaN(String(number)) || typeof(number) == "string" && !number) {return 'NaN'}
    let price = String(number)
    price = price.split('.')
    price[0] = price[0].split('').reverse().map((num, idx) => idx !== 0 && idx % 3 == 0 && num != "-" ? `${num},` : num).reverse().join('')
    price[1] = price[1] ? price[1].length > 2 ? price[1].slice(0, 2) : price[1].padEnd(2, '0') : '00'
    price = price.join('.')
    return price
}