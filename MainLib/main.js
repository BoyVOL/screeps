console.log("______________________________________________________________________________");

class MemoryItem {
    constructor(key){

        this.key = key;
    }
}

Object.defineProperty(MemoryItem, "test", {
    get: function() {
      return "bla";
    }
  });

/**
 * Description
 * @returns {any}
 */
function loop(){

    var test = new MemoryItem("bla");

    console.log("bla"+test.test);
}

module.exports = {
    loop,
}