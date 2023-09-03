/* Write a method for a class PokerHand that compares the current hand to one taken in as a parameter and returns the win/loss/tie property of a Result object as appropriate.
PokerHand takes a string in its constructor that contains 5 cards separated by spaces. 
The cards are 2 characters, value and S for Spades, H for Hearts, D for Diamonds and C for Clubs.
Suits aren't ranked and Aces can be low, otherwise Texas Hold 'Em rules apply. */

//P: A string
//R: An object property

/*
- Implement a constructor that splits the input by spaces
- Compare function needs to check for winning hands in order from highest to lowest:
    - Straight flush: 
        - Check whether suits are all the same and values are sequential
        - Probably a good idea to implement a sorting function, or at least a map that maps T, J, Q and K to 11, 12, 13 and 14, respectively
        - (Figure out how to deal with varying Ace value later)
        - If this is true for both hands, check which one has the higher max card
    - Four of a kind
        - Check whether 4 of the same value are present. I assume same rule applies where if both players have it, higher value wins
        - If values are the same, check value of kicker
        - Possibly have a check at the start that goes straight to tie if all card values are the same, but needs to account for suit in some cases so ehhh
    - Full house
        - Check for 3 + 2 of same value, compare values
    - Flush
        - Check for all cards of same suit
    - Straight
        - Check for sequential values (not same suit)
    - 3 of a kind
        - Same as 4 of a kind, but with 3
    - Two pairs
        - Check for two pairs of same values. Higher pairs win?
    - Pair
    - High card
*/


/* Write a method for a class PokerHand that compares the current hand to one taken in as a parameter and returns the win/loss/tie property of a Result object as appropriate.
PokerHand takes a string in its constructor that contains 5 cards separated by spaces. 
The cards are 2 characters, value and S for Spades, H for Hearts, D for Diamonds and C for Clubs.
Suits aren't ranked and Aces can be low, otherwise Texas Hold 'Em rules apply. */

//P: A string
//R: An object property

/*
- Implement a constructor that splits the input by spaces
- Compare function needs to check for winning hands in order from highest to lowest:
    - Straight flush: 
        - Check whether suits are all the same and values are sequential
        - Probably a good idea to implement a sorting function, or at least a map that maps T, J, Q and K to 11, 12, 13 and 14, respectively
        - (Figure out how to deal with varying Ace value later)
        - If this is true for both hands, check which one has the higher max card
    - Four of a kind
        - Check whether 4 of the same value are present. I assume same rule applies where if both players have it, higher value wins
        - If values are the same, check value of kicker
        - Possibly have a check at the start that goes straight to tie if all card values are the same, but needs to account for suit in some cases so ehhh
    - Full house
        - Check for 3 + 2 of same value, compare values
    - Flush
        - Check for all cards of same suit
    - Straight
        - Check for sequential values (not same suit)
    - 3 of a kind
        - Same as 4 of a kind, but with 3
    - Two pairs
        - Check for two pairs of same values. Higher pairs win?
    - Pair
    - High card
*/


const Result = { "win": 1, "loss": 2, "tie": 3 }

class PokerHand {
    constructor(hand) {
        const values = {T: 10, J: 11, Q: 12, K: 13, A: 14}
        this.hand = hand.split(' ').map(card => isNaN(card[0]) ? {value: values[card[0]], suit: card[1]} : {value: card[0], suit: card[1]}).sort((a, b) => b.value - a.value)
    }

    allSameSuit(hand) {
        return hand.every(card => card.suit === hand[0].suit)
    }

    sequentialValues(hand) {
        let values = hand.map(card => card.value)
        let sequential = values.every((val, idx, arr) => arr[idx + 1] ? val - arr[idx + 1] == 1 : true)
        if (sequential) {return values[0]}
        if (values[0] === 14 && values[values.length - 1] === 2) {
            values.shift()
            values.push(1)
        }
        sequential = values.every((val, idx, arr) => arr[idx + 1] ? val - arr[idx + 1] == 1 : true)
        if (sequential) {return values[0]}
    }

    straightFlush(hand) {
        if (this.allSameSuit(hand) && this.sequentialValues(hand)) {
            return hand[0]
        }
        if (this.allSameSuit(hand) && hand[0].value === 14) {
            let newHand = hand.slice()
            newHand.shift()
            newHand.push({value: 1, suit: hand[0].suit})
            if (this.sequentialValues(newHand)) {
                return newHand[0]
            }
        }
    }

    // Multipurpose function that checks how many (max) of the same value there are and returns that value along with what it is and what the kickers are
    anyOfAKind(hand) {
        let values = new Set(hand.map(card => card.value))
        if (values.size === hand.length) {return null}
        let highest = Array.from(values).sort((a, b) => hand.filter(card => card.value === b).length - hand.filter(card => card.value === a).length)
        let [kind, value, kickers] = [hand.filter(card => card.value === highest[0]).length, highest[0], hand.filter(card => card.value !== highest[0])]
        return {ofAKind: kind, val: value, kicker: kickers}
    }


    compareWith(otherHand) {
        // straight flush
        let [myStrFlush, theirStrFlush] = [this.straightFlush(this.hand), this.straightFlush(otherHand.hand)]
        if (myStrFlush && theirStrFlush) {
            return myStrFlush.value > theirStrFlush.value ? Result.win : myStrFlush.value < theirStrFlush.value ? Result.loss : Result.tie
        }
        else if (myStrFlush) {return Result.win}
        else if (theirStrFlush) {return Result.loss}
        // 4 of a kind
        let [myOfAKind, theirOfAKind] = [this.anyOfAKind(this.hand), this.anyOfAKind(otherHand.hand)]
        if (myOfAKind && myOfAKind.ofAKind === 4 && theirOfAKind && theirOfAKind.ofAKind === 4) {
            if (myOfAKind.val === theirOfAKind.val) {
                return myOfAKind.kicker[0].value > theirOfAKind.kicker[0].value ? Result.win : myOfAKind.kicker[0].value < theirOfAKind.kicker[0].value ? Result.loss : Result.tie
            }
            return myOfAKind.val > theirOfAKind.val ? Result.win : myOfAKind.val < theirOfAKind.val ? Result.loss : Result.tie
        }
        else if (myOfAKind && myOfAKind.ofAKind === 4) {return Result.win}
        else if (theirOfAKind && theirOfAKind.ofAKind === 4) {return Result.loss}
        // A full house is a 3 of a kind with the kickers being the same thing
        if (myOfAKind && myOfAKind.ofAKind === 3) {
            let myFullHouse = myOfAKind.kicker[0].value === myOfAKind.kicker[1].value
            if (theirOfAKind && theirOfAKind.ofAKind === 3) {
                let theirFullHouse = theirOfAKind.kicker[0].value === theirOfAKind.kicker[1].value
                if (myFullHouse && theirFullHouse) {
                    if (myOfAKind.val === theirOfAKind.val && myOfAKind.kicker[0].value == theirOfAKind.kicker[0].value) {
                        return Result.tie
                    }
                    else if (myOfAKind.val === theirOfAKind.val) {
                        return myOfAKind.kicker[0].value > theirOfAKind.kicker[0].value ? Result.win : Result.loss
                    }
                    return myOfAKind.val > theirOfAKind.val ? Result.win : Result.loss
                }
                else if (myFullHouse) {return Result.win}
                else if (theirFullHouse) {return Result.loss}
            }
            if (myFullHouse) {return Result.win}
        }
        else if (theirOfAKind && theirOfAKind.ofAKind === 3 && theirOfAKind.kicker[0].value === theirOfAKind.kicker[1].value) {
            return Result.loss
        }
        // Flush
        let [myFlush, theirFlush] = [this.allSameSuit(this.hand), this.allSameSuit(otherHand.hand)]
        if (myFlush && theirFlush) {
            for (let i = 0; i < this.hand.length; i++) {
                let [mine, theirs] = [this.hand[i].value, otherHand.hand[i].value]
                if (mine > theirs) {return Result.win}
                if (mine < theirs) {return Result.loss}
            }
            return Result.tie
        }
        else if (myFlush) {return Result.win}
        else if (theirFlush) {return Result.loss}
        // Straight
        let [myStraight, theirStraight] = [this.sequentialValues(this.hand), this.sequentialValues(otherHand.hand)]
        if (myStraight && theirStraight) {
            return myStraight > theirStraight ? Result.win : myStraight < theirStraight ? Result.loss : Result.tie
        }
        else if (myStraight) {return Result.win}
        else if (theirStraight) {return Result.loss}
        // 3 of a kind
        if (myOfAKind && myOfAKind.ofAKind === 3 && theirOfAKind && theirOfAKind.ofAKind === 3) {
            if (myOfAKind.val === theirOfAKind.val) {
                if (myOfAKind.kicker[0].value === theirOfAKind.kicker[0].value) {
                    return myOfAKind.kicker[1].value > theirOfAKind.kicker[1].value ? Result.win : myOfAKind.kicker[1].value < theirOfAKind.kicker[1].value ? Result.loss : Result.tie
                }
                return myOfAKind.kicker[0].value > theirOfAKind.kicker[0].value ? Result.win : Result.loss
            }
            return myOfAKind.val > theirOfAKind.val ? Result.win : Result.loss
        }
        else if (myOfAKind && myOfAKind.ofAKind === 3) {return Result.win}
        else if (theirOfAKind && theirOfAKind.ofAKind === 3) {return Result.loss}
        // 2 pair
        let [myTwoPair, theirTwoPair] = [myOfAKind && myOfAKind.ofAKind === 2 && this.anyOfAKind(myOfAKind.kicker) && this.anyOfAKind(myOfAKind.kicker).ofAKind === 2,
             theirOfAKind && theirOfAKind.ofAKind === 2 && this.anyOfAKind(theirOfAKind.kicker) && this.anyOfAKind(theirOfAKind.kicker).ofAKind === 2]
        if (myTwoPair && theirTwoPair) {
            if (myOfAKind.val == theirOfAKind.val) {
                let [mySecondPair, theirSecondPair] = [this.anyOfAKind(myOfAKind.kicker).val, this.anyOfAKind(theirOfAKind.kicker).val]
                if (mySecondPair === theirSecondPair) {
                    let [myKicker, theirKicker] = [this.anyOfAKind(myOfAKind.kicker).kicker[0].value, this.anyOfAKind(theirOfAKind.kicker).kicker[0].value]
                    return myKicker > theirKicker ? Result.win : theirKicker > myKicker ? Result.loss : Result.tie
                }
                return mySecondPair > theirSecondPair ? Result.win : mySecondPair < theirSecondPair ? Result.loss : Result.tie
            }
            return myOfAKind.val > theirOfAKind.val ? Result.win : myOfAKind.val < theirOfAKind.val ? Result.loss : Result.tie
        }
        else if (myTwoPair) {return Result.win}
        else if (theirTwoPair) {return Result.loss}
        // 1 Pair
        let [myPair, theirPair] = [myOfAKind && myOfAKind.ofAKind === 2, theirOfAKind && theirOfAKind.ofAKind === 2]
       if (myPair && theirPair) {
           if (myOfAKind.val == theirOfAKind.val) {
               for (let i = 0; i < 3; i++) {
                    if (myOfAKind.kicker[i].value === theirOfAKind.kicker[i].value) {
                        continue
                    }
                    if (myOfAKind.kicker[i].value > theirOfAKind.kicker[i].value) {
                        return Result.win
                    }
                    if (myOfAKind.kicker[i].value < theirOfAKind.kicker[i].value) {
                        return Result.loss
                    }
                }
                return Result.tie
           }
           return myOfAKind.val > theirOfAKind.val ? Result.win : myOfAKind.val < theirOfAKind.val ? Result.loss : Result.tie
       }
       else if (myPair) {return Result.win}
       else if (theirPair) {return Result.loss}
       // High Card
       for (let i = 0; i < otherHand.hand.length; i++) {
        let [mine, theirs] = [this.hand[i].value, otherHand.hand[i].value]
        if (mine > theirs) {return Result.win}
        if (mine < theirs) {return Result.loss}
       }
       return Result.tie
    }
}

/* Not my tidiest/most concise work. In retrospect, should've made a function that analyses what a given hand is (straight flush, 4 of a kind etc.), and then have the compare function
simply find out what both hands are and then determine the winner based on a numerical map or something. It felt so tidy with the little outsourced helpers at first and then
became a huge mess because of the constant comparisons. */
