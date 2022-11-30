/* Ugh, ANOTHER one of these. Seems I have the choice between math or fishing info out of addresses. Anyway...
Given a string containing addresses separated by a comma and a zipcode, return the list of addresses at that zipcode with the house
numbers following after a slash FOR REASONS. If zipcode not present, return "zipcode:/". */

//P: Two strings
//R: A string

/* Much like the 5th kyu yesterday I'd say -
1) Split the string by comma
2) The objects step yesterday wasn't entirely necessary I don't think, but I'd like to keep it so I can keep the "organize the data" and "find what I want" steps separate
3) Poke at regex until I've separated zip, house number and rest of address for each array element and map them to objects
4) Filter by zipcode and populate an addresses and house numbers array with the other elements
5) Return something like `${first array joined}/${second array joined}`
*/


function travel(r, zipcode) {
  
    class Address {
      constructor(zip, houseNo, rest) {
        this.zip = zip
        this.houseNo = houseNo
        this.rest = rest
      }
    }
    const findHouse = str => str.split(' ')[0]
    const findZip = str => str.match(/[A-Z]{2} \d{5}/)[0]
    const findRest = str => str.split(" ").slice(1, -2).join(" ") 
    
    if (!r.includes(zipcode)) {return `${zipcode}:/`}
    
    let addresses = r.split(",")
    addresses = addresses.map(e => new Address(findZip(e), findHouse(e), findRest(e)))
    
    let streets = []
    let houses = []
    
    addresses.filter(e => e.zip == zipcode).forEach(e => {streets.push(e.rest); houses.push(e.houseNo)})
  
    return `${zipcode}:${streets.join(',')}/${houses.join(',')}`
  
}
