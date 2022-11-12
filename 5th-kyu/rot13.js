/* Create a function that ciphers a string such that numbers or special characters are returned as they are and letters from the Latin/English alphabet
are shifted by 13. */

//P: A string
//R: A string


function rot13(message){
  
    const charCodeConverter = idx => {
      let charCode = message.charCodeAt(idx)
      if (charCode < 65 || (charCode > 90 && charCode < 97) || charCode > 122) { // Not a letter, leave it as it is
        return charCode
        }
      if ((charCode > 77 && charCode < 91) || charCode > 109) {                           // Wrap around the end
        return charCode - 13
      }
      return charCode + 13
    }
    
    return message.split('')
          .map((_, i) => String.fromCharCode(charCodeConverter(i)))        
          .join('')
  }