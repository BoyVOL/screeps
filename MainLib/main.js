console.log("______________________________________________________________________________");

class MemoryItem {

    constructor(key){
        this.key = key;
    }
}

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