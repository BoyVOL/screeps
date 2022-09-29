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

    get test(){
        return "test";
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
    test.Set(test.Get()+"bla");
    console.log(test.Get());
    console.log(test.test);
}

module.exports = {
    loop,
}