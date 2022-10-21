/* Hostile letters are shooting bombs ('*') at each other that destroy adjacent letters
and some letters have varying power. Return which 'team' of letters wins */

// P: A string consisting of only lowercase letters and '*'
// R: A string saying "Left side wins!", "Right side wins!" or "Let's fight again!"

function alphabetWar(fight) {
    const left = {w: 4, p: 3, b: 2, s: 1}
    const right = {m: 4, q: 3, d: 2, z: 1}
    const filtered = fight.split('')
                          .filter((e, i, arr) => {
                            return e !== '*' && arr[i - 1] !== '*' && arr[i + 1] !== '*'
                          })
    const leftPower = filtered.reduce((a, b) => a + (left[b] || 0), 0)
    const rightPower = filtered.reduce((a, b) => a + (right[b] || 0), 0)
    return leftPower > rightPower ? "Left side wins!" :
           rightPower > leftPower ? "Right side wins!" :
           "Let's fight again!"
  }