console.log("______________________________________________________________________________");

class MemoryItem {
    constructor(key){

        this.key = key;

        Object.defineProperty(user, "test", {
            get: function() {
              return "bla";
            }
          });
    }
}

/**
 * Description
 * @returns {any}
 */
function loop(){

    var test = new MemoryItem("bla");

    console.log(test.test);
}

module.exports = {
    loop,
}