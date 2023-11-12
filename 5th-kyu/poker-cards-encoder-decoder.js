/* Given an array of poker cards in a format such as "8c", return a sorted array of their numeric value with the "encode" function.
    The "decode" function does the opposite. */

//P: An array of strings (encode) or numbers (decode)
//R: An array of numbers (encode) or strings (decode)

/*
- I feel like this isn't hard, just a question of how to do it with the least amount of redundancy/unnecessary typing
- Card values should probably be two arrays rather than an object so we can go in either direction without having to make another one
- So, have an array ["A", "2", (...), "K"] called cardFaces or something and one with the corresponding values [0, 1, (...) 12]
- For encode, take first character of string and get its index in cardFaces, then look up that index in values 
- Second character is the suit, where a map of suit precendence tells us the X in the 13 * X we have to add to the original value
- I'm dumb, I don't need two arrays if one is just sequential numbers, just use the index as the value smh
- For decode, take modulo 13 of the number to find what face it is and result of integer division by 13 to find suit
- For encode, sort just before returning numbers, for decode, sort first, then convert
*/

const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const suits = ["c", "d", "h", "s"];

function encode(input) {
    let converted = [];
    for (let card of input) {
        let [face, suit] = [card[0], card[1]]
        converted.push(cardValues.indexOf(face) + suits.indexOf(suit) * 13);
    }
    return converted.sort((a, b) => a - b);
}
  
  function decode(input) {
    let sorted = input.slice().sort((a, b) => a - b);
    let converted = [];
    for (let value of sorted) {
        converted.push(cardValues[value % 13] + suits[Math.floor(value / 13)]);
    }
    return converted;
  }