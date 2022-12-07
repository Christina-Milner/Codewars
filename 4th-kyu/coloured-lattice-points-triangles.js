/* Given an array of arrays such as [[3, -4], "blue"] that represent points with their coordinates on a grid and their colour, return [a, b, c, d], where:
a = Total given points
b = Total number of colours
c =  Total number of possible triangles
d =  The colour (or colours, sorted alphabetically) with the highest amount of triangles, like ['red', 10]
If no triangles can be formed, d is an empty array. */

//P: An array of arrays containing numbers and strings
//R: An array of 3 numbers and an array of numbers and strings


// Original plan
/* a) is the length of the input array
b) to get b, I can iterate over it and push each colour into an array if not present in it yet, then return that array's length, or I can map each point to its colour,
create a new Set from that and return its size
c) Going to have to have a quick Google of how to tell if stuff can make a triangle from coordinates. Points that are on a line can't make a triangle with each other,
but finding those if they don't happen to all have the same x or y value is going to be a bastard.
d) is going to be trivial once I have c) figured out. c) already only wants triangles formed by points of the same colour even if that's not explicitly stated
above, so no need to consider others. 
Ok, StackOverFlow says that if abs((x2 - x1)*(y3 - y1) - (y2 - y1)*(x3 - x1)) is not zero, the points make a triangle.
So point c) becomes something like:
- Sort all points in groups based on colour. Any groups with fewer than 3 elements can be disregarded
- Run all possible configurations of the elements of a group through a function that checks the above. I can't think of anything more elegant than 3 nested for loops
off the topf of my head, but will probably end up having to when solution times out
- Make a new array for each colour and push configurations of 3 points that make a triangle into it
Then d) return the length of the longest array and its colour. If multiple, push into an array and sort it by locale compare.

//Update 1
Originally pushed as WIP - triangle check wasn't working right and permutations of the same points were counted as separate triangles.
Plan to fix:
- Find better formula to check if points are triangle
 
- Sort the 3 points by values and do triangle check/push them into an array only if not already included in said array
(Update - can't compare arrays with equality, so let's just join 'em for this comparison)

Also realised I'd been feeding points into numberOfTriangles with the colour still in the array with them. Surprised that didn't completely break things.

// Update 2

Function now passes 28 tests and fails 3. Console logging confirms makeTriangle still isn't seeing anything that ISN'T a triangle, so those are likely
the only tests checking for that. Everything else was fixed by getting rid of the dupes. But... the triangle checker not checking triangles is, uh, not optimal.
Ayyy there was a Math.abs missing from the formula, that would do it.
Now just to add an and at the end so it doesn't spit out a list of colours when there are no triangles, and we're done! Thank the good Lord.
*/

function countColTriang(pointsList) {
  const result1 = pointsList.length // Number of points
  let uniqueColors = new Set(pointsList.map(e => e[1]))
  const result2 = uniqueColors.size // Number of colors
    
  // Helper that checks if 3 points make a triangle
  const makeTriangle = (pt1, pt2, pt3) => {
    return 0.5 * Math.abs((pt1[0] * (pt2[1] - pt3[1])) + pt2[0] * (pt3[1] - pt1[1]) + pt3[0] * (pt1[1] - pt2[1])) !== 0
  }
    
  // Group the points by color
  let colorMap = {}
  let colorNumbers = {}
  for (let color of uniqueColors.values()) {
    colorMap[color] = pointsList.filter(e => e[1] == color).map(e => e[0])
    colorNumbers[color] = 0
  }

  // Make unreadable function that hopefully distills the number of triangles from an array of points
  const numberOfTriangles = arr => {
    if (arr.length < 3) {return 0}
    if (arr.length == 3) {return makeTriangle(arr[0], arr[1], arr[2]) ? 1 : 0}
    
    // Sorting helper to help keep permutations of the same triangle out
    const sortMe = (pt1, pt2) => pt1[0] == pt2[0] ? pt1[1] - pt2[1] : pt1[0] - pt2[0]
         
    let triangles = 0
    let trianglePoints = []
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        for (let k = 0; k < arr.length; k++) {
          if (i == j || i == k || j == k) {continue}
          if (!trianglePoints.includes([arr[i], arr[j], arr[k]].sort((a, b) => sortMe(a, b)).join('')) && makeTriangle(arr[i], arr[j], arr[k])) {
            triangles++
            trianglePoints.push([arr[i], arr[j], arr[k]].sort((a, b) => sortMe(a, b)).join(''))
          }
        }
      }
    }
    return triangles
  }
  
  // Find triangles for each color
  for (let key in colorNumbers) {
    colorNumbers[key] = numberOfTriangles(colorMap[key])
  }
  
  // Find which color(s) have the maximum number of triangles
  const maxTriangles = Object.values(colorNumbers).reduce((a, b) => Math.max(a, b))
  let maxColors = []
  
  for (let key in colorNumbers) {
    if (colorNumbers[key] == maxTriangles && maxTriangles) {
      maxColors.push(key)
    }
  }
  
  // Sort them so they'll be returned in the right order
  maxColors.sort((a, b) => a.localeCompare(b))
  
  const result3 = Object.values(colorNumbers).reduce((a, b) => a + b, 0) // Number of triangles
  const result4 = maxColors.length ? maxColors.concat(maxTriangles) : [] // Color with max triangles formatted as requested
  
  return [result1, result2, result3, result4]
  
}