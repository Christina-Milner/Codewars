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

/* WIP - will come back to this */