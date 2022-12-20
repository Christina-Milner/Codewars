/* We are playing the shell game (where a ball is hidden under a cup). Given the starting position of the ball as num, an index in an array,
and an array of arrays representing cups that are swapped, return the index of the cup the ball is now under. All swaps are valid and involve 2 distinct indices.
Example: 
swaps = [[0,1], [1,2], [1, 0]]
find_the_ball(0, swaps) == 2
*/

//P: An integer and an array of arrays of two integers
//R: An integer

/*
- Check if array of swaps is empty - if so, return the starting position
- Iterate over the array
    - If a subarray's element at index 0 is the current position of the ball, update it to whatever is at index 1
- Return current position of the ball
- Update: not quite like that, I assumed from the example that the current ball position would always be at index 0 of a swap.
    That is not the case. So add the reverse of the bulletpoint under "iterate".
*/

function findTheBall(start, swaps) {
    if (!swaps.length) {return start}
    swaps.forEach(e => {
      if (e[0] == start) {
        start = e[1]
      }
      else if (e[1] == start) {
        start = e[0]
      }
    })
    return start
  }