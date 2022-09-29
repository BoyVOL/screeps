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

    get length(){
        return Object.keys(this.Htable).length;
    }

    
}

module.exports = {
    MemoryItem,
    HtableController
}