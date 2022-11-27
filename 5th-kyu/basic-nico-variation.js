/* Given a message and a key, encode the message based on the key. 
The key turns into a sequence of numbers based on the order of its letters if alphabetically sorted, like this: 
"crazy" sorted alphabetically is "acryz", so the number is 23154. To then encode the string "secretinformation":
2 3 1 5 4
---------
s e c r e
t i n f o
r m a t i
o n

after encoding: 

1 2 3 4 5
---------
c s e e r
n t i o f
a r m i t
  o n   

*/

//P: Two strings
//R: A string

/* Sooo. 1) Split the key, sort alphabetically, map original key to index in sorted key.
2) Divide message into chunks of key length, somehow (fill the last one up with spaces)
3) Map the characters in each chunk to [char, keyNum]
4) Sort each chunk by keyNum
5) Map back to get rid of the numbers and join?
*/

function nico(key, message) {
  
    // convert the key into the sequence of numbers
    let keyArr = key.split('')
    let keyArrSorted = key.split('').sort((a, b) => a.localeCompare(b))
    keyArr = keyArr.map(e => keyArrSorted.indexOf(e) + 1)
    
    // divide message up into chunks of key length
    let chunks = []
    for (let i = keyArr.length; i <= message.length; i += keyArr.length) {
      chunks.push(message.slice(i - keyArr.length, i))
      if (i + keyArr.length > message.length && i < message.length) {
        chunks.push(message.slice(i).padEnd(keyArr.length, " "))
      }
    }
  
    // add the corresponding key number to each letter in a chunk
    chunks = chunks.map(e => e.split('').map((f, i) => [f, keyArr[i]]))
  
    // sort chars in each chunk by number
    chunks.forEach(e => e.sort((a, b) => a[1] - b[1]))
  
    // map back to get rid of the numbers and join up
    chunks = chunks.map(e => e.map(f => f[0]).join(''))
    return chunks.join('')
  }

/* I love when a plan actually works out. */