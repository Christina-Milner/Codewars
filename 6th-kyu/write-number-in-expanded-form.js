/* Given a number, return a string in expanded notation (https://www.mathsisfun.com/definitions/expanded-notation.html), such as "10 + 2" for 12. */

//P: A number
//R: A string

/* This vaguely reminds me of when I did integer to Roman numerals in Python, so a recursive function might be just the ticket.
Actually, no. I'm overcomplicating this.
To get the "components" of a number, I just need to split it into its digits and then multiply all nonzero digits by 10 to the power of
String(n).length minus their index + 1.
Stick those into an array and join it with +. 
*/

function expandedForm(num) {
    let components = []
    String(num).split('').map(e => Number(e)).forEach((e, i) => {
      if (e)
        {components.push(e * 10 ** (String(num).length - (i + 1)))}})
    return components.join(' + ')
  }
