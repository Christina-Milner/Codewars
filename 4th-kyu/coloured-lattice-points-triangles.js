/* Given an array of arrays such as [[3, -4], "blue"] that represent points with their coordinates on a grid and their colour, return [a, b, c, d], where:
a = Total given points
b = Total number of colours
c =  Total number of possible triangles
d =  The colour (or colours, sorted alphabetically) with the highest amount of triangles, like ['red', 10]
If no triangles can be formed, d is an empty array. */

//P: An array of arrays containing numbers and strings
//R: An array of 3 numbers and an array of numbers and strings

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
*/

function countColTriang(pointsList) {
    const result1 = pointsList.length
    let uniqueColors = new Set(pointsList.map(e => e[1]))
    const result2 = uniqueColors.size
      
    // Helper that checks if 3 points make a triangle
    const makeTriangle = (pt1, pt2, pt3) => {
      return Math.abs((pt2[0] - pt1[0]) * (pt3[1] - pt1[1]) - (pt2[1] - pt1[1]) * (pt3[0] - pt1[0])) !== 0
    }
      
    // Group the points by color
    let colorMap = {}
    let colorNumbers = {}
    for (let color of uniqueColors.values()) {
      colorMap[color] = pointsList.filter(e => e[1] == color)
      colorNumbers[color] = 0
    }
    
    const numberOfTriangles = arr => {
      if (arr.length < 3) {return 0}
      if (arr.length == 3) {return makeTriangle(arr[0], arr[1], arr[2]) ? 1 : 0}
      let triangles = 0
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          for (let k = 0; k < arr.length; k++) {
            if (i == j || i == k || j == k) {continue}
            else if (makeTriangle(arr[i], arr[j], arr[k])) {triangles++}
          }
        }
      }
      return triangles
    }
    
    for (let key in colorNumbers) {
      colorNumbers[key] = numberOfTriangles(colorMap[key])
    }
    console.log(colorNumbers)
    const maxTriangles = Object.values(colorNumbers).reduce((a, b) => Math.max(a, b))
    console.log(maxTriangles)
    let maxColors = []
    
    for (let key in colorNumbers) {
      if (colorNumbers[key] == maxTriangles) {
        maxColors.push(key)
      }
    }
    
    maxColors.sort((a, b) => a.localeCompare(b))
    
    const result3 = Object.values(colorNumbers).reduce((a, b) => a + b, 0)
    const result4 = maxColors.length ? maxColors.concat(maxTriangles) : []
    
    return [result1, result2, result3, result4]
    
  }

/* WIP - the individual parts of this do what they're supposed to, but the triangle finder is way out of whack and producing 60 
when it should be producing 10, 6, or even 0. Math is hard :( */
/* From console logging, there seem to be 2 issues with it: 1) I do not see a single "These points do not form a triangle" trigger, so 
the logic is likely broken
2) It's currently counting permutations of the same triangle as different triangles. This needs addressing even once the logic itself is fixed. */
