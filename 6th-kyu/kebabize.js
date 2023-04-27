/* Given a string in camelCase, kebabize it (camel-case). The returned string should be all lowercase. */

//P: A string
//R: A string

/*
- If string is all uppercase, simply change to lowercase
- Otherwise, find uppercase letters and replace them with - + lowercase letter unless they're at the start of the string
- It's tagged RegEx but I am going to use map
*/

function kebabize(str) {
    console.log(str)
    const isLower = s => typeof(s) == "string" && s.toLowerCase() === s
    let filtered = str.split('').filter(e => e.match(/[A-Za-z]/))
    if (filtered.every(e => e == e.toUpperCase())) {
        return filtered.join('').toLowerCase()
    }
    return filtered.map((e, i, arr) => {
                if (isLower(e)) {
                    return e
                }
                if (i === 0) {
                    return e.toLowerCase()
                }
                else {
                    return "-" + e.toLowerCase()
                }
            })
          .join('')
  }

/* Missed the part where there's non-letter characters in there that should be filtered out. Oh well. */