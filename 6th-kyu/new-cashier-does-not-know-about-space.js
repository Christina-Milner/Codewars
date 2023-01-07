/* Given a string that represents various lowercase menu items mashed together with no spaces, return a string of the same items, but with the first
letters capitalised, separated by spaces, and sorted by the order they appear on the menu. */

//P: A string
//R: A string

/*
This is a post hoc as I'd started doing this kata, had to give up on it for the time being, and now came back to it assuming
I still had the PREP saved, but apparently didn't. 
The train of thought was: I'll stick the menu items in an object, capitalised as I want them to appear later, and assigned ascending values
that I can use for sorting later, in case just having them in the right order in the object isn't enough.
I'll then iterate over the string (while loop running as long as it's not empty), slice out any of those items it finds, push their proper
spelling into a new array and return that sorted and joined with spaces.

The reasons I was having trouble were:
- Had forgotten to put .toLowerCase() in my indexOf so it was going into an infinite loop as indexOf returned -1 and the input string got sliced down
to "a" (not seeing this kind of dumb stuff is why you have to walk away from these sometimes...)
- Was doing slice wrong based on a quick but apparently not representative example I'd tried in the console. Was slicing off everything up to the
first occurrence of the current item, rather than just the item itself. Which was easily solved by slicing (0, indexOf) + (indexOf, length of item) instead.
*/

function getOrder(input) {
    const menu = {
      "Burger": 1,
      "Fries": 2,
      "Chicken": 3,
      "Pizza": 4,
      "Sandwich": 5,
      "Onionrings": 6,
      "Milkshake": 7,
      "Coke": 8
    }
    let order = []
    while (input.length) {
      for (let item of Object.keys(menu)) {
        if (input.includes(item.toLowerCase())) {
          order.push(item)
          input = input.slice(0, input.indexOf(item.toLowerCase())) + input.slice(input.indexOf(item.toLowerCase()) + item.length)
        }
      }
    }
    return order.sort((a, b) => menu[a] - menu[b]).join(" ")
  }

/* For future reference, this would have been a better way to do this:
const getOrder = input => {
  const menu = ['Burger','Fries','Chicken','Pizza','Sandwich','Onionrings','Milkshake','Coke'];
  let orders = input.match(new RegExp(menu.join('|'), 'gi'))
                    .map(item => item[0].toUpperCase() + item.slice(1))
                    .sort((a,b) => menu.indexOf(a) - menu.indexOf(b));
  return orders.join(' ');
};
*/