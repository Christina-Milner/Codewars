/* Create a function that accepts a value as a secret and returns aon object with ONLY the two methods getSecret() and setSecret(), doing what they say on the tin. */

//P: Any value
//R: An object


/*
- My thought process was "wait, I don't understand, what keeps me from just doing ..." and typing in the below to see what would happen. And the answer was: Nothing.
*/


function createSecretHolder(secret) {
    return {
        _secret: secret,
        getSecret: function() {
            return this._secret
        },
        setSecret: function(value) {
            this._secret = value
        }
    }
  }