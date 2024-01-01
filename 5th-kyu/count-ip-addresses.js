/* Given two valid IPv4 addresses as a string, return how many addresses are between them (including the first one, but excluding the last one). The second address will always be 
greater than the first.*/

//P: Two strings
//R: A number

/*
- Each position can go from 0 to 255 and there are 4 positions
- There are 256 addresses between x.x.x.0 and x.x.x + 1.0
- If only last position differs, result is end - start
- If penultimate position differs, result is (end - start) * 256
    - I think, minus whatever ending position start has and plus whatever ending position end does
- Math is hard, I can't quite figure out how to do this other than to increment each position until they match and keep a counter
*/


function ipsBetween(start, end){
    let startNums = start.split('.').map(Number);
    let endNums = end.split('.').map(Number);
    let result = endNums[3] - startNums[3];
    let pos = 2;
    while (pos >= 0) {
        if (startNums[pos] == endNums[pos]) {
            pos--;
            continue;
        }
        let exp = 3 - pos;
        result += (endNums[pos] - startNums[pos]) * 256 ** exp;
        pos--;
    }
    return result;
  }

/* Originally wrote separate ifs for each pos to slowly wrap my brain around it; once confirmed that the powers do indeed work the way I think,
I took getting rid of the ifs and making a general rule to find the exponent as a separate step. */
