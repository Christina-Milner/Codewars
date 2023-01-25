/* Given an array of objects representing data about developers attending a meetup who all code in either Python, Ruby, or JS, return true if the
number of devs for any given language does not exceed twice the number for another. */

//P: An array of objects
//R: A boolean

/*
- Count the devs for each language: Length of list filtered by that language
- Trying to figure out if the rest can be done without a bunch of cumbersome comparisons. 
  Will it do if I just check if the max is no larger than 2 * the min?
*/

function isLanguageDiverse(list) {
    let [python, ruby, javascript] = [list.filter(e => e.language == "Python").length,
                                     list.filter(e => e.language == "Ruby").length,
                                     list.filter(e => e.language == "JavaScript").length]
    
    return Math.max(python, ruby, javascript) <= 2 * Math.min(python, ruby, javascript)
  }

  /* That does work, but it got my gears turning about how I would do this if there was an unknown number of languages
  or too many to do them by hand like that. I suppose you'd do:
  - Map list to e.language
  - Create an empty object
  - Iterate over languages:
    - If language not in object, add to object with the list filtered by it as the value, update the list to filtered by not that language
  - Do the same "max no larger than 2 * min" logic on the object's values
  */

  function isLanguageDiverse(list) {
    let languages = list.map(e => e.language)
    let langCount = {}
    for (let language of languages) {
        if (!(language in langCount)) {
          langCount[language] = languages.filter(e => e == language).length
          }
    }
    return Math.max(...Object.values(langCount)) <= 2 * Math.min(...Object.values(langCount))
 }
