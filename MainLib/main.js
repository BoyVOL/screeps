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

    get native(){
        return Memory[this.key];
    }

    set native(value){
        Memory[this.key] = value;
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
    test.native = test.native+"bla";
    console.log(test.native);
}

module.exports = {
    loop,
}