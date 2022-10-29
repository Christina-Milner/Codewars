/* Given an object, return an object with the methods set, get, del, undo and redo */

// P: An object
// R: An object with the requested methods

function undoRedo(object) {
	return {
    operations: [],
		set: function(key, value) {
      let prevValue
      if (object[key]) {
        prevValue = object[key]
      }
      object[key] = value
      this.operations.push(prevValue == undefined ? {set: [key, value]} : {set: [key, value, prevValue]})
    },
		get: function(key) {
      return object[key]
    },
		del: function(key) {
      this.operations.push({del: [key, object[key]]})
      delete object[key]
    },
		undo: function() {
      if (!this.operations.length) {
        throw 'No operation to undo!'
      }
      else if ("set" in this.operations.slice().pop()) {
        let prev = {}
        Object.assign(prev, this.operations.slice().pop())
        prev.undo = ["set"].concat(prev.set)
        delete prev.set
        if (prev.undo.length == 4) {
          object[prev.undo[1]] = prev.undo[3]
          this.operations.pop()
          this.operations.push(prev)
        }
        else {
          delete object[prev.undo[1]]
          this.operations.pop()
          this.operations.push(prev)
        }
      }
      else if ("del" in this.operations.slice().pop()) {
        let prev = {}
        Object.assign(prev, this.operations.slice().pop())
        prev.undo = ["del"].concat(prev.del)
        delete prev.del
        object[prev.undo[1]] = prev.undo[2]
        this.operations.pop()
        this.operations.push(prev)
      }
    },
		redo: function() {
            if (!this.operations.length || !('undo' in this.operations.slice().pop())) {
                throw "Can only redo after an undo!"
            }
            else {
                let prev = {}
                Object.assign(prev, this.operations.slice().pop())
                prev.redo = ["redo"].concat(prev.undo)
                delete prev.undo
                if (prev.redo[0] == 'set') {
                    object[prev.redo[1]] = prev.redo[2]
                    this.operations.pop()
                    this.operations.push(prev)
                }
                else if (prev.redo[0] == 'del') {
                    delete object[prev.redo[1]]
                    this.operations.pop()
                    this.operations.push(prev)
                }
        }
    }
	};
}

// WIP - the undo and redo functions do not work (apart from the horrible code duplication), but I bit off a little more than I could chew here
// and will have to revisit this another time.

// Just had to revisit this - thought maybe if I just copied the previous object rather than trying to painstakingly keep track of the 
// modified keys and values with each step, it'd work. (At that point, you could really use the same function for undo and redo, but anyway.)

function undoRedo(object) {
	return {
    operations: [],
    prevObjects: [],
    makeBackUp: function() {
      let previous = {}
      Object.assign(previous, object)
      this.prevObjects.push(previous)
    },
		set: function(key, value) {
      this.makeBackUp()
      object[key] = value
      this.operations.push("set")
    },
		get: function(key) {
      return object[key]
    },
		del: function(key) {
      this.makeBackUp()
      this.operations.push("delete")
      delete object[key]
    },
		undo: function() {
      if (!this.operations.length || this.operations.every (e => e == "undo")) {
        throw new Error()
      }
      else {

        let temp = {}
        Object.assign(temp, this.prevObjects.pop())
        this.makeBackUp()
        object = {}
        Object.assign(object, temp)
        this.operations.pop()
        this.operations.push("undo")
      }
    },
		redo: function() {
            if (this.operations.slice(-1)[0] !== "undo") {
                throw "No redo here"
            }
            else {
              let temp = {}
              Object.assign(temp, this.prevObjects.pop())
              this.makeBackUp()
              object = {}
              Object.assign(object, temp)
              this.operations.pop()
              this.operations.push("redo")
            }
        }
  }
}

// This passes all of the fixed tests except one, one that uses multiple undos in a row. Also fails several randoms, likely for the same reason.
// That reason continues to elude me, but brain's in a knot and I've already spent far too much time on this. 
// Also, the amount of time I spent wondering why the exception blocks were triggering when they weren't supposed to until I realised the slice returns ["undo"] rather than "undo" smh