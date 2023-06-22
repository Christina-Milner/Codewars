/* Given a two-dimensional array of letters representing the substances in the following table, return it sorted by density. Lower density liquids float to the top left.
======================
|   Density Chart    |
======================
| Honey   | H | 1.36 |
| Water   | W | 1.00 |
| Alcohol | A | 0.87 |
| Oil     | O | 0.80 |
----------------------
*/

//P: An array of arrays of strings
//R: An array of arrays of strings

/*
- Make an object mapping letter to density
- Concatenate all the subarrays together then sort by density ascending
- Then split back into subarrays of the initial length
*/



function separateLiquids(glass) {
    if (!glass.length) {return glass}
    const densities = {H: 1.36, W: 1.00, A: 0.87, O: 0.80}
    let result = []
    const all = glass.reduce((acc, cur) => acc.concat(cur), []).sort((a, b) => densities[a] - densities[b])
    for (let i = glass[0].length; i <= all.length; i += glass[0].length) {
        result.push(all.slice(i - glass[0].length, i))
    }
    return result
 }