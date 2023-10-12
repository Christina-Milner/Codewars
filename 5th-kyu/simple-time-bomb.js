/* This is another puzzle kata that doesn't really have useful tests or more than very vague instructions.
    Defuse a time bomb by cutting the right wire.

Provided code:
var wire;
CutTheWire(this[wire]);
*/

//P: ??? Probably a number
//R: Who knows, probably nothing

/*
- Step is console logging CutTheWire.toString() to see what that function does.
function (wireCode){
    Test.expect(typeof wireCode === 'number', 'BOOM! You have to specify which wire to cut!');
    Test.expect(wireCode === global[theWire], 'BOOM! You cut the wrong wire!');
    delete this[theWire];
  }
- Ok, let's go see what global[theWire] is. I seem to remember the previous bomb puzzle already had some shenanigans where it 
used the word "global" and meant it literally rather than as in "global variable".

- Yup, that's it. Wasn't the previous one of these 10 times as complicated and also 5 kyu? Oh well.
*/

CutTheWire(global[theWire]);