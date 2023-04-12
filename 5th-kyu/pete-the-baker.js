/* Given an object representing the ingredients for a cake recipe, and another object representing how many of each ingredient Pete has, return how many cakes he can bake.
Example:
// must return 2
cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200}); 
 */

//P: Two objects
//R: An integer

/* 
- Iterate over keys of recipe object and map them to the amount present in the Pete object integer divided by the amount in the recipe. 
- Make sure undefined (if ingredient is not present in the Pete object) gets converted to 0 before attempting the division
- Return the minimum of the resulting array of integers
*/


function cakes(recipe, available) {
    return Object.keys(recipe)
            .map(e => {
                if (e in available) {
                    return Math.floor(available[e] / recipe[e])
                } else {
                    return 0
                }
            })
            .reduce((a, b) => Math.min(a, b))
  }