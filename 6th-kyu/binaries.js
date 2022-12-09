/* Given a string composed of digits, code it by doing this (quoted from instructions): 
For each digit d of n

    a) Let k be the number of bits of d

    b) Write k-1 times the digit 0 followed by the digit 1

    c) Write digit d as a binary string, with the rightmost bit being the least significant

    d) Concat the result of b) and c) to get the coding of d

At last concatenate all the results got for the digits of n.
Also write a function that will decode such a string into the original. */

//P: A string composed of digits
//R: (Code) A string composed of 0 and 1 / (decode) A string composed of digits

/* Need to Google what the heck "number of bits" means.
Apparently you find them by doing Math.floor(Math.log2(number)+1), but I have no idea what any of it means.
So, to encode:
- Split the string
- For each element, find the bits as explained above and the binary representation with .toString(2) and concatenate
- (D'oh, missed a step here about taking as many 0s as there are bits and adding 1)
- Join result

To decode:
- Make a dictionary of the digits from 0 to 9 with above encoding function 
- Try this thing I just found on StackOverflow to replace dictionary keys with dictionary values

*/

function code(str) {
    const findBits = num => num ? "0".repeat(Math.floor(Math.log2(num) + 1) - 1) + "1" : "1"
    const toBinary = num => num.toString(2)
    
    return str.split('').map(e => String(findBits(Number(e))) + String(toBinary(Number(e)))).join('')
  }

function decode(str) {
  
let codeMap = {}
  for (let i = 0; i <= 9; i++) {
    i = String(i)
    codeMap[code(i)] = i
  }
    
  let workingStr = str
  let converted = ""
    
  while (workingStr) {
    for (let i = 8; i >= 2; i -= 2)
    if (workingStr.slice(0, i) in codeMap) {
      converted += codeMap[workingStr.slice(0, i)]
      workingStr = workingStr.slice(i)
    }
  }
  
  return converted
}

/* This probably took me a lot longer than a 6th kyu should, but decoding was a headache. Regex replace was not an option as it would
jump to find, say, an 8 somewhere in the middle without caring whether what was left before it was a valid number. I needed it to continually
only look at the front of the string, checking for the longest numbers first, and the way I could think of to do that was a while loop.
At least I still realised I could get rid of the horrific code duplication I originally had by putting that for loop inside the while loop. */