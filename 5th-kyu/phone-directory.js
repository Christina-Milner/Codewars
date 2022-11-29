/* I am given a string representing phone book entries - separated by newlines, intended to be in the format +1-123-456-7890 (where +1 can also be 2 digits) + <Firstname Lastname> +
town/address, but the order is jumbled and there can be random other characters strewn in there.
Given a phone number, return a string in this format: "Phone => 1-541-754-3010, Name => J Steeve, Address => 156 Alphand St."
Return "Error => Too many people: num" if there are "many people" for a phone number (I am going to assume this means more than one).
Return "Error => Not found: num" if the phone number is not present. */

//P: Two strings
//R: A string

/* - Split the phonebook string by newlines
- Map the resulting array entries to objects containing the phone number, name and address
- Accomplish the above by using regex matching for <> and +x-xxx-xxxx-xxxx. 
- Anything that's left in the string should be the address - not sure how to filter out the random clutter, but from tests
looks like it might just be a case of getting rid of chars like ? and /.
- Iterate over the array of objects and find what we need
*/

function phone(strng, num) {
    class PhoneEntry {
      constructor(number, name, address) {
        this.number = number
        this.name = name
        this.address = address
      }
    }
    const findPhoneNo = str => {
      try {
        return str.match(/\d+\-\d+\-\d+\-\d+/)[0]
        }
      catch {return null}
    }
    const findName = str => {
      try {
        return str.match(/<.*>/)[0].replace(/</, "").replace(/>/, "")
        }
      catch {return null}
    }
    const findAddress = str => {
      return str.split(' ').filter(e => !e.includes('+') && !e.includes('<') && !e.includes('>')).join(' ')
      .replace(/[?/;,]/g, "").replace("_", " ").replace("  ", " ").trim()
    }
    
    let phoneBookEntries = strng.split('\n')
    phoneBookEntries = phoneBookEntries.map(e => new PhoneEntry(findPhoneNo(e), findName(e), findAddress(e)))
  
    let results = phoneBookEntries.filter(e => e.number == num)
    if (!results.length) {return `Error => Not found: ${num}`}
    if (results.length > 1) {return `Error => Too many people: ${num}`}
    let result = results[0]
    return `Phone => ${num}, Name => ${result.name}, Address => ${result.address}`
}

/* The "clutter" feature wasn't my favourite as it ended up just being trial and error to see what errant characters there were that needed to be filtered out.
Also, the comma in something like "Townname, SC 123124" should have absolutely stayed. */
