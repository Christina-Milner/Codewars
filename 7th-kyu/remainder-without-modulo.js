/* Implement a function remainder that does the same thing as the modulo operator, but without using said operator. */

//P: Two numbers (Dividend and divisor)
//R: A number

/* Integer division, then difference between that integer times the divisor and the dividend */

const remainder = (D, d) => D - (Math.floor(D / d) * d)