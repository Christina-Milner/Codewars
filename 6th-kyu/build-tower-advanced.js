/* Given an integer greater than 0 num and a block size [a, b] always greater than [0, 0], return an array of strings (representing lines in a picture)
that depicts a tower of num floors built using blocks made out of "*" with dimensions a, b.
A tower of 3 floors with block size 2, 3 would look like this: 
[
  '    **    ',
  '    **    ',
  '    **    ',
  '  ******  ',
  '  ******  ',
  '  ******  ',
  '**********',
  '**********',
  '**********'
]
*/

//P: An integer and an array of two integers
//R: An array of strings

/*
- First we need to create the "block". The block is an array of length b made of elements that are "*" times a.
- Actually scrap that, as we're not literally building it out of blocks and this is going to be a PITA if the block has multiple lines
- We have to find how wide the widest "floor" is going to be. The logic seems to be 2 blocks get added for each level down, so
    the lowest will be 1 + (num - 1) * 2 times the width of the block
- Create an array of length num * b
- Populate each element with (integer division of index / b) * 2 + 1 times "*" repeated a times and pad start and end with spaces
    so the length matches the value calculated for point 3
*/

function towerBuilder(floors, [width, height]) {

    const maxWidth = (1 + (floors - 1) * 2) * width
    
    const layerBuilder = idx => {
      const stars = "*".repeat((Math.floor(idx / height) * 2 + 1) * width)
      const spaces = " ".repeat((maxWidth - stars.length) / 2)
      return spaces + stars + spaces
    }
    
    return Array(floors * height).fill("").map((_, idx) => layerBuilder(idx))         
  }