console.log("______________________________________________________________________________");

class MemoryItem {

    constructor(key){
        this.key = key;
    }

    Alloc(value){
        if(typeof(Memory[this.key]) == 'undefined'){
            Memory[this.key] = value;
        }
    }

    Get(){
        return Memory[this.key];
    }
}

class test extends Creep{

}

/**
 * Description
 * @returns {any}
 */
function loop(){

    var test = new MemoryItem("bla");
    test.Alloc("bla");
    console.log(test.Get());
}

module.exports = {
    loop,
}