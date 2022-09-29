console.log("______________________________________________________________________________");


/** class for overriding long term memory usage */
class MemoryItem {

    constructor(key,def){
        this.key = key;
        this.Alloc(def);
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

class HtableController{

    constructor(htable){
        this.Htable = htable;
    }

    LoadIntoMemory(){
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
    test.native = test.native + "bla";
    console.log(test.native);

    var testControl = new HtableController(Game.spawns);
    console.log(Game.spawns[0]);
    testControl.LoadIntoMemory();
}

module.exports = {
    loop,
}