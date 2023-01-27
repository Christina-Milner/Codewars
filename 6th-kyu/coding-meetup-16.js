/* Given an array of objects representing data about developers attending a meetup, return an array of those developers where a value (it will only ever be one) is null,
with a question property added that has the value of "Hi, could you please provide your <property name>." */

//P: An array of objects
//R: An array of objects (with an extra property)

/*
- Filter input list by values includes null
- Iterate over resulting array, find and save property whose value is null
- Add question property with the value from the previous step 
- Return array
*/

function askForMissingDetails(list) {
    let missingInfo = list.filter(e => Object.values(e).includes(null))
    missingInfo.forEach(e => {
        for (let key in e) {
            if (e[key] == null) {
                e.question = `Hi, could you please provide your ${key}.`
            }
        }
    })
    return missingInfo
  }
