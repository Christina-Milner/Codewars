/* Given an array of objects representing data about developers attending a meetup, return an object with a count of each coding language represented. */

//P: An array of objects
//R: An object

/*
I already did this one, before I started keeping my own copies of these. Saving it here now as I want to do this whole series.
My solution was: */

function countLanguages(list) {
    let languages = {}
    list.forEach(e => {
      if (!(e.language in languages)) {
        languages[e.language] = 1
      } else {
      languages[e.language] += 1
      }
    })
    return languages
  }