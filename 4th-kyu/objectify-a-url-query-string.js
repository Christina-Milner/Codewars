/* Given a hypothetical URL query string like user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue, 
    return a properly nested object with those keys and values, like in this case: 
    {
  'user': {
    'name': {
      'firstname': 'Bob',
      'lastname': 'Smith'
    },
    'favoritecolor': 'Light Blue'
  }
}
All properties and values will be strings, and all input will be valid.
*/

//P: A string
//R: An object

/*
- Had a look at some console logs of the input first - seems like the decoding will be the most crucial part of it, i.e. this a=a%26b%3Dc%3F
- Initialise empty object
- Split input string by & (although maybe do this later )
- Replace % in input followed by 2 numbers according to this https://en.wikipedia.org/wiki/Percent-encoding (annoying that we'll have to use map
    to do this, but doing it before the split would throw a monkey wrench into the works due to the appearance of extra &)
- Look for a=b. B will get stuck in as the value as-is, but a needs to be checked for full stops.
    - If no full stops: object[a] = b
    - Otherwise, split a by full stops and create the nested properties if not already present
*/

function convertQueryToMap(query) {
    const decode = {
        "%20": " ", "%21": "!", "%22": '"',
        "%23": "#", "%24": "$", "%25": "%",
        "%26": "&", "%27": "'", "%28": "(",
        "%29": ")", "%2A": "*", "%2B": "+",
        "%2C": ",", "%2F": "/", "%3A": ":",
        "%3B": ";", "%3D": "=", "%3F": "?",
        "%40": "@", "%5B": "[", "%5D": "]"
    }
    const convert = str => {
        return str.replace(/(%\d[\d|\w])/g, m => decode[m])
    }
    const copyThings = (sourceObj, targetObj) => {
        for (let key in sourceObj) {
            if (!(key in targetObj)) {
                targetObj[key] = sourceObj[key]
            }
            else {
                copyThings(sourceObj[key], targetObj[key])
              }
        }
    }

    let result = {}
    if (!query) {return result}
    let urlParts = query.split('&').filter(e => e)
    for (let part of urlParts) {
        const info = part.split('=')
        let [key, value] = [info[0], info[1]]
        if (!key.includes(".")) {
            result[key] = convert(value)
            continue
        }
        let nested = key.split('.')
        let last = nested.pop()
        let jason = '{'
        for (let prop of nested) {
            jason += `"${prop}": {`
        }
        jason += `"${last}": "${convert(value)}"`
        jason += "}".repeat(jason.match(/\{/g).length)
        let obj = JSON.parse(jason)
        copyThings(obj, result)
    }
    return result
    
  }

/* Two points to note for future reference:
  - decodeURIComponent() is a thing
  - The non-bootleg way to do the jason/copyThings thing would have been:
    var deepestObject = props.reduce((obj, key) => {
        return obj[key] || (obj[key] = {});
    }, map);
*/