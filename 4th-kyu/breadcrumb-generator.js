/*
 Given two strings, a url and a separator, return a "breadcrumb" for this URL using the separator. Rules:
    - Everything except the last element is a hyperlink, last element is a span with class of active
    - The  root of the url always gets replaced with a hyperlink to "HOME"
    - All breadcrumb elements are in allcaps
    - Anything starting with "index" gets ignored
    - File extensions get ignored
    - If an element is longer than 30 characters, it gets acronymized (why make it completely illegible?)
        - So it gets replaced by the initials of each word, with words like "the" and "of" (list provided) ignored
    - Anchors and parameters also get ignored

    Examples:
    generateBC("mysite.com/pictures/holidays.html", " : ") == '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>'
    generateBC("www.codewars.com/users/GiacomoSorbi", " / ") == '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>'
    generateBC("www.microsoft.com/docs/index.htm", " * ") == '<a href="/">HOME</a> * <span class="active">DOCS</span>'

    generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.htm", " > ") == 
    '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>'
    generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") == 
    '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>'

*/

//P: Two strings
//R: A string

/*
- Grab the list of words to ignore as a constant, create another one for file extensions (edit: latter actually not necessary, just get rid of anything behind a special char at the end)
- Save '<a href="/">HOME</a>' as a constant
- First step: Split url string by slashes
- Boot first element and add HOME to result string (or array or whatever we're doing with this for now)
- Write a helper function that takes in a string and returns <a href="/${string}/">STRING</a> (this also needs to replace hyphens with spaces)
- Write another one that sticks the string into the otherwise constant span thing
- All elements except the last one now get shifted, checked for length (TBD), and converted by the helper
    - Careful - at index (length - 2), check if the next element contains index, because if so, need to use the span. 
- If length greater than 30, go into a different helper that leaves string as is for the a href tag, but does the acronym logic for the other
    - Acronym: Split by hyphens, filter for not in ignore list, map to capitalised first letter, join
- Last element:
    - If it contains index (or rather, /^index\.), ignore
    - If it contains '#','?' or '.', split by that and boot everything except the first element
    - remove hyphens and run through span
*/


function generateBC(url, separator) {

    const IGNORE = ["the", "of", "in", "from", "by", "with", "and", "or", "for", "to", "at", "a"]
    const HOME = '<a href="/">HOME</a>'
    const specials = ['#', '?', '.']

    let urlArr = url.replace(/https?\:\/\//, "").replace(/\/$/, "").split(/\/+/)
    let resultArr = [HOME]
    let subfolders = []

    const makeHyper = (string, arr) => {
        let spacified = string.replace(/\-/g, " ")
        if (!arr.length) {
            return `<a href="/${string}/">${spacified.toUpperCase()}</a>`
        }
        return `<a href="/${arr.join("/")}/${string}/">${spacified.toUpperCase()}</a>`
    }
    const makeSpan = string => `<span class="active">${string.replace(/\-/g, " ").toUpperCase()}</span>`
    const acronymify = string => {
        return string.split('-').map(word => IGNORE.includes(word) ? "" : word[0].toUpperCase()).join('')
    }
    if (urlArr.length === 1 || urlArr.length === 2 && /^index\./.test(urlArr[urlArr.length - 1])) {
        return `<span class="active">HOME</span>`
    }
    for (let i = 1; i < urlArr.length; i++) {
        let seg = urlArr[i]

        if (i < urlArr.length - 2 || i === urlArr.length - 2 && !(/^index\./.test(urlArr[urlArr.length - 1]))) {          
            if (seg.length <= 30) {
                resultArr.push(makeHyper(seg, subfolders))
            } else {
                resultArr.push(subfolders.length ? `<a href="/${subfolders.join('/')}/${seg}/">${acronymify(seg)}</a>` : `<a href="/${seg}/">${acronymify(seg)}</a>`)
            }
            subfolders.push(seg)
            continue
        }
        else if (i === urlArr.length - 2) {
            if (seg.length <= 30) {
                resultArr.push(makeSpan(seg))
                }
            else {
                resultArr.push(makeSpan(acronymify(seg)))
            }
            break
        }
        else {
            for (let char of seg) {
                if (specials.includes(char)) {
                    seg = seg.split(char)[0]
                    break
                }
            }
            if (seg.length <= 30) {
                resultArr.push(makeSpan(seg))
                }
            else {
                resultArr.push(makeSpan(acronymify(seg)))
            }
        }
    }
    return resultArr.join(separator)
  }


