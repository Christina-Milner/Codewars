/* There are 4 material types: paper, glass, organic, and plastic (the order matters).
Given an array of objects that have a type property (stating what it actually is) and a material property (stating what it's made out of), and sometimes a
secondMaterial property, return an array of arrays in the order of those material types, showing which items go into which bin. Objects with a second material
should go into both relevant bins. */

//P: An array of objects
//R: An array of arrays

/*
- Make an object with the material types as keys so stuff gets spat out in the right order later, and empty arrays as values
- Iterate over input array, add type to values for material, and, if present, second material
- Return object values
*/


function recycle(array) {
    let bins = {
        paper: [],
        glass: [],
        organic: [],
        plastic: []
    }
    for (let obj of array) {
        bins[obj.material].push(obj.type)
        if (obj.secondMaterial) {bins[obj.secondMaterial].push(obj.type)}
    }
    return Object.values(bins)
  }