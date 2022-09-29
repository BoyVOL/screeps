console.log("______________________________________________________________________________");

class MemoryItem {
    constructor(key){

        key = key;
    }
}

Object.defineProperty(MemoryItem, "test", {
    get: function() {
      return this.key;
    }
  });

/**
 * Description
 * @returns {any}
 */
function loop(){

    var test = new MemoryItem("bla");

    console.log("bla "+test.key);
}

module.exports = {
    loop,
}