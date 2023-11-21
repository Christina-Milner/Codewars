/* Given a number, return the number of bits that are 1 in its binary representation. */

//P: A number
//R: A number

/*
- Use toString(2) to convert the number to binary
- Now there are all sorts of options:
    - Iterate over it as a string and add 1 to a total for each 1
    - Split it to array, filter out the zeroes and check length
    - Split it to array and use reduce to sum up the digits
*/



function countBits(n) {
    return n.toString(2).split('').reduce((acc, cur) => acc + Number(cur), 0);
  };