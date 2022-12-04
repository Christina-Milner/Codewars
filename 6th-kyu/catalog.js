/*Given a string that contains an extract of a catalog in the format of articles like this "<prod><name>drill</name><prx>99</prx><qty>5</qty></prod>" separated
by newlines, and an article name, return the price and quantity for that article name like this: 'ladder > prx: $112 qty: 12' for "ladder".
If the article is present multiple times, return all instances separated by newlines (\r\n) in the same order as in the catalog. */

//P: Two strings
//R: A string

/* I am going to have to figure out how to regex match something and then only capture part of that match, last time I tried, I failed.
Hmm okay, think I have that.
So, split input string by \n\n
map each element of resulting array to an object with name, price and quantity attributes based on regex extracting that info
filter by the part of the name we're looking for
map remaining objects to string of the requested format and join with \r\n if multiple */

function catalog(s, article) {
    if (!(s.includes(article))) {return "Nothing"}
    const getName = str => str.match(/<name>(.*)<\/name>/) ? str.match(/<name>(.*)<\/name>/)[1] : "No name"
    const getPrice = str => str.match(/<prx>(.*)<\/prx>/) ? str.match(/<prx>(.*)<\/prx>/)[1] : "No price"
    const getQuantity = str => str.match(/<qty>(.*)<\/qty>/) ? str.match(/<qty>(.*)<\/qty>/)[1] : "No quantity"
      
    class CatalogItem {
      constructor(name, price, qty) {
        this.name = name
        this.price = price
        this.qty = qty
      }
    }
    
    let objCatalog = s.split('\n\n').map(e => new CatalogItem(getName(e), getPrice(e), getQuantity(e)))
    
    const makeString = obj => `${obj.name} > prx: $${obj.price} qty: ${obj.qty}`
    
    return objCatalog.filter(e => e.name.includes(article)).map(e => makeString(e)).join('\r\n')
    
  }

/* Plan mostly worked out - missed the instruction to return "Nothing" if no matches present.
Bafflingly, was getting "can't read property [1] of null" errors on the random tests until I put those ternary operators in, but
the fallbacks don't seem to actually get used or the fact that I randomly made them up would surely cause an error. Shrug. */