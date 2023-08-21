/* Given the lengths of the sides of a triangle, return whether it is:
    a) not a triangle (0)
    b) an acute triangle (1)
    c) a right triangle (2)
    d) an obtuse triangle (3)
*/

//P: 3 numbers
//R: A number

/*
- So, according to the helpfully provided law of cosines wikipedia page, the formula we want here is probably gamma = arrcos ((a^2 + b^2 - c^2)/2ab),
    but the kata says it can be solved without angle calculation
- We know it's only a triangle if each side is greater than the sum of the other two sides, and it's a right triangle if a^2 + b^2 = c^2, but what about 
    the other two?
- Based on the examples, it looks like with acute, a^2 + b^2 > c^2 and with obtuse, a^2 + b^2 < c^2
- So let's roll with that - check for sums to see if it's a triangle at all, then check a^2 + b^2 + c^2 (assigned by sorting the array of input numbers)
    to see what type
*/


function triangleType(num1, num2, num3){
    let sorted = [...arguments].sort((a, b) => a -  b)
    let a = sorted[0]
    let b = sorted[1]
    let c = sorted[2]
    let sum = sorted.reduce((acc, cur) => acc + cur, 0)
    for (let num of sorted) {
        if (num >= sum - num) {
            return 0
        }
    }
    let [first, second] = [a ** 2 + b ** 2, c ** 2]
    return first === second ? 2 : first < second ? 3 : 1
  }