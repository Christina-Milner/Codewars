/* Given a (lowercase, but potentially empty) string, imitate a 'Mexican Wave' by returning an array
where an uppercase letter 'travels' through the string (jumping over any spaces). */

//P: A lowercase string, can be empty
//R: An array of strings

function wave(str){
    return Array(str.length)
      .fill(str)
      .map((e, i) => {
      return e.slice(0, i) + e[i].toUpperCase() + e.slice(i + 1)
    })
    .filter(e => /[A-Z]/.test(e))
  }