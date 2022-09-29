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

    Set(value){
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

    var object = {
        get test(){
            return "test";
        }
    }

    var test = new MemoryItem("bla");
    test.Alloc("bla");
    test.Set(test.Get()+"bla");
    console.log(test.Get());
    console.log(object.test);
}

module.exports = {
    loop,
}