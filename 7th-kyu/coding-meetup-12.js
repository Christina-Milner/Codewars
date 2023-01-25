/* Given an array of objects representing data about developers attending a meetup and a language, return a list of the developers that code in that language
and are GitHub admins. */

//P: An array of objects
//R: An array of objects

/* Filter by both of those criteria, not much else to say about it */

function findAdmin(list, lang) {
  return list.filter(e => e.language == lang && e.githubAdmin == "yes")
}