/* There is a dictionary class that takes in an array of strings as a constructor and saves them to the "words" property. 
This class is supposed to have a method getMatchingWords that allows for entering a string pattern using ? as a placeholder replacing exactly one
arbitrary letter, returning all strings from the words property that match. All letters are lowercase. Write the method. */

//P: A string
//R: An array of strings

/*
- Right so if I'm not mistaken, "one arbitrary letter" is \w{1} in actual RegEx.
- Can I replace that out and then convert the string into a RegExp? I doubt it, but let's find out.
- Answer: Yes, we can, and from that point it was pretty straightforward to iron out to get to the actual solution
    and I didn't have anything else to write here
*/



class Dictionary {
    constructor(words) {
        this.words = words;
    }

    getMatchingWords(pattern) {
        let newPattern = "^" + pattern.replace(/\?/g, "\\w{1}") + "$";
        let regex = new RegExp(newPattern)
        return this.words.filter(word => regex.test(word));
    }
}