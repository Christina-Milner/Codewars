/* Given a positive integer x, build a tower out of strings comprised of "*" with x levels (the first level has one * and each subsequent one has 2 more). */

//P: An integer
//R: An array of strings comprised of "*" and spaces

function towerBuilder(nFloors) {
    let lengths = [1]
    while (lengths.length < nFloors) {
      lengths.push(lengths.slice().pop() + 2)
    }
    const maxLength = lengths.slice().pop()
    return lengths.map(e => {
      const space = " ".repeat((maxLength - e) / 2)
      return  space + "*".repeat(e) + space
    })
  }