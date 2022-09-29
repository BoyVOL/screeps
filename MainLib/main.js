console.log("______________________________________________________________________________");

class MemoryItem {

    constructor(key){
        this.key = key;
    }

}

Object.defineProperty(MemoryItem, "fullName", {
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