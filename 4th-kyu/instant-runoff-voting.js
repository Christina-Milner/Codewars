/* Given arrays of strings representing ballots , return who wins the election.
    - Each voter selects candidates in order of preference
    - If first-place candidate has more than half the votes, they win
    - Otherwise, candidate with the least votes (in case of tie: all of them) gets booted (and replaced with that person's next choice)
    - Repeat until someone does have more than half the votes
    - In case of complete tie, return undefined
*/

//P: An array of arrays of strings
//R: A string


/*
- First off: undefined is a bad choice as opposed to null because it means I can put "console.log(input)" in the function body and literally pass one of the tests
- It is not entirely clear to me what happens when someone has exactly half the votes (sample tests all have 5 voters), but am going to assume "more than half"
    means what it says on the tin
- So! Create a new array out of the first elements of the input arrays
- Map the elements to how many of them there are in the array
- If a number greater than half the length of the array is present, we're done
- Otherwise find the minimum of the numbers we have in there (reduce)
- Filter the original array to numbers where their counterpart in the mapped array is this minimum
- Iterate over the input arrays and use shift on any where the first element is one of these elements
- ^Wrap this entire process in a while loop or subfunction so it gets repeated until done
- The "complete tie" situation is the case when filtering the original array by the minimum does not change its length
*/


function runoff(voters){
    let firstChoices = voters.map(voter => voter[0]);
    let numOfVotes = firstChoices.map(candidate => firstChoices.filter(name => name == candidate).length);
    let min = numOfVotes.reduce((acc, cur) => Math.min(acc, cur), Infinity);
    for (let i = 0; i < numOfVotes.length; i++) {
        if (numOfVotes[i] > firstChoices.length / 2) {
            return firstChoices[i];
        }
    }
    let losers = firstChoices.filter((name, idx) => numOfVotes[idx] == min);
    if (losers.length == firstChoices.length) {
        return undefined
    }
    for (let voter of voters) {
        while (losers.includes(voter[0]) || !firstChoices.includes(voter[0])) {
            voter.shift();
        }
    }
    return runoff(voters);
  }

/* The only tricky part was line 42. That was originally just an "if losers.includes()". However - technically, not ONLY the people with the lowest number of votes get booted each round.
The people with the lowest number of votes are the ones that don't feature in the first choices at all, but removing only them would not change the majorities/lead to an infinite loop
(ask me how I know), so the next lowest gets removed *as well*. This got checked by one test where a person who got zero first place votes in the first round wins after the second if
not implemented properly. And, yeah - need to a) check for people who didn't feature in the list at all and therefore aren't considered losers even though they are and b) line 42 needs
to be a while to repeatedly get rid of anyone who's been booted.
Whole thing didn't need to be a subfunction or while loop as I can just make a recursive call at the end. Should've arguably placed a voters.slice() at the start to avoid modifying input, though. */