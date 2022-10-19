/* Given a string composed of letters and numbers, output
a string with only letters, repeated as often as dictated by the
number preceding them. If multiple numbers in a row, use last one
and ignore the preceding ones. */

function stringExpansion(s) {
    let strArr = s.split('')
    let counter = 1
    return strArr
      .map(e => {
      if (/\d/.test(e)) {
        counter = Number(e)
        return ""
      }
      else {return e.repeat(counter)}
    })
      .join('')
  }

