/* Given a number N, make a n x n spiral - i.e. an array of arrays of 0s and 1s where the 1s form a spiral, like this:
		doTest(5, [
			[1,1,1,1,1],
			[0,0,0,0,1],
			[1,1,1,0,1],
			[1,0,0,0,1],
			[1,1,1,1,1]]
		);
    Spirals smaller than 5 do not need to be considered.
*/

//P: A number
//R: An array of arrays of numbers

/*
- Dunno if I can actually do this but I'd like to have a go. According to comments, it's on the easier side for a 3rd kyu.
- So, hm, if the index of the current subarray is 0 or n - 1, we want all 1s
- Row 1 is always all zeroes except for the last element
- Row n - 2 appears to always be all zeroes except the last and first element
- Someone in the comments said this was like the snail kata, and, while I'm not going to look at that again just yet, I did just have a familiar train of thought:
    - I thought, what about just prefilling the arrays with 0 and then literally taking the path the spiral will and filling with 1s
- Which, yeah, means setting an x min, x max, y min, and y max marker that decrement as rows fill up, which I'm sure is the exact thing I did for snail
- I can't remember whether that was the one where I also made variables for whether we'Re going right, down, left, or up and then realised at the end I didn't need those
- So. Let's say we initialise xmin to 0, ymin to 0, xmax to n - 1, ymax to n - 1
- Iterate from [ymin][xmin] to [ymin][xmax] and replace elements with 1s, increment ymin
- Iterate from [ymin][xmax] to [ymax][xmax] and replace elements with 1s, decrement xmax
- Iterate from [ymax][xmax] to [ymax][xmin] and replace elements with 1s, decrement ymax
    - Ok actually need to be careful here as need to iterate from the pre-increment value
- Now it gets interesting as the rows of 1 can't touch. So the left column gets filled up to ymin + 1, not ymin, and the next pass right needs to go to xmax - 2.
- Is there anything stopping me from simply decrementing/incrementing by 2 each time? Don't think so.
- Now, when does the loop end?
    - Based on breaking down the 8 x 8 step by step, I'm going to say "when both xmin >= xmax and ymin >= ymax"
    - At the point where ymin exceeds ymax, it still needs to go up and add one more 1, at which point xmin is then greater than xmax as well
    - And I'm guessing with an odd number, they'll end up equal
*/


function spiralize(n) {
	let spiralArr = Array.from({length: n}, (_, i) => Array(n).fill(0))
    let xMin = 0
    let xMax = n - 1
    let yMin = 0
    let yMax = n - 1
    
    while (true) {

        for (let x = xMin === 0 ? xMin: xMin - 2; x <= xMax; x++) {
            if (spiralArr[yMin][x + 1]) {break}
            spiralArr[yMin][x] = 1
        }
        yMin += 2
        for (let y = yMin === 0 ? yMin : yMin - 2; y <= yMax; y++) {
            if (spiralArr[y + 1] && spiralArr[y + 1][xMax]) {break}
            spiralArr[y][xMax] = 1
        }
        xMax -= 2
        for (let x = xMax === n - 1 ? xMax : xMax + 2; x >= xMin; x--) {
            if (spiralArr[yMax][x - 1]) {break}
            if (x !== xMax + 2 && spiralArr[yMax - 1] && spiralArr[yMax - 1][x]) {break}
            spiralArr[yMax][x] = 1
        }
        yMax -= 2
        for (let y = yMax === n - 1 ? yMax: yMax + 2; y >= yMin; y--) {
            if (spiralArr[y - 1] && spiralArr[y - 1][xMin]) {break}
            spiralArr[y][xMin] = 1
        }
        xMin += 2
        if (xMin > xMax && yMin > yMax) {break}
    }
    return spiralArr
}

/* Needed a few extra conditions to avoid 1s placed next to other 1s, which got a little fiddly. */