/* Given two strings, s1 and s2, ignore anything that isn't a lowercase letter or not present more than once in at least one of the strings.
For all the remaining letters, return a string that shows their maximum occurrence and which of the two strings it's in. Example: 
s1 = "my&friend&Paul has heavy hats! &"
s2 = "my friend John has many many friends &"
mix(s1, s2) --> "2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"
*/

//P: Two strings
//R: A string

/* - Split each string, filter out anything not a lowercase letter, and sort
- Going to try to use map to insert a delimiter after each group of letters that are the same so I can then join
 and split by the delimiter and filter out anything not longer than 1
- Create a new set from both of the strings split combined
- Iterate over the set and create an object that matches each letter to [longer group of letters, string it's from or =]
- Sort set values by length of value[0]
- Return template string that mashes all that together (reduce array obtained in previous step to string) */

function mix(s1, s2) {
    // Split strings, filter out non-lowercase letters or not present more than once and sort them
    const processString = str => str.split('')
                            .filter(e => e.match(/[a-z]/))
                            .filter((e, _, arr) => arr.filter(f => f == e).length > 1)
                            .sort((a, b) => a.localeCompare(b))
    
    let s1Processed = processString(s1)
    let s2Processed = processString(s2)
    
    const uniqueLetters = new Set(s1Processed.concat(s2Processed))  // This is for a later step, but need to create it here
    
    // Insert a delimiter after each group of letters and join/re-split by groups of same letters
    
    s1Processed = s1Processed.map((e, i, arr) => arr[i + 1] !== e ? e + "#" : e)
    s2Processed = s2Processed.map((e, i, arr) => arr[i + 1] !== e ? e + "#" : e)
    
    s1Processed = s1Processed.join('').split('#')
    s2Processed = s2Processed.join('').split('#')
    
    // Create new set from both strings, iterate over letters and find which string has the longer group
    // Set created further up as that needed to be done after filtering, but before reshaping those arrays
    
    let letterMap = {}
    
    for (let letter of uniqueLetters.values()) {
      let letterInS1 = s1Processed.find(e => e.includes(letter))
      let letterInS2 = s2Processed.find(e => e.includes(letter))
      if (letterInS1 && letterInS2) {
        letterMap[letter] = letterInS1.length > letterInS2.length ? [letterInS1, 1] : letterInS2.length == letterInS1.length ? [letterInS1, 3] : [letterInS2, 2]
      } else {
        letterMap[letter] = letterInS1 ? [letterInS1, 1] : [letterInS2, 2]
      }
    }
    
    // Return contents of the map object as a string
    const sortIt = (a, b) => a[0].length == b[0].length ? a[1] == b[1] ? a[0][0].localeCompare(b[0][0]) : a[1] - b[1] : b[0].length - a[0].length
    return Object.values(letterMap).sort((a, b) => sortIt(a, b)).map(e => `${e[1]}:${e[0]}`).join("/").replace(/3/g, "=")
    
  }

/* Switched from reduce to map -> join because otherwise I had a stray / floating around at the end and using the / to join instead seemed more
elegant than trimming off the end.
Getting the sorting right at the end was a nightmare I didn't anticipate, but treating the equal sign as a 3 seemed the simplest solution to get it
put at the end, all other things being equal. */