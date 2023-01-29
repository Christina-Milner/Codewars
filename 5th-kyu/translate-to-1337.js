/* Given a lowercase string comprised only of letters, "translate" it to leetspeak based on the given conversion. In cases where more than one alternative is
provided, rotate through them if the letter is present multiple times.
Example: to_leet('aaaa') # => '4@4@' 
The conversion:
  a = ['4', '@']
  b = ['|3', '8']
  d = ['|)', 'o|']
  e = ['3']
  f = ['|=']
  g = ['9', '6']
  h = ['|-|', ']-[', '}-{', '(-)', ')-(', '#']
  i = ['1', '!', '][']
  j = ['_|']
  k = ['|<', '|{']
  l = ['|_']
  n = ['|\|']
  o = ['0']
  p = ['|2', '|D']
  q = ['(,)']
  r = ['|Z', '|?']
  s = ['5', '$']
  t = ['+', '7']
  v = ['|/', '\/']
  w = ['\^/', '//']
  x = ['><', '}{']
  y = ['`/']
  z = ['(\)'] */

  //P: A string (of lowercase letters)
  //R: A string

  /* 
  - Kata is tagged regular expressions, but I think map is the way to go here
  - Save conversion table as an object
  - Split input string
  - Map each element to itself if not in object, otherwise to object[element][0]
  - Shift first entry from object value and push it in at the back
  */

  function toLeet(str) {
    let conversion = {
        a: ['4', '@'],
        b: ['|3', '8'],
        d: ['|)', 'o|'],
        e: ['3'],
        f: ['|='],
        g: ['9', '6'],
        h: ['|-|', ']-[', '}-{', '(-)', ')-(', '#'],
        i: ['1', '!', ']['],
        j: ['_|'],
        k: ['|<', '|{'],
        l: ['|_'],
        n: ['|\\|'],
        o: ['0'],
        p: ['|2', '|D'],
        q: ['(,)'],
        r: ['|Z', '|?'],
        s: ['5', '$'],
        t: ['+', '7'],
        v: ['|/', '\\/'],
        w: ['\\^/', '//'],
        x: ['><', '}{'],
        y: ['`/'],
        z: ['(\\)'] 
    }

    return str.split('').map(e => {
        if (e in conversion) {
            let replacement = conversion[e].shift()
            conversion[e].push(replacement)
            return replacement
        } else {
            return e
        }
    }).join('')
  }

/* Boom! Thought the "some characters may need to be escaped" in the instructions didn't apply if I didn't use regex replace, but yeah,
had to double up all the backslashes. I feel a little iffy about using map with a side effect, but not iffy enough to rewrite it. */