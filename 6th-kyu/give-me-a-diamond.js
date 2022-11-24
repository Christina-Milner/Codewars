/*Given a trite cliché story and a number, return an ASCII diamond, i.e. 5 should return 
  *
 ***
*****
 ***
  *
or rather "  *\n ***\n*****\n ***\n  *\n".
Even or negative numbers (where this does not work) should return null. */

//P: An integer
//R: A string composed of *, spaces and newlines or null

/*I am mildly puzzled why the spaces in the sample test are all in front of the * even though it should come out centered, but will
assume at the front is where they go. */
/* Map the odd numbers from 1 to n to stars and then tack a slice(0, -1).reverse() on at the back? */

function diamond(n){
    if (n < 0 || n % 2 == 0) {return null}
    let numOfStars = []
    for (let i = 1; i <= n; i += 2) {numOfStars.push(i)}
    let stars = numOfStars.map((e, i) => `${" ".repeat(numOfStars.length - 1 - i)}${'*'.repeat(e)}\n`)
    stars = stars.concat(stars.slice(0, -1).reverse())
    return stars.join('')
  }