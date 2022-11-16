/*Given an input of two strings - a note and a string indicating whether the desired chord is minor, major, augmented or diminished, return the notes that make up this chord.
We are using b and # instead of the correct symbols. No enharmonic equivalence. This map of a C major scale structure is also provided:
  const C_major_scale_structure = [
    ["C", 0],
    ["D", 2],
    ["E", 4],
    ["F", 5],
    ["G", 7],
    ["A", 9],
    ["B", 11],
    ["C", 12]            
  ];

"C","M" should return ["C","E","G"] (C major chord)
"F","m" should return ["F","Ab","C"] (F minor chord)
*/

//P: two strings
//R: An array of 3 strings

/* Could add C#, Db etc. to that constant to get their "values", but don't particularly feel like it and that would cause problems with enharmonic equivalence.
I am thinking just grab the base note + element at its idx + 2 + element at its idx + 4 and then do some conditionals to figure out what needs # and b. 
*/

/* Pondered this problem while resting on my Shakti mat before bed. The provided array was not useful to me. Once I scrapped it and just mapped the notes
to their default thirds counterparts (separated by majors and minors), the general idea came pretty naturally. Unfortunately required a little more
troubleshooting than would have been necessary because of copypasta mistakes from majorThird to minorThird and, uh, forgetting B in the map. */

function ChordTriad(root, color) {
  const majorThirds = {C: "E", F: "A", G: "B"} 
  const minorThirds = {D: "F", E: "G", A: "C", B: "D"} 
                       
  const majorThird = note => {
    // We have a map of the thirds above - if the note is unmodified, we need either its counterpart from majorThirds
    // or its counterpart plus # from minorThirds
    if (note in majorThirds) {return majorThirds[note]}
    if (note in minorThirds) {return `${minorThirds[note]}#`}
    // If neither of those fired, the base note has b or # on it
    const modifiers = note.slice(1)
    // If the two unmodified notes form a major third, just add the same modifiers to its counterpart
    if (note[0] in majorThirds) {return `${majorThirds[note[0]]}${modifiers}`}
    // If they form a minor third, we need the unmodified counterpart if modifier is a b, counterpart + b if it's bb,
    // counterpart + ## (or x, as it turns out, oops) if it's #, and not possible if it's ##
    switch (modifiers) {
        case 'b':
          return minorThirds[note[0]]
          break
        case 'bb':
          return `${minorThirds[note[0]]}b`
          break
        case '#':
          return `${minorThirds[note[0]]}x`
          break
    }
  }
    // Copypasta with minor adjustments for getting a minor third - could probably do this with less duplication
    // but the nested logic makes my head hurt
  
    const minorThird = note => {
    // We have a map of the thirds above - if the note is unmodified, we need either its counterpart from minorThirds
    // or its counterpart plus b from majorThirds
    if (note in majorThirds) {return `${majorThirds[note]}b`}
    if (note in minorThirds) {return minorThirds[note]}
    // If neither of those fired, the base note has b or # on it
    const modifiers = note.slice(1)
    // If the two unmodified notes form a minor third, just add the same modifiers to its counterpart
    if (note[0] in minorThirds) {return `${minorThirds[note[0]]}${modifiers}`}
    // If they form a major third, we need the unmodified counterpart if modifier is a #, counterpart + # if it's ##,
    // counterpart + bb if it's b, and not possible if it's bb
    switch (modifiers) {
        case 'b':
          return `${majorThirds[note[0]]}bb`
          break
        case 'x':
          return `${majorThirds[note[0]]}#`
          break
        case '#':
          return majorThirds[note[0]]
          break
    }
  }
  
  // Now put it together: M = major + minor, m = minor + major, aug = major + major, dim = minor + minor
    switch (color) {
      case 'M':
        return [root, majorThird(root), minorThird(majorThird(root))]
        break
      case 'm':
        return [root, minorThird(root), majorThird(minorThird(root))]
        break
      case 'dim':
        return [root, minorThird(root), minorThird(minorThird(root))]
        break
      case 'aug':
        return [root, majorThird(root), majorThird(majorThird(root))]
        break
  }
}